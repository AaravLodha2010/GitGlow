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
    <div className="mt-6 h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d7ff54" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#d7ff54" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "0.75rem",
              color: "#e4e4e7",
              fontSize: "12px",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
            formatter={(value) => <span className="text-[#d7ff54]">{`${value}/100`}</span>}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#d7ff54"
            strokeWidth={2}
            fill="url(#scoreGradient)"
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
