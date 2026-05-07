"use client";

import { Tag, User, ExternalLink, Clock } from "lucide-react";
import { getInitials, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/app/(dashboard)/whatsapp/page";

interface Props { conversation: Conversation }

const tagColors = ["bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-yellow-100 text-yellow-700", "bg-purple-100 text-purple-700", "bg-red-100 text-red-700"];

export function ChatInfo({ conversation }: Props) {
  return (
    <div className="w-72 flex-shrink-0 border-l border-border flex flex-col overflow-y-auto">
      {/* Profile */}
      <div className="p-5 border-b border-border text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mx-auto mb-3">
          {getInitials(conversation.name)}
        </div>
        <h3 className="font-semibold">{conversation.name}</h3>
        <p className="text-sm text-muted-foreground">{conversation.phone}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium",
            conversation.status === "open" ? "bg-green-100 text-green-700" :
            conversation.status === "pending" ? "bg-yellow-100 text-yellow-700" :
            "bg-gray-100 text-gray-600"
          )}>
            {conversation.status === "open" ? "Aberto" : conversation.status === "pending" ? "Pendente" : "Fechado"}
          </span>
        </div>
      </div>

      {/* Lead Info */}
      <div className="p-4 border-b border-border space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dados do Lead</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Valor potencial</span>
            <span className="font-medium text-green-500">{formatCurrency(12000)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Etapa</span>
            <span className="font-medium">Qualificação</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Origem</span>
            <span className="font-medium">Meta Ads</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Score</span>
            <span className="font-medium text-green-500">92</span>
          </div>
        </div>
        <a href="/leads/1" className="flex items-center gap-1 text-xs text-primary hover:underline">
          Ver lead completo <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Assignee */}
      <div className="p-4 border-b border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Responsável</h4>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
            {conversation.assignee ? getInitials(conversation.assignee) : "?"}
          </div>
          <span className="text-sm">{conversation.assignee || "Não atribuído"}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="p-4 border-b border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Etiquetas</h4>
        <div className="flex flex-wrap gap-1.5">
          {conversation.tags.map((tag, i) => (
            <span key={tag} className={cn("text-xs px-2.5 py-1 rounded-full font-medium", tagColors[i % tagColors.length])}>
              {tag}
            </span>
          ))}
          <button className="text-xs px-2.5 py-1 rounded-full border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition">
            + Adicionar
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Histórico</h4>
        <div className="space-y-3">
          {[
            { text: "Lead criado via Meta Ads", time: "2 dias atrás" },
            { text: "Primeira mensagem enviada", time: "2 dias atrás" },
            { text: "Lead qualificado", time: "Ontem" },
            { text: "Proposta visualizada", time: "1 hora atrás" },
          ].map((item, i) => (
            <div key={i} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                {i < 3 && <div className="w-px flex-1 bg-border mt-1" />}
              </div>
              <div className="pb-3">
                <p className="text-xs">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
