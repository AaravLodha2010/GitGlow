export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  recommendations: string[];
  skillGaps: Array<{
    skill: string;
    status: "present" | "missing" | "partial";
    evidence: string;
  }>;
  projectAlignment: Array<{
    project: string;
    relevance: "high" | "medium" | "low";
    suggestion?: string;
  }>;
  experienceGaps: string[];
}

export interface ResumeReport {
  analysis: ResumeAnalysis;
  createdAt: string;
  id: string;
  username: string;
}

export interface StoredResumeReportRow {
  created_at: string;
  id: string;
  experience_gaps: unknown;
  project_alignment: unknown;
  recommendations: unknown;
  score: unknown;
  skill_gaps: unknown;
  strengths: unknown;
  username: string;
}

export function isResumeAnalysis(value: unknown): value is ResumeAnalysis {
  if (typeof value !== "object" || value === null) return false;

  const analysis = value as Record<string, unknown>;

  const skillGaps = analysis.skillGaps as unknown[] | undefined;
  if (!Array.isArray(skillGaps)) return false;

  const projectAlignment = analysis.projectAlignment as unknown[] | undefined;
  if (!Array.isArray(projectAlignment)) return false;

  const experienceGaps = analysis.experienceGaps as unknown[] | undefined;
  if (!Array.isArray(experienceGaps)) return false;

  return (
    typeof analysis.score === "number" &&
    Array.isArray(analysis.strengths) &&
    analysis.strengths.every((item: unknown) => typeof item === "string") &&
    Array.isArray(analysis.recommendations) &&
    analysis.recommendations.every((item: unknown) => typeof item === "string") &&
    skillGaps.every((gap: unknown) => {
      if (typeof gap !== "object" || gap === null) return false;
      const g = gap as Record<string, unknown>;
      return (
        typeof g.skill === "string" &&
        typeof g.status === "string" &&
        ["present", "missing", "partial"].includes(g.status as string) &&
        typeof g.evidence === "string"
      );
    }) &&
    projectAlignment.every((item: unknown) => {
      if (typeof item !== "object" || item === null) return false;
      const p = item as Record<string, unknown>;
      return (
        typeof p.project === "string" &&
        typeof p.relevance === "string" &&
        ["high", "medium", "low"].includes(p.relevance as string)
      );
    }) &&
    experienceGaps.every((item: unknown) => typeof item === "string")
  );
}

export function validateSkillGaps(value: unknown): ResumeAnalysis["skillGaps"] {
  if (!Array.isArray(value)) return [];

  return value.filter((gap): gap is ResumeAnalysis["skillGaps"][number] => {
    if (typeof gap !== "object" || gap === null) return false;
    const g = gap as Record<string, unknown>;
    return (
      typeof g.skill === "string" &&
      typeof g.status === "string" &&
      ["present", "missing", "partial"].includes(g.status as string) &&
      typeof g.evidence === "string"
    );
  });
}

export function validateProjectAlignment(value: unknown): ResumeAnalysis["projectAlignment"] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is ResumeAnalysis["projectAlignment"][number] => {
    if (typeof item !== "object" || item === null) return false;
    const p = item as Record<string, unknown>;
    return (
      typeof p.project === "string" &&
      typeof p.relevance === "string" &&
      ["high", "medium", "low"].includes(p.relevance as string)
    );
  });
}

export function validateExperienceGaps(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item: unknown): item is string => typeof item === "string");
}

export function toResumeReport(row: StoredResumeReportRow): ResumeReport {
  if (
    typeof row.score !== "number" ||
    !Array.isArray(row.strengths) ||
    !row.strengths.every((item) => typeof item === "string") ||
    !Array.isArray(row.recommendations) ||
    !row.recommendations.every((item) => typeof item === "string")
  ) {
    throw new Error("Stored resume report data is invalid.");
  }

  return {
    id: row.id,
    username: row.username,
    createdAt: row.created_at,
    analysis: {
      score: row.score,
      strengths: row.strengths,
      recommendations: row.recommendations,
      skillGaps: validateSkillGaps(row.skill_gaps),
      projectAlignment: validateProjectAlignment(row.project_alignment),
      experienceGaps: validateExperienceGaps(row.experience_gaps),
    },
  };
}
