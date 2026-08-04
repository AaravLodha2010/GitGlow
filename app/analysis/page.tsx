import AnalysisReport from "@/components/AnalysisReport";
import Navbar from "@/components/Navbar";

export default function AnalysisPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#09090b] text-zinc-50">
      <Navbar />
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute h-[32rem] w-[42rem] rounded-full bg-[#d7ff54]/[0.06] blur-[120px]" />
        <div className="relative w-full"><AnalysisReport /></div>
      </section>
    </main>
  );
}
