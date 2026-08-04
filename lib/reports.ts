import { createClient } from "@supabase/supabase-js";
import type { PortfolioAnalysis } from "@/lib/portfolio-analysis";

export interface PortfolioReport {
  analysis: PortfolioAnalysis;
  createdAt: string;
  id: string;
  username: string;
}

interface ReportRow {
  created_at: string;
  id: string;
  recommendations: unknown;
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

function toReport(row: ReportRow): PortfolioReport {
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
    })
    .select("id, username, score, strengths, recommendations, created_at")
    .single();

  if (error || !data) {
    throw new Error("Unable to save the portfolio report. Run the Supabase schema migration and try again.");
  }

  return toReport(data);
}

export async function getPortfolioReportsForUser(userId: string): Promise<PortfolioReport[]> {
  const { data, error } = await getSupabaseClient()
    .from("portfolio_reports")
    .select("id, username, score, strengths, recommendations, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load your portfolio reports.");
  }

  return (data as ReportRow[]).map(toReport);
}

export async function getPortfolioReport(
  reportId: string,
): Promise<PortfolioReport | null> {
  const { data, error } = await getSupabaseClient()
    .from("portfolio_reports")
    .select("id, username, score, strengths, recommendations, created_at")
    .eq("id", reportId)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load this portfolio report.");
  }

  return data ? toReport(data) : null;
}
