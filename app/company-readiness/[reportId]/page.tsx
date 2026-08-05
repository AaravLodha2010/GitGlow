import { notFound } from "next/navigation";
import CompanyReport from "@/components/CompanyReport";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import { getCompanyReport } from "@/lib/reports";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  const report = await getCompanyReport(reportId);
  if (!report) {
    return { title: "Report not found — GitGlow" };
  }
  return {
    title: `Company readiness · ${report.company} — GitGlow`,
    description: `GitHub portfolio readiness for ${report.company}: ${report.analysis.score}/100. View strengths, missing skills, and recommendations.`,
  };
}

export default async function CompanyReadinessReportPage({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  const report = await getCompanyReport(reportId);
  if (!report) notFound();

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <Navbar />
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute h-[32rem] w-[42rem] rounded-full bg-[#d7ff54]/[0.06] blur-[120px]" />
        <div className="relative w-full">
          <CompanyReport report={report} />
        </div>
      </section>
    </main>
  );
}
