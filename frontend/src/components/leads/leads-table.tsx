"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Phone, Mail, MessageCircle, Star, ChevronUp, ChevronDown } from "lucide-react";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockLeads = [
  { id: "1", name: "Roberto Almeida", email: "roberto@empresa.com", phone: "(11) 98765-4321", source: "Meta Ads", value: 12000, score: 92, status: "qualified", owner: "Carlos Silva", lastContact: new Date("2024-11-20") },
  { id: "2", name: "Fernanda Souza", email: "fernanda@tech.com", phone: "(21) 97654-3210", source: "WhatsApp", value: 28000, score: 85, status: "proposal", owner: "Ana Lima", lastContact: new Date("2024-11-19") },
  { id: "3", name: "Marcelo Costa", email: "marcelo@startup.com", phone: "(11) 96543-2109", source: "Landing Page", value: 8500, score: 61, status: "new", owner: "Pedro Santos", lastContact: new Date("2024-11-18") },
  { id: "4", name: "Patricia Lima", email: "patricia@corp.com", phone: "(31) 95432-1098", source: "Indicação", value: 45000, score: 97, status: "negotiation", owner: "Carlos Silva", lastContact: new Date("2024-11-21") },
  { id: "5", name: "Lucas Ferreira", email: "lucas@digital.com", phone: "(11) 94321-0987", source: "Google Ads", value: 19500, score: 74, status: "contacted", owner: "Juliana Costa", lastContact: new Date("2024-11-17") },
  { id: "6", name: "Amanda Rocha", email: "amanda@fashion.com", phone: "(11) 93210-9876", source: "Meta Ads", value: 32000, score: 88, status: "qualified", owner: "Ana Lima", lastContact: new Date("2024-11-16") },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "Novo", color: "text-blue-400", bg: "rgba(59,130,246,0.12)" },
  contacted: { label: "Contatado", color: "text-yellow-400", bg: "rgba(234,179,8,0.12)" },
  qualified: { label: "Qualificado", color: "text-violet-400", bg: "rgba(124,58,237,0.12)" },
  proposal: { label: "Proposta", color: "text-indigo-400", bg: "rgba(99,102,241,0.12)" },
  negotiation: { label: "Negociação", color: "text-pink-400", bg: "rgba(236,72,153,0.12)" },
  won: { label: "Fechado", color: "text-emerald-400", bg: "rgba(16,185,129,0.12)" },
  lost: { label: "Perdido", color: "text-red-400", bg: "rgba(239,68,68,0.12)" },
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-yellow-400" : "text-red-400";
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
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {selected.length > 0 && (
        <div
          className="px-5 py-2.5 flex items-center gap-4"
          style={{ background: "rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}
        >
          <span className="text-sm font-medium text-violet-300">{selected.length} selecionados</span>
          <button className="text-sm text-red-400 hover:text-red-300 transition">Excluir</button>
          <button className="text-sm text-violet-400 hover:text-violet-300 transition">Alterar status</button>
          <button className="text-sm text-violet-400 hover:text-violet-300 transition">Atribuir vendedor</button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map((l) => l.id))}
                  className="rounded accent-violet-500"
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
                  className="text-left text-xs font-medium text-white/30 px-3 py-3 cursor-pointer hover:text-white/60 transition select-none"
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
          <tbody>
            {filtered.map((lead, i) => {
              const s = statusConfig[lead.status];
              return (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="group transition hover:bg-white/[0.02]"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                      className="rounded accent-violet-500"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-violet-300 text-xs font-bold flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
                      >
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{lead.name}</p>
                        <p className="text-xs text-white/30">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-white/40">{lead.source}</span>
                  </td>
                  <td className="px-3 py-3">
                    {s && (
                      <span
                        className={cn("text-xs px-2.5 py-1 rounded-full font-medium", s.color)}
                        style={{ background: s.bg }}
                      >
                        {s.label}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <ScoreBadge score={lead.score} />
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-semibold text-white">{formatCurrency(lead.value)}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-white/40">{lead.owner}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-white/30">{formatDate(lead.lastContact)}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition">
                        <Phone className="w-3.5 h-3.5 text-white/40" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition">
                        <Mail className="w-3.5 h-3.5 text-white/40" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition">
                        <MoreHorizontal className="w-3.5 h-3.5 text-white/40" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className="px-5 py-3.5 flex items-center justify-between text-sm"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-white/30">Mostrando {filtered.length} de {mockLeads.length} leads</span>
        <div className="flex items-center gap-1.5">
          <button
            className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 transition hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Anterior
          </button>
          <button className="px-3 py-1.5 gradient-brand text-white rounded-lg text-xs font-medium">1</button>
          <button
            className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 transition hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            2
          </button>
          <button
            className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 transition hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
