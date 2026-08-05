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
    <section className="mx-auto w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101012]/90 shadow-[0_30px_90px_rgba(0,0,0,0.4)] before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-500 before:to-transparent">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 px-6 py-3 text-xs sm:px-8"><span className="font-medium text-zinc-400">GitGlow AI assessment</span><span className="inline-flex items-center gap-1.5 text-zinc-500"><span className="size-1.5 rounded-full bg-[#d7ff54] shadow-[0_0_8px_#d7ff54]" />Public report</span></div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-7 border-b border-zinc-800 pb-8 sm:flex-row sm:items-center">
            <div><p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">GitHub portfolio · @{report.username}</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-zinc-100">Portfolio score</h1><p className="mt-2 text-sm text-zinc-500">Generated {generatedDate}</p></div>
            <div className="flex items-center gap-3"><div className="grid size-[4.5rem] place-items-center rounded-full p-1 shadow-[0_0_28px_rgba(215,255,84,0.15)]" style={{ background: `conic-gradient(#d7ff54 0deg ${analysis.score * 3.6}deg, #27272a ${analysis.score * 3.6}deg 360deg)` }}><div className="grid size-full place-items-center rounded-full bg-[#101012]"><span className="text-xl font-semibold tracking-[-0.06em] text-[#d7ff54]">{analysis.score}</span></div></div><div><p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Out of</p><p className="mt-1 text-sm font-medium text-zinc-300">100 points</p></div></div>
          </div>

          {metrics.repositoryCount > 0 && <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-4">{metricCards.map(([label, value]) => <div className="bg-[#111113] px-4 py-4" key={label as string}><p className="text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500">{label}</p><p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-zinc-100">{value as string | number}</p></div>)}</div>}

          <div className="grid gap-10 pt-8 sm:grid-cols-2 sm:gap-12"><div><p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">What stands out</p><h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-zinc-100">Strengths</h2><FeedbackList items={analysis.strengths} positive /></div><div><p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">What to improve</p><h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-zinc-100">Recommendations</h2><FeedbackList items={analysis.recommendations} positive={false} /></div></div>

          {metrics.topLanguages.length > 0 && <div className="mt-9 border-t border-zinc-800 pt-7"><p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Primary languages</p><div className="mt-3 flex flex-wrap gap-2">{metrics.topLanguages.map((language: string) => <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300" key={language}>{language}</span>)}</div></div>}

          {analysis.repositories.length > 0 && <section className="mt-9 border-t border-zinc-800 pt-8"><p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">Project-level feedback</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-zinc-100">Repository breakdown</h2><div className="mt-5 space-y-3">{analysis.repositories.map((repository: { name: string; summary: string; score: number; recommendations: string[] }) => <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-5" key={repository.name}><div className="flex items-start justify-between gap-4"><div><h3 className="font-medium text-zinc-100">{repository.name}</h3><p className="mt-1 text-sm leading-6 text-zinc-400">{repository.summary}</p></div><span className="shrink-0 rounded-lg bg-[#d7ff54]/10 px-2.5 py-1.5 text-sm font-semibold text-[#d7ff54]">{repository.score}</span></div><ul className="mt-4 grid gap-2 sm:grid-cols-2">{repository.recommendations.map((recommendation: string) => <li className="flex gap-2 text-xs leading-5 text-zinc-400" key={recommendation}><span className="mt-1.5 size-1 rounded-full bg-[#d7ff54]" />{recommendation}</li>)}</ul></article>)}</div></section>}
        </div>
      </div>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href="/analyze" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition hover:text-[#d7ff54]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>Analyze again</Link><CopyReportLink reportId={report.id} /></div>
    </section>
  );
}
