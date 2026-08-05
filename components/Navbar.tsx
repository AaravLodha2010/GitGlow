import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import GitHubAuthButton from "@/components/GitHubAuthButton";
import { createClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="relative z-20 mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="group flex items-center gap-2.5" aria-label="GitGlow home">
        <span className="grid size-7 place-items-center rounded-lg bg-[#d7ff54] shadow-[0_0_24px_rgba(215,255,84,0.2)] transition-transform duration-300 group-hover:rotate-6">
          <svg viewBox="0 0 24 24" className="size-4 text-zinc-950" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M7 3v12a4 4 0 0 0 8 0V7" strokeLinecap="round" />
            <path d="M7 7h8" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-base sm:text-[17px] font-semibold tracking-[-0.04em]">GitGlow</span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex lg:gap-8" aria-label="Main navigation">
        <Link className="transition-colors hover:text-zinc-100" href="/#features">Features</Link>
        <Link className="transition-colors hover:text-zinc-100" href="/how-it-works">How It Works</Link>
        <Link className="transition-colors hover:text-zinc-100" href="/pricing">Pricing</Link>
        <Link className="transition-colors hover:text-zinc-100" href="/about">About</Link>
        <Link className="transition-colors hover:text-zinc-100" href="/contact">Contact</Link>
        {user && <Link className="transition-colors hover:text-zinc-100" href="/resume">Resume analysis</Link>}
        {user && <Link className="transition-colors hover:text-zinc-100" href="/company-readiness">Company readiness</Link>}
        {user && <Link className="transition-colors hover:text-zinc-100" href="/interview-prep">Interview prep</Link>}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        {user ? (
          <Link href="/dashboard" className="hidden rounded-full bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-950 transition duration-300 hover:bg-[#d7ff54] hover:shadow-[0_0_24px_rgba(215,255,84,0.16)] sm:px-5 sm:text-sm md:block">Open dashboard</Link>
        ) : (
          <div className="hidden md:block"><GitHubAuthButton compact /></div>
        )}
        <MobileMenu>
          <Link href="/#features" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">Features</Link>
          <Link href="/how-it-works" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">How It Works</Link>
          <Link href="/pricing" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">Pricing</Link>
          <Link href="/about" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">About</Link>
          <Link href="/contact" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">Contact</Link>
          {user && <Link href="/resume" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">Resume analysis</Link>}
          {user && <Link href="/company-readiness" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">Company readiness</Link>}
          {user && <Link href="/interview-prep" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-100 hover:bg-zinc-900/50">Interview prep</Link>}
          <div className="mt-4 border-t border-zinc-800 pt-4">
            {user ? (
              <Link href="/dashboard" className="flex items-center justify-center rounded-full bg-[#d7ff54] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-[#e0ff7b]">Open dashboard</Link>
            ) : (
              <GitHubAuthButton />
            )}
          </div>
        </MobileMenu>
      </div>
    </header>
  );
}
