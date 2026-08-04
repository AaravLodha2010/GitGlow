import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-6 pb-8 pt-16 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-8 border-b border-zinc-800 pb-12 sm:flex-row sm:items-end">
        <div><div className="flex items-center gap-2.5"><span className="grid size-7 place-items-center rounded-lg bg-[#d7ff54]"><svg viewBox="0 0 24 24" className="size-4 text-zinc-950" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M7 3v12a4 4 0 0 0 8 0V7M7 7h8" strokeLinecap="round" /></svg></span><span className="font-semibold tracking-[-0.04em]">GitGlow</span></div><p className="mt-4 max-w-xs text-sm leading-6 text-zinc-500">Your work deserves to be seen in its best light.</p></div>
        <Link id="get-started" href="/analyze" className="text-sm font-medium text-zinc-300 transition hover:text-[#d7ff54]">Analyze My GitHub <span aria-hidden="true">→</span></Link>
      </div>
      <div className="flex flex-col gap-3 py-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 GitGlow. Built for developers.</span><div className="flex gap-5"><Link href="/how-it-works" className="transition hover:text-zinc-300">How it works</Link><Link href="/pricing" className="transition hover:text-zinc-300">Pricing</Link></div></div>
    </footer>
  );
}
