"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Percent } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Leads Hoje",
    value: "48",
    change: "+12%",
    positive: true,
    icon: Users,
    gradient: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    label: "Receita do Mês",
    value: formatCurrency(284500),
    change: "+18.2%",
    positive: true,
    icon: DollarSign,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    label: "Meta Mensal",
    value: "71%",
    change: "+5%",
    positive: true,
    icon: Target,
    gradient: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-400",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    label: "Taxa Conversão",
    value: "24.5%",
    change: "-2.1%",
    positive: false,
    icon: Percent,
    gradient: "from-orange-500/20 to-orange-600/5",
    iconColor: "text-orange-400",
    glow: "rgba(249,115,22,0.15)",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="relative rounded-2xl p-5 overflow-hidden group hover:scale-[1.01] transition-transform"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: `0 4px 30px ${stat.glow}`,
          }}
        >
          {/* Background gradient */}
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", stat.gradient)} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
              </div>
              <span
                className={cn(
                  "text-xs font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full",
                  stat.positive
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-red-400 bg-red-400/10"
                )}
              >
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/40 mt-0.5">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
