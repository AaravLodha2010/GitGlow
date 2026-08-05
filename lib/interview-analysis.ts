export interface InterviewAnalysis {
  score: number;
  strengths: string[];
  recommendations: string[];
  questions: Array<{
    question: string;
    type: "technical" | "behavioral" | "system_design" | "project";
    difficulty: "easy" | "medium" | "hard";
    hint: string;
  }>;
  focusAreas: string[];
}

export interface InterviewReport {
  analysis: InterviewAnalysis;
  createdAt: string;
  id: string;
  username: string;
}

export interface StoredInterviewReportRow {
  created_at: string;
  id: string;
  focus_areas: unknown;
  questions: unknown;
  recommendations: unknown;
  score: unknown;
  strengths: unknown;
  username: string;
}

export function isInterviewAnalysis(value: unknown): value is InterviewAnalysis {
  if (typeof value !== "object" || value === null) return false;

  const analysis = value as Record<string, unknown>;

  const questions = analysis.questions as unknown[] | undefined;
  if (!Array.isArray(questions)) return false;

  const focusAreas = analysis.focusAreas as unknown[] | undefined;
  if (!Array.isArray(focusAreas)) return false;

  return (
    typeof analysis.score === "number" &&
    Array.isArray(analysis.strengths) &&
    analysis.strengths.every((item: unknown) => typeof item === "string") &&
    Array.isArray(analysis.recommendations) &&
    analysis.recommendations.every((item: unknown) => typeof item === "string") &&
    questions.every((q: unknown) => {
      if (typeof q !== "object" || q === null) return false;
      const question = q as Record<string, unknown>;
      return (
        typeof question.question === "string" &&
        typeof question.type === "string" &&
        ["technical", "behavioral", "system_design", "project"].includes(question.type as string) &&
        typeof question.difficulty === "string" &&
        ["easy", "medium", "hard"].includes(question.difficulty as string) &&
        typeof question.hint === "string"
      );
    }) &&
    focusAreas.every((item: unknown) => typeof item === "string")
  );
}

export function validateQuestions(value: unknown): InterviewAnalysis["questions"] {
  if (!Array.isArray(value)) return [];

  return value.filter((q): q is InterviewAnalysis["questions"][number] => {
    if (typeof q !== "object" || q === null) return false;
    const question = q as Record<string, unknown>;
    return (
      typeof question.question === "string" &&
      typeof question.type === "string" &&
      ["technical", "behavioral", "system_design", "project"].includes(question.type as string) &&
      typeof question.difficulty === "string" &&
      ["easy", "medium", "hard"].includes(question.difficulty as string) &&
      typeof question.hint === "string"
    );
  });
}

export function validateFocusAreas(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item: unknown): item is string => typeof item === "string");
}

export function toInterviewReport(row: StoredInterviewReportRow): InterviewReport {
  if (
    typeof row.score !== "number" ||
    !Array.isArray(row.strengths) ||
    !row.strengths.every((item) => typeof item === "string") ||
    !Array.isArray(row.recommendations) ||
    !row.recommendations.every((item) => typeof item === "string")
  ) {
    throw new Error("Stored interview report data is invalid.");
  }

  return {
    id: row.id,
    username: row.username,
    createdAt: row.created_at,
    analysis: {
      score: row.score,
      strengths: row.strengths,
      recommendations: row.recommendations,
      questions: validateQuestions(row.questions),
      focusAreas: validateFocusAreas(row.focus_areas),
    },
  };
}
