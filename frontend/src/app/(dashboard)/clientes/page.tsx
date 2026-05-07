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

const statusBadge: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  at_risk: "bg-yellow-100 text-yellow-700",
  churned: "bg-red-100 text-red-700",
};
const statusLabel: Record<string, string> = { active: "Ativo", at_risk: "Em risco", churned: "Cancelado" };

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gestão da base de clientes ativos</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Clientes", value: "48", sub: "+3 este mês" },
          { label: "MRR Total", value: formatCurrency(284500), sub: "+18% vs último mês" },
          { label: "Churn Rate", value: "2.1%", sub: "-0.3% vs último mês" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-primary mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Buscar clientes..." className="w-full bg-accent/50 border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/30 border-b border-border">
              <tr>
                {["Empresa", "Plano", "MRR", "Desde", "NPS", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-accent/30 transition group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{getInitials(c.name)}</div>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.contact}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-sm">{c.plan}</span></td>
                  <td className="px-4 py-3"><span className="text-sm font-medium text-green-500">{formatCurrency(c.mrr)}</span></td>
                  <td className="px-4 py-3"><span className="text-sm text-muted-foreground">{formatDate(c.since)}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{c.nps}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge[c.status]}`}>{statusLabel[c.status]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition"><Phone className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition"><MessageCircle className="w-3.5 h-3.5 text-green-500" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
