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
    <div className="mt-6 h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="name"
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
            cursor={{ fill: "rgba(24, 24, 27, 0.4)" }}
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
          <Bar
            dataKey="value"
            fill="#d7ff54"
            radius={[6, 6, 0, 0]}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
