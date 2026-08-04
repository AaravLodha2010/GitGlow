import { gradeGitHubPortfolio } from "@/lib/ai";
import {
  getGitHubRepositories,
  getGitHubRepositoryReadmes,
  getGitHubUser,
} from "@/lib/github";
import { savePortfolioReport } from "@/lib/reports";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Sign in with GitHub to analyze your portfolio." }, { status: 401 });

  const username = user.user_metadata.user_name;
  if (typeof username !== "string" || !username) {
    return Response.json({ error: "Your GitHub username could not be found in this session." }, { status: 400 });
  }

  try {
    const [githubUser, repositories] = await Promise.all([
      getGitHubUser(username),
      getGitHubRepositories(username),
    ]);
    const readmes = await getGitHubRepositoryReadmes(username, repositories);
    const analysis = await gradeGitHubPortfolio(githubUser, repositories, readmes);
    const report = await savePortfolioReport(user.id, githubUser.login, analysis);

    return Response.json({ reportId: report.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to analyze this GitHub profile.";
    const status = message.includes("does not exist") ? 404 : 500;
    return Response.json({ error: message }, { status });
  }
}
