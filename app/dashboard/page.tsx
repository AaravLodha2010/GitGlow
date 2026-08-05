import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import CursorGlow from "@/components/CursorGlow";
import SignOutButton from "@/components/SignOutButton";
import SharePortfolioButton from "@/components/SharePortfolioButton";
import { getPortfolioReportsForUser, getResumeReportsForUser, getCompanyReportsForUser, getInterviewReportsForUser } from "@/lib/reports";
import { createClient } from "@/lib/supabase/server";

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
  const totalReports = reports.length + resumeReports.length + companyReports.length + interviewReports.length;
  const hasPreviousReports = reports.length > 1 || resumeReports.length > 0 || companyReports.length > 0 || interviewReports.length > 0;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <CursorGlow />
      <Navbar />
      <section className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-zinc-800 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[#d7ff54]">Your portfolio workspace</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-5xl animate-fade-in-up">
              Welcome back, @{username}.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
              Review your latest feedback and keep improving the work recruiters see.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <SignOutButton />
            <Link href="/analyze" className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff54] px-5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_30px_rgba(215,255,84,0.15)] sm:px-6">Analyze portfolio</Link>
          </div>
        </div>

        {totalReports === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center animate-fade-in-up">
            <div className="grid size-20 place-items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 text-zinc-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-10" aria-hidden="true"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-zinc-100">No reports yet</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Analyze your GitHub profile to receive a clear portfolio review with specific improvements.
            </p>
            <Link href="/analyze" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff54] px-6 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_30px_rgba(215,255,84,0.15)]">
              Create your first report
            </Link>
          </div>
        ) : (
          <>
            {latestReport && (
              <div className="mt-10 animate-fade-in-up">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Latest portfolio score</p>
                <div className="mt-4 rounded-2xl border border-zinc-800 bg-[#101012]/90 p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
                  <div className="flex flex-col justify-between gap-5 border-b border-zinc-800 pb-6 sm:gap-7 sm:pb-8 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">GitHub portfolio · @{latestReport.username}</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Portfolio score</h2>
                      <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">Generated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(latestReport.createdAt))}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="grid size-[3.5rem] place-items-center rounded-full p-1 shadow-[0_0_28px_rgba(215,255,84,0.15)] sm:size-[4.5rem]" style={{ background: `conic-gradient(#d7ff54 0deg ${latestReport.analysis.score * 3.6}deg, #27272a ${latestReport.analysis.score * 3.6}deg 360deg)` }}>
                        <div className="grid size-full place-items-center rounded-full bg-[#101012]">
                          <span className="text-lg font-semibold tracking-[-0.06em] text-[#d7ff54] sm:text-xl">{latestReport.analysis.score}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:text-xs">Out of</p>
                        <p className="mt-1 text-sm font-medium text-zinc-300">100 points</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-8 pt-6 sm:mt-8 sm:gap-10 sm:pt-8 sm:grid-cols-2 sm:gap-12">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">What stands out</p>
                      <h2 className="mt-2 text-base font-semibold tracking-[-0.03em] text-zinc-100">Strengths</h2>
                      <ul className="mt-4 space-y-3">
                        {latestReport.analysis.strengths.slice(0, 3).map((item: string) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-5 text-zinc-300">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden="true"><path d="M5 10l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">What to improve</p>
                      <h2 className="mt-2 text-base font-semibold tracking-[-0.03em] text-zinc-100">Recommendations</h2>
                      <ul className="mt-4 space-y-3">
                        {latestReport.analysis.recommendations.slice(0, 3).map((item: string) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-5 text-zinc-300">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden="true"><path d="M10 5v5l3 2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <Link href={`/analysis/${latestReport.id}`} className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-700 px-5 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:border-zinc-500 hover:bg-zinc-900">
                      Open full report
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                    <SharePortfolioButton reportId={latestReport.id} isPublic={latestReport.isPublic} username={latestReport.username} />
                  </div>
                </div>
              </div>
            )}

            {hasPreviousReports && (
              <div className="mt-10 animate-fade-in-up">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Previous reports</p>
                <div className="mt-4 divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-[#101012]/70">
                  {reports.map((report) => (
                    <div key={report.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 transition-colors duration-200 hover:bg-zinc-900/60">
                      <Link href={`/analysis/${report.id}`} className="flex-1 min-w-0">
                        <div>
                          <p className="text-sm font-medium text-zinc-200 truncate">@{report.username}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                          </p>
                        </div>
                      </Link>
                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span className="text-sm font-semibold text-[#d7ff54]">{report.analysis.score}/100</span>
                        <SharePortfolioButton reportId={report.id} isPublic={report.isPublic} username={report.username} />
                      </div>
                    </div>
                  ))}
                  {resumeReports.map((report) => (
                    <Link
                      className="flex items-center justify-between gap-4 px-4 py-4 transition-colors duration-200 hover:bg-zinc-900/60 sm:px-6 sm:py-5"
                      href={`/resume/${report.id}`}
                      key={report.id}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-200 truncate">Resume comparison · @{report.username}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#d7ff54] shrink-0">{report.analysis.score}/100</span>
                    </Link>
                  ))}
                  {companyReports.map((report) => (
                    <Link
                      className="flex items-center justify-between gap-4 px-4 py-4 transition-colors duration-200 hover:bg-zinc-900/60 sm:px-6 sm:py-5"
                      href={`/company-readiness/${report.id}`}
                      key={report.id}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-200 truncate">{report.company} readiness</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#d7ff54] shrink-0">{report.analysis.score}/100</span>
                    </Link>
                  ))}
                  {interviewReports.map((report) => (
                    <Link
                      className="flex items-center justify-between gap-4 px-4 py-4 transition-colors duration-200 hover:bg-zinc-900/60 sm:px-6 sm:py-5"
                      href={`/interview-prep/${report.id}`}
                      key={report.id}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-200 truncate">Interview prep · @{report.username}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#d7ff54] shrink-0">{report.analysis.score}/100</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!hasPreviousReports && (
              <div className="mt-10 rounded-2xl border border-zinc-800 bg-[#101012]/80 p-6 text-center sm:p-8 animate-fade-in-up">
                <p className="text-sm font-medium text-zinc-300">Explore more analysis types</p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/resume" className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900">Resume analysis</Link>
                  <Link href="/company-readiness" className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900">Company readiness</Link>
                  <Link href="/interview-prep" className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900">Interview prep</Link>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
