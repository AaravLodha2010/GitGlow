import Link from "next/link";

const strengths = ["Excellent documentation", "Strong project variety", "Professional repository structure"];
const recommendations = ["Add one backend project", "Improve commit consistency", "Contribute to one open-source repository"];

function InsightList({ items, tone }: { items: string[]; tone: "positive" | "neutral" }) {
  const iconClass = tone === "positive" ? "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]" : "border-zinc-700 bg-zinc-800 text-zinc-300";
  return <ul className="mt-5 space-y-3">{items.map((item) => <li className="flex items-center gap-3 text-sm text-zinc-300" key={item}><span className={`grid size-5 shrink-0 place-items-center rounded-full border ${iconClass}`}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden="true"><path d={tone === "positive" ? "M5 10l3 3 7-7" : "M10 5v5l3 2"} strokeLinecap="round" strokeLinejoin="round" /></svg></span>{item}</li>)}</ul>;
}

export default function AnalysisReport() {
  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 shadow-2xl shadow-black/25 sm:p-8">
        <div className="flex flex-col justify-between gap-5 border-b border-zinc-800 pb-7 sm:flex-row sm:items-start">
          <div><p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">GitGlow report</p><h1 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-zinc-100">GitHub Portfolio Score</h1></div>
          <div className="rounded-xl border border-[#d7ff54]/20 bg-[#d7ff54]/10 px-4 py-3 text-right"><span className="text-3xl font-semibold tracking-[-0.06em] text-[#d7ff54]">91</span><span className="ml-1 text-sm text-zinc-500">/ 100</span></div>
        </div>
        <div className="grid gap-9 pt-8 sm:grid-cols-2 sm:gap-12"><div><h2 className="text-base font-semibold text-zinc-100">Strengths</h2><InsightList items={strengths} tone="positive" /></div><div><h2 className="text-base font-semibold text-zinc-100">Recommendations</h2><InsightList items={recommendations} tone="neutral" /></div></div>
      </div>
      <Link href="/analyze" className="mx-auto mt-7 flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-[#d7ff54]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>Analyze another profile</Link>
    </section>
  );
}
