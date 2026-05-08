"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const data = [
  { month: "Jan", receita: 180000, meta: 200000 },
  { month: "Fev", receita: 220000, meta: 200000 },
  { month: "Mar", receita: 195000, meta: 220000 },
  { month: "Abr", receita: 260000, meta: 220000 },
  { month: "Mai", receita: 284500, meta: 250000 },
  { month: "Jun", receita: null, meta: 280000 },
  { month: "Jul", receita: null, meta: 300000 },
];

const periods = ["7D", "1M", "3M", "6M", "1A"];

export function RevenueChart() {
  const [period, setPeriod] = useState("6M");

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-white">Receita</h3>
          <p className="text-sm text-white/30 mt-0.5">vs meta mensal</p>
        </div>
        <div
          className="flex rounded-xl p-1 gap-1"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-lg transition",
                period === p
                  ? "gradient-brand text-white shadow-sm"
                  : "text-white/30 hover:text-white/60"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v: number) => formatCurrency(v)}
            contentStyle={{
              background: "rgba(15,15,25,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              color: "#fff",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          />
          <Area
            type="monotone"
            dataKey="meta"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="url(#colorMeta)"
            name="Meta"
          />
          <Area
            type="monotone"
            dataKey="receita"
            stroke="#7c3aed"
            strokeWidth={2.5}
            fill="url(#colorReceita)"
            name="Receita"
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
