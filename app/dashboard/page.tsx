import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import SignOutButton from "@/components/SignOutButton";
import { getPortfolioReportsForUser, getResumeReportsForUser, getCompanyReportsForUser, getInterviewReportsForUser } from "@/lib/reports";
import { createClient } from "@/lib/supabase/server";
import MetricBarChart from "@/components/MetricBarChart";
import ScoreTrendChart from "@/components/ScoreTrendChart";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard — GitGlow",
  description: "View your GitHub portfolio reports, scores, and improvement history.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const username = typeof user.user_metadata.user_name === "string" ? user.user_metadata.user_name : user.email?.split("@")[0] ?? "developer";
  const reports = await getPortfolioReportsForUser(user.id);
  const resumeReports = await getResumeReportsForUser(user.id);
  const companyReports = await getCompanyReportsForUser(user.id);
  const interviewReports = await getInterviewReportsForUser(user.id);
  const latestReport = reports[0];
  const latestResumeReport = resumeReports[0];
  const latestCompanyReport = companyReports[0];
  const latestInterviewReport = interviewReports[0];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <Navbar />
      <section className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-zinc-800 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[#d7ff54]">Your portfolio workspace</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Welcome back, @{username}.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
              Review your latest GitHub portfolio feedback and keep improving the work recruiters see.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <SignOutButton />
            <Link href="/analyze" className="rounded-full bg-[#d7ff54] px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-[#e0ff7b]">
              Analyze portfolio
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Latest report</p>
                <h2 className="mt-2 text-xl font-semibold text-zinc-100">
                  {latestReport ? `Portfolio score: ${latestReport.analysis.score}/100` : "Your first report is waiting"}
                </h2>
              </div>
              {latestReport && (
                <span className="grid size-12 place-items-center rounded-xl bg-[#d7ff54]/10 text-lg font-semibold text-[#d7ff54]">
                  {latestReport.analysis.score}
                </span>
              )}
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              {latestReport
                ? `Generated ${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(latestReport.createdAt))}. Re-analyze after making improvements to keep your feedback current.`
                : "Connect your visible work to a concrete set of portfolio improvements."}
            </p>
            <Link
              href={latestReport ? `/analysis/${latestReport.id}` : "/analyze"}
              className="mt-7 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              {latestReport ? "Open latest report" : "Create your first report"}
            </Link>

            {latestReport && (
              <div className="mt-8 border-t border-zinc-800 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Metrics breakdown</p>
                <MetricBarChart metrics={latestReport.analysis.metrics} />
              </div>
            )}

            {reports.length > 1 && (
              <div className="mt-8 border-t border-zinc-800 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Score trend</p>
                <ScoreTrendChart reports={reports} />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Report history</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-zinc-100">
              {reports.length + resumeReports.length + companyReports.length}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {reports.length} portfolio {reports.length === 1 ? "report" : "reports"}, {resumeReports.length} resume {resumeReports.length === 1 ? "comparison" : "comparisons"}, {companyReports.length} company {companyReports.length === 1 ? "analysis" : "analyses"}, and {interviewReports.length} interview {interviewReports.length === 1 ? "prep" : "preps"}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/company-readiness" className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900">
                Analyze company
              </Link>
              <Link href="/interview-prep" className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900">
                Interview prep
              </Link>
            </div>
          </div>
        </div>

        {latestInterviewReport && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Latest interview prep</p>
                <h2 className="mt-2 text-xl font-semibold text-zinc-100">
                  Interview readiness: {latestInterviewReport.analysis.score}/100
                </h2>
              </div>
              <span className="grid size-12 place-items-center rounded-xl bg-[#d7ff54]/10 text-lg font-semibold text-[#d7ff54]">
                {latestInterviewReport.analysis.score}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              Generated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(latestInterviewReport.createdAt))}. Review questions and focus areas.
            </p>
            <Link
              href={`/interview-prep/${latestInterviewReport.id}`}
              className="mt-7 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Open latest interview prep
            </Link>
          </div>
        )}

        {latestResumeReport && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Latest resume comparison</p>
                <h2 className="mt-2 text-xl font-semibold text-zinc-100">
                  Resume alignment: {latestResumeReport.analysis.score}/100
                </h2>
              </div>
              <span className="grid size-12 place-items-center rounded-xl bg-[#d7ff54]/10 text-lg font-semibold text-[#d7ff54]">
                {latestResumeReport.analysis.score}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              Generated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(latestResumeReport.createdAt))}. Review skill gaps and project alignment.
            </p>
            <Link
              href={`/resume/${latestResumeReport.id}`}
              className="mt-7 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Open latest resume report
            </Link>
          </div>
        )}

        {latestCompanyReport && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Latest company readiness</p>
                <h2 className="mt-2 text-xl font-semibold text-zinc-100">
                  {latestCompanyReport.company}: {latestCompanyReport.analysis.score}/100
                </h2>
              </div>
              <span className="grid size-12 place-items-center rounded-xl bg-[#d7ff54]/10 text-lg font-semibold text-[#d7ff54]">
                {latestCompanyReport.analysis.score}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              Generated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(latestCompanyReport.createdAt))}. Review skills and project fit for {latestCompanyReport.company}.
            </p>
            <Link
              href={`/company-readiness/${latestCompanyReport.id}`}
              className="mt-7 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Open latest company report
            </Link>
          </div>
        )}

        {reports.length > 0 && (
          <section className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Previous portfolio analyses</p>
            <div className="mt-4 divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-[#101012]/70">
              {reports.map((report) => (
                <Link
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-zinc-900/60"
                  href={`/analysis/${report.id}`}
                  key={report.id}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-200">@{report.username}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#d7ff54]">{report.analysis.score}/100</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {resumeReports.length > 0 && (
          <section className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Previous resume comparisons</p>
            <div className="mt-4 divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-[#101012]/70">
              {resumeReports.map((report) => (
                <Link
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-zinc-900/60"
                  href={`/resume/${report.id}`}
                  key={report.id}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-200">@{report.username}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#d7ff54]">{report.analysis.score}/100</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {companyReports.length > 0 && (
          <section className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Previous company analyses</p>
            <div className="mt-4 divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-[#101012]/70">
              {companyReports.map((report) => (
                <Link
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-zinc-900/60"
                  href={`/company-readiness/${report.id}`}
                  key={report.id}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{report.company}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#d7ff54]">{report.analysis.score}/100</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {interviewReports.length > 0 && (
          <section className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Previous interview preps</p>
            <div className="mt-4 divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-[#101012]/70">
              {interviewReports.map((report) => (
                <Link
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-zinc-900/60"
                  href={`/interview-prep/${report.id}`}
                  key={report.id}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-200">@{report.username}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#d7ff54]">{report.analysis.score}/100</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
