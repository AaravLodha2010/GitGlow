import type {
  GitHubRepository,
  GitHubRepositoryReadme,
  GitHubUser,
} from "@/lib/github";
import {
  isPortfolioAnalysis,
  type PortfolioAnalysis,
} from "@/lib/portfolio-analysis";

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "strengths", "recommendations"],
  properties: {
    score: { type: "integer", minimum: 0, maximum: 100 },
    strengths: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
    recommendations: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
  },
} as const;

interface GroqChatCompletion {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
}

interface GroqErrorResponse {
  error?: {
    message?: string;
  };
}

function getOutputText(response: GroqChatCompletion): string | null {
  return response.choices?.[0]?.message?.content ?? null;
}

export async function gradeGitHubPortfolio(
  user: GitHubUser,
  repositories: GitHubRepository[],
  readmes: GitHubRepositoryReadme[],
): Promise<PortfolioAnalysis> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL ?? "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "You assess public GitHub portfolios for internship and junior developer applications. Base every conclusion only on the supplied profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Give a balanced, concise evaluation. Return exactly the requested JSON.",
        },
        {
          role: "user",
          content: JSON.stringify({
            profile: user,
            repositories: repositories.slice(0, 30),
            readmes,
          }),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "github_portfolio_assessment",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as GroqErrorResponse | null;
    const detail = errorBody?.error?.message ?? "The request could not be completed.";
    throw new Error(`Groq API error (${response.status}): ${detail}`);
  }

  const outputText = getOutputText((await response.json()) as GroqChatCompletion);
  if (!outputText) {
    throw new Error("AI portfolio grading returned no result.");
  }

  const result: unknown = JSON.parse(outputText);
  if (!isPortfolioAnalysis(result)) {
    throw new Error("AI portfolio grading returned an invalid result.");
  }

  return result;
}
