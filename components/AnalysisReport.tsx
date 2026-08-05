import Link from "next/link";
import CopyReportLink from "@/components/CopyReportLink";
import type { PortfolioReport } from "@/lib/reports";

function FeedbackList({ items, positive }: { items: string[]; positive: boolean }) {
  return (
    <ul className="mt-5 space-y-3.5">
      {items.map((item) => (
        <li className="flex items-start gap-3 text-sm leading-5 text-zinc-300" key={item}>
          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${positive ? "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]" : "border-zinc-700 bg-zinc-800 text-zinc-300"}`}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden="true"><path d={positive ? "M5 10l3 3 7-7" : "M10 5v5l3 2"} strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AnalysisReport({ report }: { report: PortfolioReport }) {
  const { analysis } = report;
  const { metrics } = analysis;
  const generatedDate = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt));
  const metricCards = [
    ["Repositories", metrics.repositoryCount],
    ["Active projects", metrics.activeRepositories],
    ["Documentation", `${metrics.documentationScore}/100`],
    ["Project diversity", `${metrics.projectDiversityScore}/100`],
  ];

  return (
    <section className="mx-auto w-full max-w-3xl animate-fade-in-up">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101012]/90 shadow-[0_30px_90px_rgba(0,0,0,0.4)] before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-500 before:to-transparent transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 px-4 py-3 text-xs sm:px-8"><span className="font-medium text-zinc-400">Portfolio assessment</span><span className="hidden items-center gap-1.5 text-zinc-500 sm:inline-flex"><span className="size-1.5 rounded-full bg-[#d7ff54] shadow-[0_0_8px#d7ff54]" />Public report</span></div>
        <div className="p-5 sm:p-8">
          <div className="flex flex-col justify-between gap-5 border-b border-zinc-800 pb-6 sm:gap-7 sm:pb-8 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">GitHub portfolio · @{report.username}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Portfolio score</h1>
              <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">Generated {generatedDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-[3.5rem] place-items-center rounded-full p-1 shadow-[0_0_28px_rgba(215,255,84,0.15)] sm:size-[4.5rem]" style={{ background: `conic-gradient(#d7ff54 0deg ${analysis.score * 3.6}deg, #27272a ${analysis.score * 3.6}deg 360deg)` }}>
                <div className="grid size-full place-items-center rounded-full bg-[#101012]">
                  <span className="text-lg font-semibold tracking-[-0.06em] text-[#d7ff54] sm:text-xl">{analysis.score}</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:text-xs">Out of</p>
                <p className="mt-1 text-sm font-medium text-zinc-300">100 points</p>
              </div>
            </div>
          </div>

          {metrics.repositoryCount > 0 && <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:mt-8 sm:grid-cols-4">{metricCards.map(([label, value]) => <div className="bg-[#111113] px-3 py-3 sm:px-4 sm:py-4 transition-colors duration-200" key={label as string}><p className="text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500 sm:text-[11px]">{label}</p><p className="mt-1.5 text-base font-semibold tracking-[-0.04em] text-zinc-100 sm:text-lg">{value as string | number}</p></div>)}</div>}

          <div className="mt-6 grid gap-8 pt-6 sm:mt-8 sm:gap-10 sm:pt-8 sm:grid-cols-2 sm:gap-12"><div><p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">What stands out</p><h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-zinc-100">Strengths</h2><FeedbackList items={analysis.strengths} positive /></div><div><p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">What to improve</p><h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-zinc-100">Recommendations</h2><FeedbackList items={analysis.recommendations} positive={false} /></div></div>

          {metrics.topLanguages.length > 0 && <div className="mt-7 border-t border-zinc-800 pt-6 sm:mt-9 sm:pt-7"><p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Primary languages</p><div className="mt-2.5 sm:mt-3 flex flex-wrap gap-2">{metrics.topLanguages.map((language: string) => <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 sm:px-3 sm:py-1.5 transition-colors duration-200" key={language}>{language}</span>)}</div></div>}

          {analysis.repositories.length > 0 && <section className="mt-7 border-t border-zinc-800 pt-6 sm:mt-9 sm:pt-8"><p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">Project-level feedback</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-zinc-100">Repository breakdown</h2><div className="mt-4 space-y-3 sm:mt-5">{analysis.repositories.map((repository: { name: string; summary: string; score: number; recommendations: string[] }) => <article key={repository.name} className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 sm:p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90"><div className="flex items-start justify-between gap-3 sm:gap-4"><div className="min-w-0 flex-1"><h3 className="font-medium text-zinc-100 break-words">{repository.name}</h3><p className="mt-1 text-sm leading-6 text-zinc-400">{repository.summary}</p></div><span className="shrink-0 rounded-lg bg-[#d7ff54]/10 px-2 py-1 text-sm font-semibold text-[#d7ff54] sm:px-2.5 sm:py-1.5">{repository.score}</span></div><ul className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2">{repository.recommendations.map((recommendation: string) => <li key={recommendation} className="flex gap-2 text-xs leading-5 text-zinc-400"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#d7ff54]" />{recommendation}</li>)}</ul></article>)}</div></section>}
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row"><Link href="/analyze" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-[#d7ff54]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>Analyze again</Link><CopyReportLink reportId={report.id} /></div>
    </section>
  );
}
