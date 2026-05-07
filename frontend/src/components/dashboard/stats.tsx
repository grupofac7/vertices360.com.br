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
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Receita do Mês",
    value: formatCurrency(284500),
    change: "+18.2%",
    positive: true,
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Meta Mensal",
    value: "71%",
    change: "+5%",
    positive: true,
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Taxa Conversão",
    value: "24.5%",
    change: "-2.1%",
    positive: false,
    icon: Percent,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
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
          transition={{ delay: i * 0.05 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <span
              className={cn(
                "text-xs font-medium flex items-center gap-0.5",
                stat.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
