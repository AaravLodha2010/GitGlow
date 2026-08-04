import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";

export default function HowItWorksPage() {
  return <main className="relative isolate overflow-hidden bg-[#09090b] text-zinc-50"><PageAtmosphere /><Navbar /><section className="relative mx-auto max-w-3xl px-6 pb-4 pt-20 text-center sm:pt-28"><p className="text-sm font-medium text-[#d7ff54]">Built for your next opportunity</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">A more useful way to look at your GitHub.</h1><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400">GitGlow turns the public work you have already shared into a portfolio report designed to help you improve with intention.</p></section><HowItWorks /><section className="relative mx-auto max-w-5xl px-6 pb-24 lg:px-8"><div className="grid gap-4 rounded-2xl border border-zinc-800 bg-[#101012]/80 p-6 text-sm leading-6 text-zinc-400 sm:grid-cols-3 sm:p-8"><p><span className="block font-medium text-zinc-200">Private by default</span>We only assess public GitHub information.</p><p><span className="block font-medium text-zinc-200">Grounded feedback</span>Recommendations are based on your visible portfolio work.</p><p><span className="block font-medium text-zinc-200">Yours to share</span>Each saved report has its own shareable link.</p></div></section><Footer /></main>;
}
