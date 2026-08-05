function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const styles: Record<string, string> = {
    easy: "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]",
    medium: "border-zinc-700 bg-zinc-800 text-zinc-300",
    hard: "border-zinc-700 bg-zinc-800 text-zinc-300",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[difficulty] ?? styles.medium}`}>
      {difficulty}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const labels: Record<string, string> = {
    technical: "Technical",
    behavioral: "Behavioral",
    system_design: "System Design",
    project: "Project",
  };

  return (
    <span className="inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
      {labels[type] ?? type}
    </span>
  );
}

export { DifficultyBadge, TypeBadge };
