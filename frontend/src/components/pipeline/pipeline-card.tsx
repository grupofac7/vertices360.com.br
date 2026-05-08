"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatCurrency, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { MessageCircle, Phone, Star } from "lucide-react";

interface Lead { id: string; name: string; value: number; source: string; score: number; phone: string; stageId: string }
interface Props { lead: Lead; isDragging?: boolean }

export function PipelineCard({ lead, isDragging }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortDragging } = useSortable({ id: lead.id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const scoreColor = lead.score >= 80 ? "text-emerald-400" : lead.score >= 60 ? "text-yellow-400" : "text-red-400";

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: (isDragging || isSortDragging) ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${(isDragging || isSortDragging) ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"}`,
      }}
      {...attributes}
      {...listeners}
      className={cn(
        "rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all group",
        "hover:border-violet-500/30 hover:bg-white/[0.06]",
        (isDragging || isSortDragging) && "opacity-70 shadow-2xl rotate-2 scale-105"
      )}
    >
      <div className="flex items-start gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-violet-300 text-xs font-bold flex-shrink-0 mt-0.5"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          {getInitials(lead.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{lead.name}</p>
          <p className="text-xs text-white/30 truncate">{lead.source}</p>
        </div>
        <div className={cn("flex items-center gap-0.5 text-xs font-semibold", scoreColor)}>
          <Star className="w-3 h-3 fill-current" />
          {lead.score}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-bold text-white">{formatCurrency(lead.value)}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition"
          >
            <Phone className="w-3 h-3 text-white/40" />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition"
          >
            <MessageCircle className="w-3 h-3 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
