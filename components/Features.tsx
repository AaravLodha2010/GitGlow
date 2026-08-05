const features = [
  { title: "Portfolio Review", text: "A recruiter-minded review of your public GitHub profile. See what stands out and what to fix.", icon: <path d="M12 3l1.7 5.3H19l-4.3 3.1 1.6 5.3-4.3-3.1-4.3 3.1 1.6-5.3L5 8.3h5.3L12 3z" /> },
  { title: "Resume Alignment", text: "Compare your resume against GitHub projects to spot skill gaps, missing experience, and inconsistencies.", icon: <><path d="M4 13.5l4-4 3 2.5 6-6" /><path d="M13 6h4v4" /></> },
  { title: "README Review", text: "Get focused guidance on documentation that helps recruiters understand your work without running it.", icon: <><path d="M5 4.5A2.5 2.5 0 017.5 2H19v17H7.5A2.5 2.5 0 515 16.5v-12z" /><path d="M5 16.5A2.5 2.5 0 017.5 14H19" /></> },
  { title: "Interview Prep", text: "Practice with personalized questions based on your actual projects, skills, and experience.", icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></> },
];

export default function Features() {
  return (
    <section className="border-y border-zinc-900/90 bg-zinc-950/30 py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl"><p className="text-sm font-medium text-[#d7ff54]">Everything you need</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">Build a GitHub that opens doors.</h2></div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article key={feature.title} className="group rounded-2xl border border-zinc-800/90 bg-[#101012] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/90 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <span className="grid size-10 place-items-center rounded-xl border border-[#d7ff54]/15 bg-[#d7ff54]/10 text-[#d7ff54]"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5" aria-hidden="true">{feature.icon}</svg></span>
              <h3 className="mt-7 text-base font-semibold tracking-[-0.025em] text-zinc-100">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
