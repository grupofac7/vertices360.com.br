"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PipelineColumn } from "./pipeline-column";
import { PipelineCard } from "./pipeline-card";
import { PIPELINE_STAGES, formatCurrency } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  value: number;
  source: string;
  score: number;
  phone: string;
  stageId: string;
}

const initialLeads: Lead[] = [
  { id: "1", name: "Roberto Almeida", value: 12000, source: "Meta Ads", score: 92, phone: "(11) 98765-4321", stageId: "qualified" },
  { id: "2", name: "Fernanda Souza", value: 28000, source: "WhatsApp", score: 85, phone: "(21) 97654-3210", stageId: "proposal" },
  { id: "3", name: "Marcelo Costa", value: 8500, source: "Landing Page", score: 61, phone: "(11) 96543-2109", stageId: "new" },
  { id: "4", name: "Patricia Lima", value: 45000, source: "Indicação", score: 97, phone: "(31) 95432-1098", stageId: "negotiation" },
  { id: "5", name: "Lucas Ferreira", value: 19500, source: "Google Ads", score: 74, phone: "(11) 94321-0987", stageId: "contacted" },
  { id: "6", name: "Amanda Rocha", value: 32000, source: "Meta Ads", score: 88, phone: "(11) 93210-9876", stageId: "qualified" },
  { id: "7", name: "Bruno Martins", value: 15000, source: "WhatsApp", score: 70, phone: "(11) 92109-8765", stageId: "new" },
  { id: "8", name: "Carla Oliveira", value: 55000, source: "Indicação", score: 95, phone: "(11) 91098-7654", stageId: "closed_won" },
];

export function PipelineBoard() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeLead = leads.find((l) => l.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const overId = over.id as string;
    const isColumn = PIPELINE_STAGES.some((s) => s.id === overId);

    if (isColumn) {
      setLeads((prev) =>
        prev.map((l) => (l.id === active.id ? { ...l, stageId: overId } : l))
      );
    } else {
      const overLead = leads.find((l) => l.id === overId);
      if (overLead && overLead.stageId !== leads.find((l) => l.id === active.id)?.stageId) {
        setLeads((prev) =>
          prev.map((l) => (l.id === active.id ? { ...l, stageId: overLead.stageId } : l))
        );
      }
    }
  };

  const stages = PIPELINE_STAGES.filter((s) => !["closed_lost", "post_sale"].includes(s.id));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stageId === stage.id);
          const total = stageLeads.reduce((s, l) => s + l.value, 0);
          return (
            <SortableContext
              key={stage.id}
              id={stage.id}
              items={stageLeads.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <PipelineColumn
                stage={stage}
                leads={stageLeads}
                total={total}
                count={stageLeads.length}
              />
            </SortableContext>
          );
        })}
      </div>
      <DragOverlay>
        {activeLead && <PipelineCard lead={activeLead} isDragging />}
      </DragOverlay>
    </DndContext>
  );
}
