import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import CursorGlow from "@/components/CursorGlow";
import CopyButton from "@/components/CopyButton";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — GitGlow",
  description: "Get in touch with GitGlow for feedback, bug reports, collaboration ideas, or questions about portfolio review.",
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0112 5.8c.85 0 1.7.12 2.5.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.43.2 2.49.1 2.75.64.73 1.03 1.65 1.03 2.78 0 3.97-2.34 4.84-4.57 5.1.36.32.68.93.68 1.87 0 1.35-.01 2.44-.01 2.77 0 .27.18.59.69.49A10.24 10.24 0 0022 12.23C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

const faqs = [
  {
    question: "Is GitGlow free?",
    answer: "Yes. GitGlow offers free portfolio analysis with additional features continuing to be developed.",
  },
  {
    question: "Does GitGlow access private repositories?",
    answer: "No. GitGlow only analyzes repositories and information that you have made publicly available on GitHub.",
  },
  {
    question: "Can I contribute?",
    answer: "At the moment GitGlow is maintained by a single developer, but feedback, feature suggestions, and bug reports are always welcome.",
  },
  {
    question: "Where can I report bugs?",
    answer: "Use the contact form above or reach out directly via email.",
  },
];

export default function ContactPage() {
  const email = "aaravlodha2010@gmail.com";
  const githubUrl = "https://github.com/AaravLodha2010";

  return (
    <main className="relative isolate overflow-hidden bg-[#09090b] text-zinc-50">
      <CursorGlow />
      <PageAtmosphere />
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-[-8rem] -z-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[#d7ff54]/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center animate-fade-in-up">
          <p className="text-sm font-medium text-[#d7ff54]">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-5xl lg:text-6xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Have feedback, found a bug, want to collaborate, or have an idea that could make GitGlow better?
            <br className="hidden sm:inline" />
            I’d love to hear from you.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            GitGlow is continuously improving, and thoughtful feedback helps shape future updates.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl animate-fade-in-up">
          <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-10">
            <ContactForm />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl animate-fade-in-up">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]">
                  <MailIcon />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Email</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">{email}</p>
                </div>
              </div>
              <div className="mt-4">
                <CopyButton text={email} />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]">
                  <GitHubIcon />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">GitHub</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">AaravLodha2010</p>
                </div>
              </div>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800"
              >
                View GitHub
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M7 3v12a4 4 0 0 0 8 0V7M7 7h8" strokeLinecap="round" /></svg>
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Typical response time</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-zinc-100">24–72 hours</p>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl animate-fade-in-up">
          <div className="text-center">
            <p className="text-sm font-medium text-[#d7ff54]">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100 sm:text-4xl">Common questions</h2>
          </div>

          <div className="mt-12 grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90 sm:p-8">
                <h3 className="text-base font-semibold tracking-[-0.025em] text-zinc-100">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl animate-fade-in-up">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101012]/90 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-12">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[#d7ff54]/[0.04] blur-3xl" aria-hidden="true" />
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Help shape GitGlow</h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-zinc-400">
              Every piece of feedback helps improve GitGlow for developers around the world.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/analyze" className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d7ff54] px-6 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_36px_rgba(215,255,84,0.22)] sm:w-auto">
                Analyze My GitHub
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 px-6 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto">
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-7xl animate-fade-in-up">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-center sm:flex-row">
            <p className="text-sm text-zinc-500">
              Built by <span className="font-medium text-zinc-300">Aarav Lodha</span>. Designed to help developers build stronger portfolios.
            </p>
            <div className="flex gap-6 text-sm text-zinc-500">
              <Link href="/how-it-works" className="transition hover:text-zinc-300">How it works</Link>
              <Link href="/pricing" className="transition hover:text-zinc-300">Pricing</Link>
              <Link href="/about" className="transition hover:text-zinc-300">About</Link>
              <Link href="/contact" className="transition hover:text-zinc-300">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
