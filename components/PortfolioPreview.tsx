const scores = [
  { label: "README", value: 5 },
  { label: "Projects", value: 5 },
  { label: "Documentation", value: 4 },
  { label: "Commits", value: 3 },
];

function Stars({ value }: { value: number }) {
  return <span className="font-mono text-[11px] tracking-[0.04em] text-[#d7ff54]">{"★".repeat(value)}<span className="text-zinc-700">{"★".repeat(5 - value)}</span></span>;
}

export default function PortfolioPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8" id="portfolio-preview">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="mx-auto grid max-w-5xl items-center gap-12 pt-20 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
        <div>
          <p className="text-sm font-medium text-[#d7ff54]">A clearer signal</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-4xl">Know what recruiters see at a glance.</h2>
          <p className="mt-5 text-base leading-7 text-zinc-400">Get an honest, practical view of the work you have already put out into the world — and the focused next steps that make it shine.</p>
        </div>
        <div className="relative mx-auto w-full max-w-[500px]">
          <div className="absolute -inset-10 -z-10 rounded-full bg-[#d7ff54]/10 blur-3xl" />
          <article className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">GitHub Portfolio Score</p>
                <div className="mt-2 flex items-baseline gap-1.5"><span className="text-4xl font-semibold tracking-[-0.06em] text-zinc-100">91</span><span className="text-sm text-zinc-500">/ 100</span></div>
              </div>
              <div className="grid size-11 place-items-center rounded-xl border border-[#d7ff54]/20 bg-[#d7ff54]/10 text-sm font-semibold text-[#d7ff54]">A+</div>
            </div>
            <div className="my-6 h-px bg-zinc-800" />
            <div className="space-y-3.5">
              {scores.map((score) => <div className="flex items-center justify-between" key={score.label}><span className="text-sm text-zinc-300">{score.label}</span><Stars value={score.value} /></div>)}
            </div>
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.13em] text-zinc-500">Recruiter Impression</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">“Strong real-world projects and documentation. Improve commit consistency and add one collaborative project.”</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
