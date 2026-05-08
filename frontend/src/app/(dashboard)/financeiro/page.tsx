"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

const cardStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
};

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Financeiro</h1>
        <p className="text-white/30 mt-0.5">Gestão financeira e fluxo de caixa</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Receita do Mês", value: formatCurrency(284500), change: "+18%", positive: true, icon: TrendingUp, glow: "rgba(16,185,129,0.15)", color: "text-emerald-400", bg: "rgba(16,185,129,0.12)" },
          { label: "Despesas do Mês", value: formatCurrency(175000), change: "+8%", positive: false, icon: TrendingDown, glow: "rgba(239,68,68,0.12)", color: "text-red-400", bg: "rgba(239,68,68,0.1)" },
          { label: "Lucro Líquido", value: formatCurrency(109500), change: "+32%", positive: true, icon: DollarSign, glow: "rgba(59,130,246,0.15)", color: "text-blue-400", bg: "rgba(59,130,246,0.1)" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-5"
            style={{ ...cardStyle, boxShadow: `0 4px 30px ${stat.glow}` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.bg, border: "1px solid rgba(255,255,255,0.08)" }}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full ${stat.positive ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/30 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl p-5" style={cardStyle}>
          <h3 className="font-semibold text-white">Receitas vs Despesas</h3>
          <p className="text-sm text-white/30 mt-0.5 mb-5">Comparativo mensal</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => formatCurrency(v)}
                contentStyle={{ background: "rgba(15,15,25,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
                labelStyle={{ color: "rgba(255,255,255,0.5)" }}
              />
              <Bar dataKey="receitas" fill="#10b981" radius={[4, 4, 0, 0]} name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" radius={[4, 4, 0, 0]} name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white">Transações Recentes</h3>
            <button className="text-sm text-violet-400 hover:text-violet-300 transition flex items-center gap-1">
              Ver todas <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: t.type === "income" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {t.type === "income"
                    ? <TrendingUp className="w-4 h-4 text-emerald-400" />
                    : <TrendingDown className="w-4 h-4 text-red-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{t.desc}</p>
                  <p className="text-xs text-white/30">{t.category} · {formatDate(t.date)}</p>
                </div>
                <span className={`text-sm font-semibold flex-shrink-0 ${t.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
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
