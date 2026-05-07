"use client";

import { formatDate, formatCurrency, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const leads = [
  { id: "1", name: "Roberto Almeida", email: "roberto@empresa.com", phone: "(11) 99999-0001", value: 12000, status: "Qualificação", source: "Meta Ads", date: new Date() },
  { id: "2", name: "Fernanda Souza", email: "fernanda@empresa.com", phone: "(11) 99999-0002", value: 28000, status: "Proposta Enviada", source: "WhatsApp", date: new Date() },
  { id: "3", name: "Marcelo Costa", email: "marcelo@empresa.com", phone: "(11) 99999-0003", value: 8500, status: "Lead Novo", source: "Landing Page", date: new Date() },
  { id: "4", name: "Patricia Lima", email: "patricia@empresa.com", phone: "(11) 99999-0004", value: 45000, status: "Negociação", source: "Indicação", date: new Date() },
  { id: "5", name: "Lucas Ferreira", email: "lucas@empresa.com", phone: "(11) 99999-0005", value: 19500, status: "Contato Iniciado", source: "Google Ads", date: new Date() },
];

const statusColors: Record<string, string> = {
  "Lead Novo": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Contato Iniciado": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Qualificação": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Proposta Enviada": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Negociação": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "Fechado": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export function RecentLeads() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Leads Recentes</h3>
          <p className="text-sm text-muted-foreground">Últimas entradas no sistema</p>
        </div>
        <Link
          href="/leads"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground pb-3">Lead</th>
              <th className="text-left text-xs font-medium text-muted-foreground pb-3 hidden md:table-cell">Origem</th>
              <th className="text-left text-xs font-medium text-muted-foreground pb-3">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground pb-3">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-accent/50 transition group">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {getInitials(lead.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{lead.source}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", statusColors[lead.status] || "bg-gray-100 text-gray-700")}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-sm font-semibold">{formatCurrency(lead.value)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
