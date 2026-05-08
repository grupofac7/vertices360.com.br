"use client";

import { formatCurrency, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const leads = [
  { id: "1", name: "Roberto Almeida", phone: "(11) 99999-0001", value: 12000, status: "Qualificação", source: "Meta Ads" },
  { id: "2", name: "Fernanda Souza", phone: "(11) 99999-0002", value: 28000, status: "Proposta Enviada", source: "WhatsApp" },
  { id: "3", name: "Marcelo Costa", phone: "(11) 99999-0003", value: 8500, status: "Lead Novo", source: "Landing Page" },
  { id: "4", name: "Patricia Lima", phone: "(11) 99999-0004", value: 45000, status: "Negociação", source: "Indicação" },
  { id: "5", name: "Lucas Ferreira", phone: "(11) 99999-0005", value: 19500, status: "Contato Iniciado", source: "Google Ads" },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  "Lead Novo": { color: "text-blue-400", bg: "rgba(59,130,246,0.12)" },
  "Contato Iniciado": { color: "text-yellow-400", bg: "rgba(234,179,8,0.12)" },
  "Qualificação": { color: "text-violet-400", bg: "rgba(124,58,237,0.12)" },
  "Proposta Enviada": { color: "text-indigo-400", bg: "rgba(99,102,241,0.12)" },
  "Negociação": { color: "text-pink-400", bg: "rgba(236,72,153,0.12)" },
  "Fechado": { color: "text-emerald-400", bg: "rgba(16,185,129,0.12)" },
};

export function RecentLeads() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-white">Leads Recentes</h3>
          <p className="text-sm text-white/30 mt-0.5">Últimas entradas no sistema</p>
        </div>
        <Link
          href="/leads"
          className="text-sm text-violet-400 hover:text-violet-300 transition flex items-center gap-1"
        >
          Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th className="text-left text-xs font-medium text-white/30 pb-3">Lead</th>
              <th className="text-left text-xs font-medium text-white/30 pb-3 hidden md:table-cell">Origem</th>
              <th className="text-left text-xs font-medium text-white/30 pb-3">Status</th>
              <th className="text-right text-xs font-medium text-white/30 pb-3">Valor</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const s = statusConfig[lead.status] || { color: "text-white/50", bg: "rgba(255,255,255,0.07)" };
              return (
                <tr
                  key={lead.id}
                  className="group transition"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-violet-300 text-xs font-bold flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
                      >
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{lead.name}</p>
                        <p className="text-xs text-white/30">{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell">
                    <span className="text-sm text-white/40">{lead.source}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn("text-xs px-2.5 py-1 rounded-full font-medium", s.color)}
                      style={{ background: s.bg }}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-semibold text-white">{formatCurrency(lead.value)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
