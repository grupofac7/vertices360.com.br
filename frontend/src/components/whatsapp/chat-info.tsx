"use client";

import { ExternalLink } from "lucide-react";
import { getInitials, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/app/(dashboard)/whatsapp/page";

interface Props { conversation: Conversation }

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: "Aberto", color: "text-emerald-400", bg: "rgba(16,185,129,0.12)" },
  pending: { label: "Pendente", color: "text-yellow-400", bg: "rgba(234,179,8,0.12)" },
  closed: { label: "Fechado", color: "text-white/30", bg: "rgba(255,255,255,0.07)" },
};

const divider = { borderBottom: "1px solid rgba(255,255,255,0.07)" };

export function ChatInfo({ conversation }: Props) {
  const s = statusConfig[conversation.status];

  return (
    <div
      className="w-72 flex-shrink-0 flex flex-col overflow-y-auto scrollbar-hide"
      style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Profile */}
      <div className="p-5 text-center" style={divider}>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-violet-300 text-xl font-bold mx-auto mb-3"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          {getInitials(conversation.name)}
        </div>
        <h3 className="font-semibold text-white">{conversation.name}</h3>
        <p className="text-sm text-white/30 mt-0.5">{conversation.phone}</p>
        <div className="flex items-center justify-center mt-2">
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", s.color)} style={{ background: s.bg }}>
            {s.label}
          </span>
        </div>
      </div>

      {/* Lead Info */}
      <div className="p-4" style={divider}>
        <h4 className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-3">Dados do Lead</h4>
        <div className="space-y-2.5">
          {[
            { label: "Valor potencial", value: formatCurrency(12000), valueClass: "text-emerald-400 font-semibold" },
            { label: "Etapa", value: "Qualificação", valueClass: "text-white" },
            { label: "Origem", value: "Meta Ads", valueClass: "text-white" },
            { label: "Score", value: "92", valueClass: "text-emerald-400 font-semibold" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center text-sm">
              <span className="text-white/30">{row.label}</span>
              <span className={row.valueClass}>{row.value}</span>
            </div>
          ))}
        </div>
        <a href="/leads/1" className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition mt-3">
          Ver lead completo <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Assignee */}
      <div className="p-4" style={divider}>
        <h4 className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-3">Responsável</h4>
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center text-violet-300 text-xs font-bold"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            {conversation.assignee ? getInitials(conversation.assignee) : "?"}
          </div>
          <span className="text-sm text-white/70">{conversation.assignee || "Não atribuído"}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="p-4" style={divider}>
        <h4 className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-3">Etiquetas</h4>
        <div className="flex flex-wrap gap-1.5">
          {conversation.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-violet-400 px-2.5 py-1 rounded-full font-medium"
              style={{ background: "rgba(124,58,237,0.12)" }}
            >
              {tag}
            </span>
          ))}
          <button
            className="text-xs px-2.5 py-1 rounded-full text-white/25 hover:text-white/50 transition"
            style={{ border: "1px dashed rgba(255,255,255,0.12)" }}
          >
            + Adicionar
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <h4 className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-3">Histórico</h4>
        <div className="space-y-3">
          {[
            { text: "Lead criado via Meta Ads", time: "2 dias atrás" },
            { text: "Primeira mensagem enviada", time: "2 dias atrás" },
            { text: "Lead qualificado", time: "Ontem" },
            { text: "Proposta visualizada", time: "1 hora atrás" },
          ].map((item, i, arr) => (
            <div key={i} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#7c3aed" }} />
                {i < arr.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(255,255,255,0.07)" }} />}
              </div>
              <div className="pb-3">
                <p className="text-xs text-white/60">{item.text}</p>
                <p className="text-xs text-white/25 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
