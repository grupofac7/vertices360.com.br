"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const monthlyData = [
  { month: "Jan", receitas: 180000, despesas: 120000 },
  { month: "Fev", receitas: 220000, despesas: 140000 },
  { month: "Mar", receitas: 195000, despesas: 130000 },
  { month: "Abr", receitas: 260000, despesas: 160000 },
  { month: "Mai", receitas: 284500, despesas: 175000 },
];

const transactions = [
  { id: "1", desc: "Plano Enterprise - Roberto Almeida", type: "income", value: 12000, date: new Date(), category: "Venda" },
  { id: "2", desc: "Mensalidade SaaS", type: "expense", value: 2400, date: new Date(), category: "Software" },
  { id: "3", desc: "Plano Pro - Fernanda Souza", type: "income", value: 5800, date: new Date(), category: "Venda" },
  { id: "4", desc: "Campanha Meta Ads", type: "expense", value: 3200, date: new Date(), category: "Marketing" },
  { id: "5", desc: "Plano Enterprise - Patricia Lima", type: "income", value: 28000, date: new Date(), category: "Venda" },
];

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <p className="text-muted-foreground">Gestão financeira e fluxo de caixa</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Receita do Mês", value: formatCurrency(284500), change: "+18%", positive: true, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Despesas do Mês", value: formatCurrency(175000), change: "+8%", positive: false, icon: TrendingDown, color: "text-red-500", bg: "bg-red-500/10" },
          { label: "Lucro Líquido", value: formatCurrency(109500), change: "+32%", positive: true, icon: DollarSign, color: "text-blue-500", bg: "bg-blue-500/10" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-1">Receitas vs Despesas</h3>
          <p className="text-sm text-muted-foreground mb-5">Comparativo mensal</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => formatCurrency(v)}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
              />
              <Bar dataKey="receitas" fill="#10b981" radius={[4, 4, 0, 0]} name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" radius={[4, 4, 0, 0]} name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Transações Recentes</h3>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todas <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${t.type === "income" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                  {t.type === "income" ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.desc}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · {formatDate(t.date)}</p>
                </div>
                <span className={`text-sm font-semibold flex-shrink-0 ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
