import AnalysisForm from "@/components/AnalysisForm";
import Navbar from "@/components/Navbar";

export default function AnalyzePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#09090b] text-zinc-50">
      <Navbar />
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-[#d7ff54]/[0.07] blur-[120px]" />
        <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <p className="text-sm font-medium text-[#d7ff54]">Portfolio review</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100">GitHub Portfolio Analysis</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Enter your GitHub username to generate a portfolio report.</p>
          <div className="mt-8"><AnalysisForm /></div>
        </div>
      </section>
    </main>
  );
}
