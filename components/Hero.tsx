import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28 lg:px-8 lg:pt-32 animate-fade-in-up" id="hero">
      <div className="pointer-events-none absolute left-1/2 top-[-9rem] -z-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[#b9e843]/[0.09] blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 sm:mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur">
          <span className="size-1.5 rounded-full bg-[#d7ff54] shadow-[0_0_8px#d7ff54]" />
          Built for developers
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.055em] text-zinc-50 sm:text-5xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.05] xl:text-7xl">
          Your GitHub portfolio, <span className="text-[#d7ff54]">reviewed.</span>
        </h1>
        <p className="mx-auto mt-5 sm:mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          Get a clear, honest review of your public GitHub profile. See what recruiters see, get specific improvements, and build a portfolio that opens doors.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/analyze" className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d7ff54] px-6 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_36px_rgba(215,255,84,0.22)] sm:w-auto">
            Analyze My GitHub
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <a href="#portfolio-preview" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-6 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto">
            View Demo
          </a>
        </div>
      </div>
    </section>
  );
}
