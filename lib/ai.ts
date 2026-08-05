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
import { callAI } from "@/lib/ai-client";

const portfolioSchema = {
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
      minItems: 5,
      maxItems: 6,
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
            minItems: 3,
            maxItems: 5,
          },
        },
      },
      maxItems: 8,
    },
  },
} as const;

export async function gradeGitHubPortfolio(
  user: GitHubUser,
  repositories: GitHubRepository[],
  readmes: GitHubRepositoryReadme[],
): Promise<PortfolioAnalysis> {
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

  const result = await callAI(
    "You assess public GitHub portfolios for internship and junior developer applications. Base every conclusion only on the supplied profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Give a balanced, concise evaluation. Provide specific, actionable recommendations with concrete examples and step-by-step guidance. For each recommendation, explain why it matters and how to implement it. Return exactly the requested JSON.",
    JSON.stringify({
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
    portfolioSchema,
  );

  if (!isPortfolioAnalysis(result)) {
    throw new Error("AI portfolio grading returned an invalid result.");
  }

  return result;
}

const resumeSchema = {
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
      minItems: 5,
      maxItems: 6,
    },
    skillGaps: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["skill", "status", "evidence", "remediation"],
        properties: {
          skill: { type: "string" },
          status: { type: "string", enum: ["present", "missing", "partial"] },
          evidence: { type: "string" },
          remediation: { type: "string" },
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
  const activeRepos = repositories.filter((repo) => !repo.archived && !repo.fork);

  const result = await callAI(
    "You compare a candidate's resume against their public GitHub portfolio. Base every conclusion only on the supplied resume text, GitHub profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Identify skill gaps, project alignment, and experience gaps. For each skill gap, provide a concrete remediation step with specific resources or project ideas. Recommendations should be detailed, actionable, and include implementation guidance. Be balanced, concise, and actionable. Return exactly the requested JSON.",
    JSON.stringify({
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
    resumeSchema,
  );

  if (!isResumeAnalysis(result)) {
    throw new Error("AI resume comparison returned an invalid result.");
  }

  return result;
}

const companySchema = {
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
      minItems: 5,
      maxItems: 6,
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
  const activeRepos = repositories.filter((repo) => !repo.archived && !repo.fork);
  const readmeMap = new Map(readmes.map((r) => [r.repository, r.content]));

  const result = await callAI(
    "You evaluate a candidate's GitHub portfolio for readiness to apply to a specific company. Base every conclusion only on the supplied profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Consider the company's known technology stack, open-source contributions, and engineering culture when relevant. Provide specific, actionable recommendations with concrete steps the candidate can take to improve their alignment with this company. Include project ideas, learning paths, and portfolio improvements tailored to the company's tech stack and values. Return exactly the requested JSON.",
    JSON.stringify({
      company,
      profile: user,
      repositories: activeRepos.slice(0, 8),
      readmes: activeRepos.slice(0, 5).map((repo) => ({
        name: repo.name,
        content: readmeMap.get(repo.name) ?? null,
      })),
    }),
    companySchema,
  );

  if (!isCompanyAnalysis(result)) {
    throw new Error("AI company readiness evaluation returned an invalid result.");
  }

  return result;
}

const interviewSchema = {
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
      minItems: 5,
      maxItems: 6,
    },
    questions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "type", "difficulty", "hint", "preparation"],
        properties: {
          question: { type: "string" },
          type: { type: "string", enum: ["technical", "behavioral", "system_design", "project"] },
          difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
          hint: { type: "string" },
          preparation: { type: "string" },
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
  const activeRepos = repositories.filter((repo) => !repo.archived && !repo.fork);
  const readmeMap = new Map(readmes.map((r) => [r.repository, r.content]));

  const result = await callAI(
    "You generate interview preparation material for software engineering candidates based on their GitHub portfolio. Base every conclusion only on the supplied profile, repository metadata, and README excerpts. Do not claim to have read source code, commit history, or private repositories. Generate realistic interview questions that a candidate might face, grouped by type and difficulty. For each question, provide a detailed preparation guide with specific talking points, technical concepts to review, and example answers drawn from the candidate's actual projects. Provide actionable preparation advice. Return exactly the requested JSON.",
    JSON.stringify({
      profile: user,
      repositories: activeRepos.slice(0, 8),
      readmes: activeRepos.slice(0, 5).map((repo) => ({
        name: repo.name,
        content: readmeMap.get(repo.name) ?? null,
      })),
    }),
    interviewSchema,
  );

  if (!isInterviewAnalysis(result)) {
    throw new Error("AI interview preparation returned an invalid result.");
  }

  return result;
}
