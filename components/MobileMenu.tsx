"use client";

import { useEffect, useState } from "react";

export default function MobileMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex size-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-300 transition hover:border-zinc-700 hover:text-zinc-100"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
          {isOpen ? (
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-lg origin-top border-b border-zinc-800 bg-[#09090b]/95 px-6 pb-6 pt-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition-transform duration-200 ease-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-[-0.04em] text-zinc-100">Menu</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition hover:text-zinc-100"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {children}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
