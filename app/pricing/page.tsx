import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import PricingCards from "@/components/PricingCards";

export const metadata = {
  title: "Pricing — GitGlow",
  description: "Simple, transparent pricing for GitGlow portfolio analysis.",
};

const faqs = [
  ["Is GitGlow free to use?", "Yes. During early access, the complete public GitHub analysis is available at no cost."],
  ["Do I need to connect my GitHub account?", "No. GitGlow analyzes public GitHub profiles by username, so there is no sign-in required."],
  ["What will Pro add?", "Pro is planned for developers who want progress tracking, richer guidance, and polished ways to present their portfolio."],
];

export default function PricingPage() {
  return <main className="relative isolate overflow-hidden bg-[#09090b] text-zinc-50"><PageAtmosphere /><Navbar /><section className="relative mx-auto max-w-3xl px-6 pb-16 pt-20 text-center sm:pt-28"><p className="text-sm font-medium text-[#d7ff54]">Simple, transparent pricing</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Start with the work you have already done.</h1><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400">GitGlow is free during early access. A future Pro plan will help you turn ongoing progress into a stronger developer narrative.</p></section><section className="relative mx-auto max-w-5xl px-6 pb-24 lg:px-8"><PricingCards /></section><section className="relative mx-auto max-w-3xl border-t border-zinc-800 px-6 py-24"><p className="text-center text-sm font-medium text-[#d7ff54]">Questions, answered</p><div className="mt-10 divide-y divide-zinc-800 border-y border-zinc-800">{faqs.map(([question, answer]) => <div className="py-6" key={question}><h2 className="font-medium text-zinc-100">{question}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">{answer}</p></div>)}</div></section><Footer /></main>;
}
