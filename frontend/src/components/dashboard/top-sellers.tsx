"use client";

import { getInitials, formatCurrency } from "@/lib/utils";
import { Trophy } from "lucide-react";

const sellers = [
  { name: "Carlos Silva", deals: 24, revenue: 87400 },
  { name: "Ana Lima", deals: 19, revenue: 72100 },
  { name: "Pedro Santos", deals: 16, revenue: 58900 },
  { name: "Juliana Costa", deals: 14, revenue: 49300 },
];

const medals = ["🥇", "🥈", "🥉", "4º"];
const avatarColors = [
  { bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.25)", text: "text-yellow-400" },
  { bg: "rgba(148,163,184,0.15)", border: "rgba(148,163,184,0.25)", text: "text-slate-400" },
  { bg: "rgba(180,83,9,0.15)", border: "rgba(180,83,9,0.25)", text: "text-amber-600" },
  { bg: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.25)", text: "text-violet-400" },
];

export function TopSellers() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-yellow-400" />
        <h3 className="font-semibold text-white">Top Vendedores</h3>
      </div>
      <div className="space-y-3">
        {sellers.map((s, i) => {
          const c = avatarColors[i];
          return (
            <div key={s.name} className="flex items-center gap-3">
              <span className="text-base w-6">{medals[i]}</span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${c.text}`}
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              >
                {getInitials(s.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{s.name}</p>
                <p className="text-xs text-white/30">{s.deals} negócios</p>
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                {formatCurrency(s.revenue)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
