import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";

export const metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFoundPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <Navbar />
      <section className="relative flex flex-1 items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium text-[#d7ff54]">Lost in the repository?</p>
          <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em] text-zinc-100 sm:text-7xl">404</h1>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            This page does not exist or has been moved. Let us get you back to improving your portfolio.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff54] px-6 text-sm font-semibold text-zinc-950 transition hover:bg-[#e0ff7b]"
            >
              Go home
            </Link>
            <Link
              href="/analyze"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-6 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
            >
              Analyze portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
