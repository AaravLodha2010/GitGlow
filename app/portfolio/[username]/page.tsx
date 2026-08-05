import { notFound } from "next/navigation";
import AnalysisReport from "@/components/AnalysisReport";
import PageAtmosphere from "@/components/PageAtmosphere";
import { getPublicPortfolioReport } from "@/lib/reports";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const report = await getPublicPortfolioReport(username);
  if (!report) {
    return { title: "Portfolio not found — GitGlow" };
  }
  return {
    title: `@${report.username} portfolio — GitGlow`,
    description: `GitHub portfolio score: ${report.analysis.score}/100. View strengths, recommendations, and project-level feedback.`,
  };
}

export default async function PublicPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const report = await getPublicPortfolioReport(username);
  if (!report) notFound();

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute h-[32rem] w-[42rem] rounded-full bg-[#d7ff54]/[0.06] blur-[120px]" />
        <div className="relative w-full">
          <div className="mb-6 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Public portfolio</p>
            <a href="https://gitglow.vercel.app" className="mt-2 inline-block text-xs text-zinc-600 transition hover:text-zinc-400">
              Powered by GitGlow
            </a>
          </div>
          <AnalysisReport report={report} />
        </div>
      </section>
    </main>
  );
}
