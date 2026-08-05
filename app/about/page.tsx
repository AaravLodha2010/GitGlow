import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import CursorGlow from "@/components/CursorGlow";

export const metadata = {
  title: "About — GitGlow",
  description: "GitGlow helps developers understand how their public GitHub portfolio represents them to recruiters, hiring managers, and collaborators.",
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-5 shrink-0 text-[#d7ff54]" aria-hidden="true">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepIcon({ number }: { number: number }) {
  return (
    <span className="grid size-10 place-items-center rounded-full border border-[#d7ff54]/20 bg-[#d7ff54]/10 text-sm font-semibold text-[#d7ff54]">
      {number}
    </span>
  );
}

const evaluateCards = [
  { title: "Repository quality", text: "Activity, consistency, and the overall strength of your public projects." },
  { title: "Documentation", text: "README clarity, setup instructions, and how well projects explain themselves." },
  { title: "Project diversity", text: "Range of technologies, problem domains, and types of projects." },
  { title: "Code organization", text: "Structure, naming, and readability of publicly visible code." },
  { title: "Technology stack", text: "Languages, frameworks, and tools demonstrated across repositories." },
  { title: "Portfolio presentation", text: "How your profile, pinned projects, and READMEs appear to outsiders." },
  { title: "Consistency", text: "Commit frequency, maintenance patterns, and long-term project health." },
  { title: "Career readiness", text: "How well your portfolio communicates skills employers look for." },
];

const privacyItems = [
  "GitGlow only analyzes information that is already publicly available on GitHub.",
  "GitGlow never modifies repositories.",
  "GitGlow never publishes commits.",
  "GitGlow never accesses private repositories.",
  "GitGlow never shares personal data with third parties.",
];

const lookingAhead = [
  { name: "Portfolio Progress Tracking", status: "completed" },
  { name: "Public Portfolio Sharing", status: "completed" },
  { name: "Resume Analysis", status: "completed" },
  { name: "Company Readiness Reports", status: "completed" },
  { name: "Interview Preparation", status: "completed" },
  { name: "Smarter Portfolio Insights", status: "coming-soon" },
];

export default function AboutPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#09090b] text-zinc-50">
      <CursorGlow />
      <PageAtmosphere />
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-[-8rem] -z-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[#d7ff54]/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center animate-fade-in-up">
          <p className="text-sm font-medium text-[#d7ff54]">About GitGlow</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-5xl lg:text-6xl">
            Built to help developers showcase their best work.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            GitGlow helps developers understand how their public GitHub portfolio represents them to recruiters, hiring managers, internship reviewers, and collaborators.
            <br className="hidden sm:inline" />
            <br className="hidden sm:inline" />
            Instead of guessing what to improve, GitGlow provides clear insights and practical recommendations that help developers present stronger projects and grow over time.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/analyze" className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d7ff54] px-6 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_36px_rgba(215,255,84,0.22)] sm:w-auto">
              Analyze My GitHub
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href="#features" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-6 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto">
              View Features
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-24 max-w-3xl animate-fade-in-up">
          <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-10">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Our Mission</h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Software portfolios are becoming just as important as resumes.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Many developers spend hundreds of hours building projects but never receive meaningful feedback on how those projects appear to employers.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              GitGlow was created to bridge that gap.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Our goal is to help developers improve—not by replacing creativity—but by making portfolio feedback more accessible, more understandable, and more actionable.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Whether you&rsquo;re preparing for your first internship or building an experienced engineering portfolio, GitGlow helps you identify opportunities to improve and communicate your work more effectively.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl animate-fade-in-up">
          <div className="text-center">
            <p className="text-sm font-medium text-[#d7ff54]">How GitGlow Works</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-4xl">From username to clear feedback.</h2>
          </div>

          <div className="mt-12 relative">
            <div className="absolute left-5 top-0 h-full w-px bg-zinc-800 sm:left-1/2" aria-hidden="true" />

            <div className="space-y-12">
              {[
                { step: "Connect your GitHub username.", desc: "No sign-in or repository access is required for public profiles." },
                { step: "GitGlow analyzes your public repositories.", desc: "We review documentation, project diversity, activity, and portfolio presentation." },
                { step: "Receive an easy-to-understand report.", desc: "See strengths, practical recommendations, and specific improvements." },
                { step: "Continue improving over time.", desc: "Track new reports and progress as your portfolio evolves." },
              ].map((item, index) => (
                <div key={index} className="relative flex items-start gap-6 sm:gap-10">
                  <div className="relative z-10 mt-1">
                    <StepIcon number={index + 1} />
                  </div>
                  <div className="flex-1 rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90 sm:p-8">
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-zinc-100">{item.step}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-7xl animate-fade-in-up" id="features">
          <div className="text-center">
            <p className="text-sm font-medium text-[#d7ff54]">What GitGlow Evaluates</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-4xl">Every angle that matters.</h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {evaluateCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/90">
                <h3 className="text-base font-semibold tracking-[-0.025em] text-zinc-100">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{card.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl animate-fade-in-up">
          <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-10">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Privacy First</h2>
            </div>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              GitGlow only analyzes information that is already publicly available on GitHub.
            </p>

            <ul className="mt-6 space-y-3">
              {privacyItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                  <span className="mt-0.5 shrink-0"><CheckIcon /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-6 text-zinc-400">
              Reports are generated to help developers improve their public portfolio, and users remain in complete control of what they choose to share.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl animate-fade-in-up">
          <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-10">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Why I Built GitGlow</h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              GitGlow began as a student project inspired by a simple observation.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Developers invest countless hours building projects, yet many have no clear way to understand how those projects appear to internship recruiters, university admissions teams, or future employers.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              I wanted to create a tool that makes portfolio feedback more accessible while encouraging developers to continue learning and improving.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              GitGlow is designed to provide practical insights—not final judgments.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              The objective isn&rsquo;t to assign a number. It&rsquo;s to help developers build stronger portfolios over time.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-7xl animate-fade-in-up">
          <div className="text-center">
            <p className="text-sm font-medium text-[#d7ff54]">What&rsquo;s Next</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-4xl">Looking ahead.</h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lookingAhead.map((item) => (
              <article key={item.name} className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold tracking-[-0.025em] text-zinc-100">{item.name}</h3>
                  {item.status === "completed" ? (
                    <span className="inline-flex rounded-full border border-[#d7ff54]/20 bg-[#d7ff54]/10 px-2.5 py-0.5 text-xs font-medium text-[#d7ff54]">Completed</span>
                  ) : (
                    <span className="inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-zinc-500">Coming Soon</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl animate-fade-in-up">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101012]/90 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-12">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[#d7ff54]/[0.04] blur-3xl" aria-hidden="true" />
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Ready to improve your portfolio?</h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-zinc-400">
              Join developers using GitGlow to build stronger GitHub portfolios.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/analyze" className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d7ff54] px-6 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_36px_rgba(215,255,84,0.22)] sm:w-auto">
                Analyze My GitHub
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/auth/login" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-6 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
