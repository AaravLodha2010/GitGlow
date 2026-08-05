import { evaluateCompanyReadiness } from "@/lib/ai";
import {
  getGitHubRepositories,
  getGitHubRepositoryReadmes,
  getGitHubUser,
} from "@/lib/github";
import { saveCompanyReport } from "@/lib/reports";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Sign in with GitHub to analyze company readiness." }, { status: 401 });
  }

  const username = user.user_metadata.user_name;
  if (typeof username !== "string" || !username) {
    return Response.json({ error: "Your GitHub username could not be found in this session." }, { status: 400 });
  }

  let company: string;
  try {
    const body = (await request.json()) as { company?: string };
    if (!body.company || typeof body.company !== "string" || body.company.trim().length < 2) {
      return Response.json({ error: "Please provide a company name to analyze." }, { status: 400 });
    }
    company = body.company.trim();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const [githubUser, repositories] = await Promise.all([
      getGitHubUser(username),
      getGitHubRepositories(username),
    ]);
    const readmes = await getGitHubRepositoryReadmes(username, repositories);
    const analysis = await evaluateCompanyReadiness(githubUser, repositories, readmes, company);
    const report = await saveCompanyReport(user.id, githubUser.login, company, analysis);

    return Response.json({ reportId: report.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to analyze company readiness.";
    const status = message.includes("does not exist") ? 404 : 500;
    return Response.json({ error: message }, { status });
  }
}
