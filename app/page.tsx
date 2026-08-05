import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import PortfolioPreview from "@/components/PortfolioPreview";
import PricingCards from "@/components/PricingCards";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <CursorGlow />
      <Navbar />
      <Hero />
      <PortfolioPreview />
      <HowItWorks />
      <Features />
      <section className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 animate-fade-in-up" id="pricing"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="text-sm font-medium text-[#d7ff54]">Simple pricing</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-5xl">Start free. Keep building.</h2><p className="mt-5 text-base leading-7 text-zinc-400">A clear look at your public work should not be a barrier to getting your next opportunity.</p></div><PricingCards /></section>
      <Footer />
    </main>
  );
}
