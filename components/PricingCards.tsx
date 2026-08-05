import Link from "next/link";

const plans = [
  {
    name: "Early access",
    price: "$0",
    description: "A complete portfolio checkup for developers building their next opportunity.",
    features: ["Portfolio score", "Public report link", "Repository and README review", "Actionable recommendations"],
    action: "Analyze my GitHub",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    suffix: "/ month",
    description: "For developers who want progress tracking and polished ways to present their portfolio.",
    features: ["Everything in early access", "Progress over time", "Resume-ready portfolio export", "Deeper project guidance"],
    action: "Coming soon",
    featured: true,
  },
];

export default function PricingCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {plans.map((plan) => (
        <article
          className={`relative rounded-2xl border p-7 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 ${
            plan.featured
              ? "border-[#d7ff54]/40 bg-[#d7ff54]/[0.055] shadow-[0_0_60px_rgba(215,255,84,0.07)]"
              : "border-zinc-800 bg-[#101012]/80 hover:border-zinc-700 hover:bg-zinc-900/80"
          }`}
          key={plan.name}
        >
          {plan.featured && (
            <span className="absolute right-6 top-6 rounded-full border border-[#d7ff54]/25 bg-[#d7ff54]/10 px-2.5 py-1 text-[11px] font-medium text-[#d7ff54]">
              Planned
            </span>
          )}
          <p className="text-sm font-medium text-[#d7ff54]">{plan.name}</p>
          <div className="mt-4 flex items-end gap-1">
            <span className="text-4xl font-semibold tracking-[-0.06em] text-zinc-100">{plan.price}</span>
            {plan.suffix && <span className="mb-1 text-sm text-zinc-500">{plan.suffix}</span>}
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">{plan.description}</p>
          <ul className="mt-7 space-y-3">
            {plan.features.map((feature) => (
              <li className="flex items-center gap-3 text-sm text-zinc-300" key={feature}>
                <span className="grid size-5 place-items-center rounded-full bg-[#d7ff54]/10 text-[#d7ff54]">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden="true">
                    <path d="M5 10l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/analyze"
            className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
              plan.featured
                ? "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100"
                : "bg-[#d7ff54] text-zinc-950 hover:bg-[#e0ff7b] hover:shadow-[0_10px_30px_rgba(215,255,84,0.15)]"
            }`}
          >
            {plan.action}
          </Link>
        </article>
      ))}
    </div>
  );
}
