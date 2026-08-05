export interface PortfolioAnalysis {
  score: number;
  strengths: string[];
  recommendations: string[];
  metrics: {
    repositoryCount: number;
    activeRepositories: number;
    documentationScore: number;
    projectDiversityScore: number;
    topLanguages: string[];
  };
  repositories: Array<{
    name: string;
    summary: string;
    score: number;
    recommendations: string[];
  }>;
}

export function isPortfolioAnalysis(value: unknown): value is PortfolioAnalysis {
  if (typeof value !== "object" || value === null) return false;

  const analysis = value as Record<string, unknown>;

  const metrics = analysis.metrics as Record<string, unknown> | undefined;
  if (!metrics || typeof metrics !== "object") return false;

  const topLanguages = metrics.topLanguages as unknown[] | undefined;
  if (!Array.isArray(topLanguages)) return false;

  const repositories = analysis.repositories as unknown[] | undefined;
  if (!Array.isArray(repositories)) return false;

  return (
    typeof analysis.score === "number" &&
    Array.isArray(analysis.strengths) &&
    analysis.strengths.every((item: unknown) => typeof item === "string") &&
    Array.isArray(analysis.recommendations) &&
    analysis.recommendations.every((item: unknown) => typeof item === "string") &&
    typeof metrics.repositoryCount === "number" &&
    typeof metrics.activeRepositories === "number" &&
    typeof metrics.documentationScore === "number" &&
    typeof metrics.projectDiversityScore === "number" &&
    topLanguages.every((item: unknown) => typeof item === "string") &&
    repositories.every((repo: unknown) => {
      if (typeof repo !== "object" || repo === null) return false;
      const r = repo as Record<string, unknown>;
      return (
        typeof r.name === "string" &&
        typeof r.summary === "string" &&
        typeof r.score === "number" &&
        Array.isArray(r.recommendations) &&
        r.recommendations.every((item: unknown) => typeof item === "string")
      );
    })
  );
}
