"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Phone, Mail, MessageCircle, Star, ChevronUp, ChevronDown } from "lucide-react";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockLeads = [
  { id: "1", name: "Roberto Almeida", email: "roberto@empresa.com", phone: "(11) 98765-4321", city: "São Paulo", source: "Meta Ads", interest: "Plano Enterprise", value: 12000, score: 92, status: "qualified", owner: "Carlos Silva", lastContact: new Date("2024-11-20"), nextAction: "Ligar amanhã", tags: ["quente", "enterprise"] },
  { id: "2", name: "Fernanda Souza", email: "fernanda@tech.com", phone: "(21) 97654-3210", city: "Rio de Janeiro", source: "WhatsApp", interest: "Plano Pro", value: 28000, score: 85, status: "proposal", owner: "Ana Lima", lastContact: new Date("2024-11-19"), nextAction: "Aguardar retorno", tags: ["proposta"] },
  { id: "3", name: "Marcelo Costa", email: "marcelo@startup.com", phone: "(11) 96543-2109", city: "São Paulo", source: "Landing Page", interest: "Plano Básico", value: 8500, score: 61, status: "new", owner: "Pedro Santos", lastContact: new Date("2024-11-18"), nextAction: "Fazer contato", tags: ["novo"] },
  { id: "4", name: "Patricia Lima", email: "patricia@corp.com", phone: "(31) 95432-1098", city: "Belo Horizonte", source: "Indicação", interest: "Plano Enterprise", value: 45000, score: 97, status: "negotiation", owner: "Carlos Silva", lastContact: new Date("2024-11-21"), nextAction: "Reunião 15h", tags: ["quente", "priority"] },
  { id: "5", name: "Lucas Ferreira", email: "lucas@digital.com", phone: "(11) 94321-0987", city: "São Paulo", source: "Google Ads", interest: "Plano Pro", value: 19500, score: 74, status: "contacted", owner: "Juliana Costa", lastContact: new Date("2024-11-17"), nextAction: "Follow-up email", tags: [] },
  { id: "6", name: "Amanda Rocha", email: "amanda@fashion.com", phone: "(11) 93210-9876", city: "Campinas", source: "Meta Ads", interest: "Plano Enterprise", value: 32000, score: 88, status: "qualified", owner: "Ana Lima", lastContact: new Date("2024-11-16"), nextAction: "Enviar proposta", tags: ["quente"] },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: "Novo", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  contacted: { label: "Contatado", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  qualified: { label: "Qualificado", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  proposal: { label: "Proposta", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  negotiation: { label: "Negociação", className: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" },
  won: { label: "Fechado", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  lost: { label: "Perdido", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-red-500";
  return (
    <div className="flex items-center gap-1">
      <Star className={cn("w-3.5 h-3.5 fill-current", color)} />
      <span className={cn("text-sm font-semibold", color)}>{score}</span>
    </div>
  );
}

interface LeadsTableProps { search: string }

export function LeadsTable({ search }: LeadsTableProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = mockLeads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  );

  const toggleSelect = (id: string) =>
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const toggleSort = (col: string) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: string }) =>
    sortBy === col ? (
      sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
    ) : null;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {selected.length > 0 && (
        <div className="bg-primary/5 border-b border-border px-5 py-2.5 flex items-center gap-3">
          <span className="text-sm font-medium">{selected.length} selecionados</span>
          <button className="text-sm text-destructive hover:underline">Excluir</button>
          <button className="text-sm text-primary hover:underline">Alterar status</button>
          <button className="text-sm text-primary hover:underline">Atribuir vendedor</button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-accent/30 border-b border-border">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length}
                  onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map((l) => l.id))}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: "name", label: "Lead" },
                { key: "source", label: "Origem" },
                { key: "status", label: "Status" },
                { key: "score", label: "Score" },
                { key: "value", label: "Valor" },
                { key: "owner", label: "Responsável" },
                { key: "lastContact", label: "Último Contato" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="text-left text-xs font-medium text-muted-foreground px-3 py-3 cursor-pointer hover:text-foreground transition select-none"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
              <th className="w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((lead, i) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-accent/30 transition group"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(lead.id)}
                    onChange={() => toggleSelect(lead.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {getInitials(lead.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-muted-foreground">{lead.source}</span>
                </td>
                <td className="px-3 py-3">
                  <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", statusConfig[lead.status]?.className)}>
                    {statusConfig[lead.status]?.label}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <ScoreBadge score={lead.score} />
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm font-medium">{formatCurrency(lead.value)}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-muted-foreground">{lead.owner}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-muted-foreground">{formatDate(lead.lastContact)}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition" title="Ligar">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition" title="Email">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition" title="WhatsApp">
                      <MessageCircle className="w-3.5 h-3.5 text-green-500" />
                    </button>
                    <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition">
                      <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border px-5 py-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>Mostrando {filtered.length} de {mockLeads.length} leads</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-accent transition text-xs">Anterior</button>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs">1</button>
          <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-accent transition text-xs">2</button>
          <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-accent transition text-xs">Próximo</button>
        </div>
      </div>
    </div>
  );
}
