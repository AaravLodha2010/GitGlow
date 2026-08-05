"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PortfolioReport } from "@/lib/reports";

interface ScoreTrendChartProps {
  reports: PortfolioReport[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

export default function ScoreTrendChart({ reports }: ScoreTrendChartProps) {
  if (reports.length < 2) {
    return (
      <div className="mt-6 flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-zinc-800">
        <p className="text-sm text-zinc-500">Analyze your portfolio at least twice to see your score trend.</p>
      </div>
    );
  }

  const data = [...reports].reverse().map((report) => ({
    date: formatDate(report.createdAt),
    score: report.analysis.score,
  }));

  return (
    <div className="mt-6 h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d7ff54" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#d7ff54" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "0.75rem",
              color: "#e4e4e7",
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#d7ff54"
            strokeWidth={2}
            fill="url(#scoreGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
