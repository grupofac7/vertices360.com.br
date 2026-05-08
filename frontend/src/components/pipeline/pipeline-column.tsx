"use client";

import { useDroppable } from "@dnd-kit/core";
import { PipelineCard } from "./pipeline-card";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage { id: string; label: string; color: string }
interface Lead { id: string; name: string; value: number; source: string; score: number; phone: string; stageId: string }
interface Props { stage: Stage; leads: Lead[]; total: number; count: number }

export function PipelineColumn({ stage, leads, total, count }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });

  return (
    <div className="flex-shrink-0 w-68 flex flex-col" style={{ width: 272 }}>
      {/* Header */}
      <div className="mb-3 px-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: stage.color, boxShadow: `0 0 6px ${stage.color}80` }} />
          <span className="font-semibold text-sm text-white flex-1 truncate">{stage.label}</span>
          <span
            className="text-xs text-white/40 px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {count}
          </span>
        </div>
        <p className="text-xs text-white/30 pl-4">{formatCurrency(total)}</p>
      </div>

      {/* Cards drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-2 rounded-2xl p-2 transition-all min-h-32",
          isOver && "ring-1 ring-violet-500/40"
        )}
        style={{
          background: isOver ? "rgba(124,58,237,0.07)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${isOver ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)"}`,
        }}
      >
        {leads.map((lead) => (
          <PipelineCard key={lead.id} lead={lead} />
        ))}
        <button
          className="w-full text-xs text-white/20 hover:text-white/50 flex items-center justify-center gap-1 py-2 rounded-xl hover:bg-white/5 transition"
        >
          <Plus className="w-3 h-3" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
