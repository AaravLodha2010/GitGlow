import { notFound } from "next/navigation";
import InterviewReport from "@/components/InterviewReport";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import CursorGlow from "@/components/CursorGlow";
import { getInterviewReport } from "@/lib/reports";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  const report = await getInterviewReport(reportId);
  if (!report) {
    return { title: "Report not found — GitGlow" };
  }
  return {
    title: `Interview prep · @${report.username} — GitGlow`,
    description: `Interview readiness score: ${report.analysis.score}/100. View generated questions, focus areas, and preparation tips.`,
  };
}

export default async function InterviewPrepReportPage({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  const report = await getInterviewReport(reportId);
  if (!report) notFound();

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <CursorGlow />
      <Navbar />
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute h-[32rem] w-[42rem] rounded-full bg-[#d7ff54]/[0.06] blur-[120px]" />
        <div className="relative w-full">
          <InterviewReport report={report} />
        </div>
      </section>
    </main>
  );
}
