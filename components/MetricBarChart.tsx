"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PortfolioReport } from "@/lib/reports";

const metricChartData = [
  { name: "Documentation", key: "documentationScore" as const },
  { name: "Diversity", key: "projectDiversityScore" as const },
];

export default function MetricBarChart({
  metrics,
}: {
  metrics: PortfolioReport["analysis"]["metrics"];
}) {
  const data = metricChartData.map((item) => ({
    name: item.name,
    value: metrics[item.key] as number,
  }));

  return (
    <div className="mt-6 h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "0.75rem",
              color: "#e4e4e7",
            }}
          />
          <Bar dataKey="value" fill="#d7ff54" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
