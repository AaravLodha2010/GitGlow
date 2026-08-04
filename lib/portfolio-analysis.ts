export interface PortfolioAnalysis {
  recommendations: string[];
  score: number;
  strengths: string[];
}

export function isPortfolioAnalysis(value: unknown): value is PortfolioAnalysis {
  if (!value || typeof value !== "object") return false;

  const analysis = value as Record<string, unknown>;
  return (
    typeof analysis.score === "number" &&
    Number.isInteger(analysis.score) &&
    analysis.score >= 0 &&
    analysis.score <= 100 &&
    Array.isArray(analysis.strengths) &&
    analysis.strengths.every((item) => typeof item === "string") &&
    Array.isArray(analysis.recommendations) &&
    analysis.recommendations.every((item) => typeof item === "string")
  );
}
