import { createClient } from "@supabase/supabase-js";
import type { PortfolioAnalysis } from "@/lib/portfolio-analysis";
import type { ResumeAnalysis, ResumeReport, StoredResumeReportRow } from "@/lib/resume-analysis";
import { toResumeReport } from "@/lib/resume-analysis";
import type { CompanyAnalysis, CompanyReport, StoredCompanyReportRow } from "@/lib/company-analysis";
import { toCompanyReport } from "@/lib/company-analysis";
import type { InterviewAnalysis, InterviewReport, StoredInterviewReportRow } from "@/lib/interview-analysis";
import { toInterviewReport } from "@/lib/interview-analysis";

export type { ResumeReport } from "@/lib/resume-analysis";
export type { CompanyReport } from "@/lib/company-analysis";
export type { InterviewReport } from "@/lib/interview-analysis";

export interface PortfolioReport {
  analysis: PortfolioAnalysis;
  createdAt: string;
  id: string;
  username: string;
}

export interface StoredReportRow {
  created_at: string;
  id: string;
  metrics: unknown;
  recommendations: unknown;
  repositories: unknown;
  score: unknown;
  strengths: unknown;
  username: string;
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase is not configured.");
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function validateMetrics(value: unknown): PortfolioAnalysis["metrics"] {
  if (typeof value !== "object" || value === null) {
    throw new Error("Stored metrics are invalid.");
  }

  const metrics = value as Record<string, unknown>;

  return {
    repositoryCount: typeof metrics.repositoryCount === "number" ? metrics.repositoryCount : 0,
    activeRepositories: typeof metrics.activeRepositories === "number" ? metrics.activeRepositories : 0,
    documentationScore: typeof metrics.documentationScore === "number" ? metrics.documentationScore : 0,
    projectDiversityScore: typeof metrics.projectDiversityScore === "number" ? metrics.projectDiversityScore : 0,
    topLanguages: Array.isArray(metrics.topLanguages)
      ? metrics.topLanguages.filter((item: unknown): item is string => typeof item === "string")
      : [],
  };
}

function validateRepositories(value: unknown): PortfolioAnalysis["repositories"] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((repo): repo is PortfolioAnalysis["repositories"][number] => {
    if (typeof repo !== "object" || repo === null) return false;
    const r = repo as Record<string, unknown>;
    return (
      typeof r.name === "string" &&
      typeof r.summary === "string" &&
      typeof r.score === "number" &&
      Array.isArray(r.recommendations) &&
      r.recommendations.every((item: unknown) => typeof item === "string")
    );
  });
}

function toReport(row: StoredReportRow): PortfolioReport {
  if (
    typeof row.score !== "number" ||
    !Array.isArray(row.strengths) ||
    !row.strengths.every((item) => typeof item === "string") ||
    !Array.isArray(row.recommendations) ||
    !row.recommendations.every((item) => typeof item === "string")
  ) {
    throw new Error("Stored report data is invalid.");
  }

  return {
    id: row.id,
    username: row.username,
    createdAt: row.created_at,
    analysis: {
      score: row.score,
      strengths: row.strengths,
      recommendations: row.recommendations,
      metrics: validateMetrics(row.metrics),
      repositories: validateRepositories(row.repositories),
    },
  };
}

export async function savePortfolioReport(
  userId: string,
  username: string,
  analysis: PortfolioAnalysis,
): Promise<PortfolioReport> {
  const { data, error } = await getSupabaseClient()
    .from("portfolio_reports")
    .insert({
      user_id: userId,
      username,
      score: analysis.score,
      strengths: analysis.strengths,
      recommendations: analysis.recommendations,
      metrics: analysis.metrics,
      repositories: analysis.repositories,
    })
    .select("id, username, score, strengths, recommendations, metrics, repositories, created_at")
    .single();

  if (error || !data) {
    throw new Error("Unable to save the portfolio report. Run the Supabase schema migration and try again.");
  }

  return toReport(data as StoredReportRow);
}

export async function getPortfolioReportsForUser(userId: string): Promise<PortfolioReport[]> {
  const { data, error } = await getSupabaseClient()
    .from("portfolio_reports")
    .select("id, username, score, strengths, recommendations, metrics, repositories, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load your portfolio reports.");
  }

  return (data as StoredReportRow[]).map(toReport);
}

export async function getPortfolioReport(
  reportId: string,
): Promise<PortfolioReport | null> {
  const { data, error } = await getSupabaseClient()
    .from("portfolio_reports")
    .select("id, username, score, strengths, recommendations, metrics, repositories, created_at")
    .eq("id", reportId)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load this portfolio report.");
  }

  return data ? toReport(data as StoredReportRow) : null;
}

export async function saveResumeReport(
  userId: string,
  username: string,
  analysis: ResumeAnalysis,
): Promise<ResumeReport> {
  const { data, error } = await getSupabaseClient()
    .from("resume_reports")
    .insert({
      user_id: userId,
      username,
      score: analysis.score,
      strengths: analysis.strengths,
      recommendations: analysis.recommendations,
      skill_gaps: analysis.skillGaps,
      project_alignment: analysis.projectAlignment,
      experience_gaps: analysis.experienceGaps,
    })
    .select("id, username, score, strengths, recommendations, skill_gaps, project_alignment, experience_gaps, created_at")
    .single();

  if (error || !data) {
    throw new Error("Unable to save the resume report. Run the Supabase schema migration and try again.");
  }

  return toResumeReport(data as StoredResumeReportRow);
}

export async function getResumeReportsForUser(userId: string): Promise<ResumeReport[]> {
  const { data, error } = await getSupabaseClient()
    .from("resume_reports")
    .select("id, username, score, strengths, recommendations, skill_gaps, project_alignment, experience_gaps, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load your resume reports.");
  }

  return (data as StoredResumeReportRow[]).map(toResumeReport);
}

export async function getResumeReport(
  reportId: string,
): Promise<ResumeReport | null> {
  const { data, error } = await getSupabaseClient()
    .from("resume_reports")
    .select("id, username, score, strengths, recommendations, skill_gaps, project_alignment, experience_gaps, created_at")
    .eq("id", reportId)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load this resume report.");
  }

  return data ? toResumeReport(data as StoredResumeReportRow) : null;
}

export async function saveCompanyReport(
  userId: string,
  username: string,
  company: string,
  analysis: CompanyAnalysis,
): Promise<CompanyReport> {
  const { data, error } = await getSupabaseClient()
    .from("company_reports")
    .insert({
      user_id: userId,
      username,
      company,
      score: analysis.score,
      strengths: analysis.strengths,
      recommendations: analysis.recommendations,
      relevant_skills: analysis.relevantSkills,
      missing_skills: analysis.missingSkills,
      project_fit: analysis.projectFit,
    })
    .select("id, username, company, score, strengths, recommendations, relevant_skills, missing_skills, project_fit, created_at")
    .single();

  if (error || !data) {
    throw new Error("Unable to save the company report. Run the Supabase schema migration and try again.");
  }

  return toCompanyReport(data as StoredCompanyReportRow);
}

export async function getCompanyReportsForUser(userId: string): Promise<CompanyReport[]> {
  const { data, error } = await getSupabaseClient()
    .from("company_reports")
    .select("id, username, company, score, strengths, recommendations, relevant_skills, missing_skills, project_fit, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load your company reports.");
  }

  return (data as StoredCompanyReportRow[]).map(toCompanyReport);
}

export async function getCompanyReport(
  reportId: string,
): Promise<CompanyReport | null> {
  const { data, error } = await getSupabaseClient()
    .from("company_reports")
    .select("id, username, company, score, strengths, recommendations, relevant_skills, missing_skills, project_fit, created_at")
    .eq("id", reportId)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load this company report.");
  }

  return data ? toCompanyReport(data as StoredCompanyReportRow) : null;
}

export async function saveInterviewReport(
  userId: string,
  username: string,
  analysis: InterviewAnalysis,
): Promise<InterviewReport> {
  const { data, error } = await getSupabaseClient()
    .from("interview_reports")
    .insert({
      user_id: userId,
      username,
      score: analysis.score,
      strengths: analysis.strengths,
      recommendations: analysis.recommendations,
      questions: analysis.questions,
      focus_areas: analysis.focusAreas,
    })
    .select("id, username, score, strengths, recommendations, questions, focus_areas, created_at")
    .single();

  if (error || !data) {
    throw new Error("Unable to save the interview report. Run the Supabase schema migration and try again.");
  }

  return toInterviewReport(data as StoredInterviewReportRow);
}

export async function getInterviewReportsForUser(userId: string): Promise<InterviewReport[]> {
  const { data, error } = await getSupabaseClient()
    .from("interview_reports")
    .select("id, username, score, strengths, recommendations, questions, focus_areas, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load your interview reports.");
  }

  return (data as StoredInterviewReportRow[]).map(toInterviewReport);
}

export async function getInterviewReport(
  reportId: string,
): Promise<InterviewReport | null> {
  const { data, error } = await getSupabaseClient()
    .from("interview_reports")
    .select("id, username, score, strengths, recommendations, questions, focus_areas, created_at")
    .eq("id", reportId)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load this interview report.");
  }

  return data ? toInterviewReport(data as StoredInterviewReportRow) : null;
}
