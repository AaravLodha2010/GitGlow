import type {
  GitHubRepository,
  GitHubRepositoryReadme,
  GitHubUser,
} from "@/lib/github";
import {
  isPortfolioAnalysis,
  type PortfolioAnalysis,
} from "@/lib/portfolio-analysis";
import {
  isResumeAnalysis,
  type ResumeAnalysis,
} from "@/lib/resume-analysis";
import {
  isCompanyAnalysis,
  type CompanyAnalysis,
} from "@/lib/company-analysis";
import {
  isInterviewAnalysis,
  type InterviewAnalysis,
} from "@/lib/interview-analysis";

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "strengths", "recommendations", "metrics", "repositories"],
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
    metrics: {
      type: "object",
      additionalProperties: false,
      required: [
        "repositoryCount",
        "activeRepositories",
        "documentationScore",
        "projectDiversityScore",
        "topLanguages",
      ],
      properties: {
        repositoryCount: { type: "integer", minimum: 0 },
        activeRepositories: { type: "integer", minimum: 0 },
        documentationScore: { type: "integer", minimum: 0, maximum: 100 },
        projectDiversityScore: { type: "integer", minimum: 0, maximum: 100 },
        topLanguages: {
          type: "array",
          items: { type: "string" },
          maxItems: 8,
        },
      },
    },
    repositories: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "summary", "score", "recommendations"],
        properties: {
          name: { type: "string" },
          summary: { type: "string" },
          score: { type: "integer", minimum: 0, maximum: 100 },
          recommendations: {
            type: "array",
            items: { type: "string" },
            maxItems: 3,
          },
        },
      },
      maxItems: 8,
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

  const activeRepos = repositories.filter((repo) => !repo.archived && !repo.fork);

  const languageCounts = new Map<string, number>();
  for (const repo of repositories) {
    if (repo.language) {
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }
  }
  const topLanguages = Array.from(languageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([language]) => language);

  const readmeMap = new Map(readmes.map((r) => [r.repository, r.content]));

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
          content: `You assess public GitHub portfolios for internship and junior developer applications. Base every conclusion only on the supplied profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Give a balanced, concise evaluation. Return exactly the requested JSON.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            profile: user,
            repositories: activeRepos.slice(0, 8),
            readmes: activeRepos.slice(0, 5).map((repo) => ({
              name: repo.name,
              content: readmeMap.get(repo.name) ?? null,
            })),
            hints: {
              repositoryCount: repositories.length,
              activeRepositories: activeRepos.length,
              topLanguages,
            },
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

const resumeResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "strengths", "recommendations", "skillGaps", "projectAlignment", "experienceGaps"],
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
    skillGaps: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["skill", "status", "evidence"],
        properties: {
          skill: { type: "string" },
          status: { type: "string", enum: ["present", "missing", "partial"] },
          evidence: { type: "string" },
        },
      },
      maxItems: 8,
    },
    projectAlignment: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["project", "relevance", "suggestion"],
        properties: {
          project: { type: "string" },
          relevance: { type: "string", enum: ["high", "medium", "low"] },
          suggestion: { type: "string" },
        },
      },
      maxItems: 6,
    },
    experienceGaps: {
      type: "array",
      items: { type: "string" },
      maxItems: 4,
    },
  },
} as const;

export async function compareResumeToGitHub(
  user: GitHubUser,
  repositories: GitHubRepository[],
  readmes: GitHubRepositoryReadme[],
  resumeText: string,
): Promise<ResumeAnalysis> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const activeRepos = repositories.filter((repo) => !repo.archived && !repo.fork);

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
          content: `You compare a candidate's resume against their public GitHub portfolio. Base every conclusion only on the supplied resume text, GitHub profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Identify skill gaps, project alignment, and experience gaps. Be balanced, concise, and actionable. Return exactly the requested JSON.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            resume: resumeText.slice(0, 8000),
            profile: user,
            repositories: activeRepos.slice(0, 8),
            readmes: activeRepos.slice(0, 5).map((repo) => {
              const readme = readmes.find((r) => r.repository === repo.name);
              return {
                name: repo.name,
                content: readme?.content ?? null,
              };
            }),
          }),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "resume_github_comparison",
          strict: true,
          schema: resumeResponseSchema,
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
    throw new Error("AI resume comparison returned no result.");
  }

  const result: unknown = JSON.parse(outputText);
  if (!isResumeAnalysis(result)) {
    throw new Error("AI resume comparison returned an invalid result.");
  }

  return result;
}

const companyResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "strengths", "recommendations", "relevantSkills", "missingSkills", "projectFit"],
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
    relevantSkills: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["skill", "proficiency", "evidence"],
        properties: {
          skill: { type: "string" },
          proficiency: { type: "string", enum: ["strong", "moderate", "weak"] },
          evidence: { type: "string" },
        },
      },
      maxItems: 8,
    },
    missingSkills: {
      type: "array",
      items: { type: "string" },
      maxItems: 6,
    },
    projectFit: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["project", "fit", "reason"],
        properties: {
          project: { type: "string" },
          fit: { type: "string", enum: ["high", "medium", "low"] },
          reason: { type: "string" },
        },
      },
      maxItems: 6,
    },
  },
} as const;

export async function evaluateCompanyReadiness(
  user: GitHubUser,
  repositories: GitHubRepository[],
  readmes: GitHubRepositoryReadme[],
  company: string,
): Promise<CompanyAnalysis> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const activeRepos = repositories.filter((repo) => !repo.archived && !repo.fork);
  const readmeMap = new Map(readmes.map((r) => [r.repository, r.content]));

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
          content: `You evaluate a candidate's GitHub portfolio for readiness to apply to a specific company. Base every conclusion only on the supplied profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Consider the company's known technology stack, open-source contributions, and engineering culture when relevant. Be balanced, concise, and actionable. Return exactly the requested JSON.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            company,
            profile: user,
            repositories: activeRepos.slice(0, 8),
            readmes: activeRepos.slice(0, 5).map((repo) => ({
              name: repo.name,
              content: readmeMap.get(repo.name) ?? null,
            })),
          }),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "company_readiness_assessment",
          strict: true,
          schema: companyResponseSchema,
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
    throw new Error("AI company readiness evaluation returned no result.");
  }

  const result: unknown = JSON.parse(outputText);
  if (!isCompanyAnalysis(result)) {
    throw new Error("AI company readiness evaluation returned an invalid result.");
  }

  return result;
}

const interviewResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "strengths", "recommendations", "questions", "focusAreas"],
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
    questions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "type", "difficulty", "hint"],
        properties: {
          question: { type: "string" },
          type: { type: "string", enum: ["technical", "behavioral", "system_design", "project"] },
          difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
          hint: { type: "string" },
        },
      },
      maxItems: 10,
    },
    focusAreas: {
      type: "array",
      items: { type: "string" },
      maxItems: 5,
    },
  },
} as const;

export async function generateInterviewQuestions(
  user: GitHubUser,
  repositories: GitHubRepository[],
  readmes: GitHubRepositoryReadme[],
): Promise<InterviewAnalysis> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const activeRepos = repositories.filter((repo) => !repo.archived && !repo.fork);
  const readmeMap = new Map(readmes.map((r) => [r.repository, r.content]));

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
          content: `You generate interview preparation material for software engineering candidates based on their GitHub portfolio. Base every conclusion only on the supplied profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Generate realistic interview questions that a candidate might face, grouped by type and difficulty. Provide actionable preparation advice. Return exactly the requested JSON.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            profile: user,
            repositories: activeRepos.slice(0, 8),
            readmes: activeRepos.slice(0, 5).map((repo) => ({
              name: repo.name,
              content: readmeMap.get(repo.name) ?? null,
            })),
          }),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "interview_preparation",
          strict: true,
          schema: interviewResponseSchema,
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
    throw new Error("AI interview preparation returned no result.");
  }

  const result: unknown = JSON.parse(outputText);
  if (!isInterviewAnalysis(result)) {
    throw new Error("AI interview preparation returned an invalid result.");
  }

  return result;
}
