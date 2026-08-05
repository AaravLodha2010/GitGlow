export interface CompanyAnalysis {
  score: number;
  strengths: string[];
  recommendations: string[];
  relevantSkills: Array<{
    skill: string;
    proficiency: "strong" | "moderate" | "weak";
    evidence: string;
  }>;
  missingSkills: string[];
  projectFit: Array<{
    project: string;
    fit: "high" | "medium" | "low";
    reason: string;
  }>;
}

export interface CompanyReport {
  analysis: CompanyAnalysis;
  company: string;
  createdAt: string;
  id: string;
  username: string;
}

export interface StoredCompanyReportRow {
  company: string;
  created_at: string;
  id: string;
  missing_skills: unknown;
  project_fit: unknown;
  recommendations: unknown;
  relevant_skills: unknown;
  score: unknown;
  strengths: unknown;
  username: string;
}

export function isCompanyAnalysis(value: unknown): value is CompanyAnalysis {
  if (typeof value !== "object" || value === null) return false;

  const analysis = value as Record<string, unknown>;

  const relevantSkills = analysis.relevantSkills as unknown[] | undefined;
  if (!Array.isArray(relevantSkills)) return false;

  const missingSkills = analysis.missingSkills as unknown[] | undefined;
  if (!Array.isArray(missingSkills)) return false;

  const projectFit = analysis.projectFit as unknown[] | undefined;
  if (!Array.isArray(projectFit)) return false;

  return (
    typeof analysis.score === "number" &&
    Array.isArray(analysis.strengths) &&
    analysis.strengths.every((item: unknown) => typeof item === "string") &&
    Array.isArray(analysis.recommendations) &&
    analysis.recommendations.every((item: unknown) => typeof item === "string") &&
    relevantSkills.every((skill: unknown) => {
      if (typeof skill !== "object" || skill === null) return false;
      const s = skill as Record<string, unknown>;
      return (
        typeof s.skill === "string" &&
        typeof s.proficiency === "string" &&
        ["strong", "moderate", "weak"].includes(s.proficiency as string) &&
        typeof s.evidence === "string"
      );
    }) &&
    missingSkills.every((item: unknown) => typeof item === "string") &&
    projectFit.every((item: unknown) => {
      if (typeof item !== "object" || item === null) return false;
      const p = item as Record<string, unknown>;
      return (
        typeof p.project === "string" &&
        typeof p.fit === "string" &&
        ["high", "medium", "low"].includes(p.fit as string) &&
        typeof p.reason === "string"
      );
    })
  );
}

export function validateRelevantSkills(value: unknown): CompanyAnalysis["relevantSkills"] {
  if (!Array.isArray(value)) return [];

  return value.filter((skill): skill is CompanyAnalysis["relevantSkills"][number] => {
    if (typeof skill !== "object" || skill === null) return false;
    const s = skill as Record<string, unknown>;
    return (
      typeof s.skill === "string" &&
      typeof s.proficiency === "string" &&
      ["strong", "moderate", "weak"].includes(s.proficiency as string) &&
      typeof s.evidence === "string"
    );
  });
}

export function validateMissingSkills(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item: unknown): item is string => typeof item === "string");
}

export function validateProjectFit(value: unknown): CompanyAnalysis["projectFit"] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is CompanyAnalysis["projectFit"][number] => {
    if (typeof item !== "object" || item === null) return false;
    const p = item as Record<string, unknown>;
    return (
      typeof p.project === "string" &&
      typeof p.fit === "string" &&
      ["high", "medium", "low"].includes(p.fit as string) &&
      typeof p.reason === "string"
    );
  });
}

export function toCompanyReport(row: StoredCompanyReportRow): CompanyReport {
  if (
    typeof row.score !== "number" ||
    !Array.isArray(row.strengths) ||
    !row.strengths.every((item) => typeof item === "string") ||
    !Array.isArray(row.recommendations) ||
    !row.recommendations.every((item) => typeof item === "string")
  ) {
    throw new Error("Stored company report data is invalid.");
  }

  return {
    id: row.id,
    username: row.username,
    company: row.company,
    createdAt: row.created_at,
    analysis: {
      score: row.score,
      strengths: row.strengths,
      recommendations: row.recommendations,
      relevantSkills: validateRelevantSkills(row.relevant_skills),
      missingSkills: validateMissingSkills(row.missing_skills),
      projectFit: validateProjectFit(row.project_fit),
    },
  };
}
