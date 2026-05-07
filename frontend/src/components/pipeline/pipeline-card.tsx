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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const scoreColor = lead.score >= 80 ? "text-green-500" : lead.score >= 60 ? "text-yellow-500" : "text-red-500";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-card border border-border rounded-xl p-3 cursor-grab active:cursor-grabbing",
        "hover:shadow-md hover:border-primary/30 transition-all",
        (isDragging || isSortDragging) && "opacity-50 shadow-xl rotate-2"
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
          {getInitials(lead.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{lead.name}</p>
          <p className="text-xs text-muted-foreground truncate">{lead.source}</p>
        </div>
        <div className={cn("flex items-center gap-0.5 text-xs font-semibold", scoreColor)}>
          <Star className="w-3 h-3 fill-current" />
          {lead.score}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-bold">{formatCurrency(lead.value)}</span>
        <div className="flex items-center gap-1">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-lg hover:bg-accent flex items-center justify-center transition"
          >
            <Phone className="w-3 h-3 text-muted-foreground" />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-lg hover:bg-accent flex items-center justify-center transition"
          >
            <MessageCircle className="w-3 h-3 text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
