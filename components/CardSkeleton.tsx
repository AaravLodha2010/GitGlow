"use client";

export default function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl border border-zinc-800 bg-[#101012] ${className}`}>
      <div className="space-y-4 p-6 sm:p-8">
        <div className="h-4 w-24 rounded bg-zinc-800" />
        <div className="h-6 w-48 rounded bg-zinc-800" />
        <div className="h-4 w-72 rounded bg-zinc-800" />
        <div className="space-y-2 pt-4">
          <div className="h-3 w-full rounded bg-zinc-800" />
          <div className="h-3 w-full rounded bg-zinc-800" />
          <div className="h-3 w-3/4 rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
