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

export function TopSellers() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-yellow-500" />
        <h3 className="font-semibold">Top Vendedores</h3>
      </div>
      <div className="space-y-3">
        {sellers.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="text-lg w-6">{medals[i]}</span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
              {getInitials(s.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.deals} negócios</p>
            </div>
            <span className="text-sm font-semibold text-green-500">
              {formatCurrency(s.revenue)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
