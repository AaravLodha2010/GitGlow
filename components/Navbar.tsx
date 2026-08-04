import Link from "next/link";

export default function Navbar() {
  return (
    <header className="relative z-20 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
      <Link href="/" className="group flex items-center gap-2.5" aria-label="GitGlow home">
        <span className="grid size-7 place-items-center rounded-lg bg-[#d7ff54] shadow-[0_0_24px_rgba(215,255,84,0.2)] transition-transform duration-300 group-hover:rotate-6">
          <svg viewBox="0 0 24 24" className="size-4 text-zinc-950" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M7 3v12a4 4 0 0 0 8 0V7" strokeLinecap="round" />
            <path d="M7 7h8" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[17px] font-semibold tracking-[-0.04em]">GitGlow</span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex" aria-label="Main navigation">
        <Link className="transition-colors hover:text-zinc-100" href="/#features">Features</Link>
        <Link className="transition-colors hover:text-zinc-100" href="/#how-it-works">How It Works</Link>
        <Link className="transition-colors hover:text-zinc-100" href="/#pricing">Pricing</Link>
      </nav>

      <Link href="/analyze" className="rounded-full bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-zinc-950 transition duration-300 hover:bg-[#d7ff54] hover:shadow-[0_0_24px_rgba(215,255,84,0.16)] sm:px-5 sm:text-sm">
        Analyze My GitHub
      </Link>
    </header>
  );
}
