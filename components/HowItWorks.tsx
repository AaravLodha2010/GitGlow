const steps = [
  { number: "01", title: "Share your username", text: "Enter any public GitHub username. No sign-in or repository access is required." },
  { number: "02", title: "We read the signal", text: "GitGlow reviews public profile details, active repositories, and available README documentation." },
  { number: "03", title: "Get a focused roadmap", text: "Receive an AI-generated score, the work that already stands out, and practical next moves." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8" id="how-it-works">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div><p className="text-sm font-medium text-[#d7ff54]">How it works</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-5xl">Turn the work you have done into a clearer story.</h2><p className="mt-6 max-w-md text-base leading-7 text-zinc-400">GitGlow does not replace your GitHub. It helps you see it from the perspective of the people deciding who to interview.</p></div>
        <ol className="divide-y divide-zinc-800 border-y border-zinc-800">{steps.map((step) => <li className="group grid gap-4 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6" key={step.number}><span className="font-mono text-xs font-medium text-[#d7ff54]">{step.number}</span><div><h3 className="text-lg font-semibold tracking-[-0.03em] text-zinc-100">{step.title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-zinc-400">{step.text}</p></div></li>)}</ol>
      </div>
    </section>
  );
}
