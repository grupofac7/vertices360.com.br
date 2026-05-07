"use client";

import { useDroppable } from "@dnd-kit/core";
import { PipelineCard } from "./pipeline-card";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage { id: string; label: string; color: string }
interface Lead { id: string; name: string; value: number; source: string; score: number; phone: string; stageId: string }

interface Props {
  stage: Stage;
  leads: Lead[];
  total: number;
  count: number;
}

export function PipelineColumn({ stage, leads, total, count }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });

  return (
    <div className="flex-shrink-0 w-72 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: stage.color }} />
        <span className="font-medium text-sm flex-1 truncate">{stage.label}</span>
        <span className="text-xs bg-accent text-muted-foreground px-2 py-0.5 rounded-full font-medium">{count}</span>
      </div>
      <p className="text-xs text-muted-foreground px-1 mb-3">{formatCurrency(total)}</p>

      {/* Cards */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-2 rounded-2xl p-2 transition-colors min-h-32",
          isOver ? "bg-primary/5 border-2 border-dashed border-primary/30" : "bg-accent/30"
        )}
      >
        {leads.map((lead) => (
          <PipelineCard key={lead.id} lead={lead} />
        ))}
        <button
          className="w-full text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 py-2 rounded-xl hover:bg-accent transition"
        >
          <Plus className="w-3 h-3" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
