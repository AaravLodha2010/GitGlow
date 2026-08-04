import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PortfolioPreview from "@/components/PortfolioPreview";

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#09090b] text-zinc-50">
      <Navbar />
      <Hero />
      <PortfolioPreview />
      <Features />
      <Footer />
    </main>
  );
}
