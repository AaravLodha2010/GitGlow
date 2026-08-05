type AIProvider = "gemini" | "groq";

function getProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER;
  if (provider === "groq") return "groq";
  return "gemini";
}

interface GeminiCandidate {
  content?: {
    parts?: Array<{
      text?: string;
    }>;
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

function stripAdditionalProperties(schema: unknown): unknown {
  if (Array.isArray(schema)) {
    return schema.map(stripAdditionalProperties);
  }

  if (typeof schema !== "object" || schema === null) {
    return schema;
  }

  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key === "additionalProperties") continue;
    cleaned[key] = stripAdditionalProperties(value as Record<string, unknown>);
  }

  return cleaned;
}

async function callGemini(
  systemPrompt: string,
  userPrompt: string,
  schema: Record<string, unknown>,
): Promise<unknown> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const cleanedSchema = stripAdditionalProperties(schema);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: cleanedSchema,
        },
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    const detail = errorBody?.error?.message ?? `The request failed with status ${response.status}.`;
    throw new Error(`Gemini API error (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  if (!text) {
    throw new Error("AI analysis returned no result.");
  }

  const parsed = JSON.parse(text);
  console.log("Gemini raw response:", JSON.stringify(parsed).slice(0, 500));
  return parsed;
}

async function callGroq(
  systemPrompt: string,
  userPrompt: string,
  schema: Record<string, unknown>,
): Promise<unknown> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const model = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt + " Return valid JSON matching this schema: " + JSON.stringify(schema) },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    const detail = errorBody?.error?.message ?? `The request failed with status ${response.status}.`;
    throw new Error(`Groq API error (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = data.choices?.[0]?.message?.content ?? null;
  if (!text) {
    throw new Error("AI analysis returned no result.");
  }

  const parsed = JSON.parse(text);
  console.log("Groq raw response:", JSON.stringify(parsed).slice(0, 500));
  return parsed;
}

export async function callAI(
  systemPrompt: string,
  userPrompt: string,
  schema: Record<string, unknown>,
): Promise<unknown> {
  const primary = getProvider();

  try {
    if (primary === "groq") {
      return await callGroq(systemPrompt, userPrompt, schema);
    }
    return await callGemini(systemPrompt, userPrompt, schema);
  } catch (error) {
    const fallback = primary === "gemini" ? "groq" : "gemini";
    console.warn(`Primary provider ${primary} failed, falling back to ${fallback}:`, error);

    try {
      if (fallback === "groq") {
        return await callGroq(systemPrompt, userPrompt, schema);
      }
      return await callGemini(systemPrompt, userPrompt, schema);
    } catch (fallbackError) {
      console.error(`Fallback provider ${fallback} also failed:`, fallbackError);
      if (fallbackError instanceof Error && fallbackError.message.includes("invalid result")) {
        throw new Error(
          `AI analysis failed. The model returned data that did not match the expected format. Please try again.`,
        );
      }
      throw new Error(
        `Both AI providers failed. Primary: ${error instanceof Error ? error.message : "unknown"}. Fallback: ${fallbackError instanceof Error ? fallbackError.message : "unknown"}`,
      );
    }
  }
}
