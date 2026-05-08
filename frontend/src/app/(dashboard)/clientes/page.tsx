"use client";

import { motion } from "framer-motion";
import { Search, Plus, Star, Phone, MessageCircle } from "lucide-react";
import { formatCurrency, getInitials, formatDate } from "@/lib/utils";

const clients = [
  { id: "1", name: "Empresa Tech S.A.", contact: "Roberto Almeida", email: "roberto@empresa.com", phone: "(11) 98765-4321", plan: "Enterprise", mrr: 12000, since: new Date("2023-01-15"), nps: 9, status: "active" },
  { id: "2", name: "Digital Corp Ltda", contact: "Fernanda Souza", email: "fernanda@tech.com", phone: "(21) 97654-3210", plan: "Pro", mrr: 5800, since: new Date("2023-03-20"), nps: 8, status: "active" },
  { id: "3", name: "Startup Innovation", contact: "Marcelo Costa", email: "marcelo@startup.com", phone: "(11) 96543-2109", plan: "Básico", mrr: 2400, since: new Date("2023-06-01"), nps: 7, status: "at_risk" },
  { id: "4", name: "Global Solutions", contact: "Patricia Lima", email: "patricia@corp.com", phone: "(31) 95432-1098", plan: "Enterprise", mrr: 28000, since: new Date("2022-11-10"), nps: 10, status: "active" },
  { id: "5", name: "Agency Digital", contact: "Lucas Ferreira", email: "lucas@digital.com", phone: "(11) 94321-0987", plan: "Pro", mrr: 5800, since: new Date("2023-08-15"), nps: 6, status: "churned" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Ativo", color: "text-emerald-400", bg: "rgba(16,185,129,0.12)" },
  at_risk: { label: "Em risco", color: "text-yellow-400", bg: "rgba(234,179,8,0.12)" },
  churned: { label: "Cancelado", color: "text-red-400", bg: "rgba(239,68,68,0.12)" },
};

const cardStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" };

export default function ClientesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clientes</h1>
          <p className="text-white/30 mt-0.5">Gestão da base de clientes ativos</p>
        </div>
        <button className="flex items-center gap-2 gradient-brand text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition glow-primary">
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Clientes", value: "48", sub: "+3 este mês", color: "text-blue-400" },
          { label: "MRR Total", value: formatCurrency(284500), sub: "+18% vs último mês", color: "text-emerald-400" },
          { label: "Churn Rate", value: "2.1%", sub: "-0.3% vs último mês", color: "text-violet-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl p-4" style={cardStyle}>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/40 mt-0.5">{stat.label}</p>
            <p className={`text-xs mt-1 ${stat.color}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="relative max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              placeholder="Buscar clientes..."
              className="w-full rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                {["Empresa", "Plano", "MRR", "Desde", "NPS", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-white/30 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => {
                const s = statusConfig[c.status];
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group hover:bg-white/[0.02] transition"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-violet-300 text-xs font-bold"
                          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
                        >
                          {getInitials(c.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{c.name}</p>
                          <p className="text-xs text-white/30">{c.contact}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-sm text-white/60">{c.plan}</span></td>
                    <td className="px-4 py-3"><span className="text-sm font-semibold text-emerald-400">{formatCurrency(c.mrr)}</span></td>
                    <td className="px-4 py-3"><span className="text-sm text-white/30">{formatDate(c.since)}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-white">{c.nps}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`} style={{ background: s.bg }}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition"><Phone className="w-3.5 h-3.5 text-white/40" /></button>
                        <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition"><MessageCircle className="w-3.5 h-3.5 text-emerald-400" /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
