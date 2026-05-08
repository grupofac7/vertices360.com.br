"use client";

import { PipelineBoard } from "@/components/pipeline/pipeline-board";

export default function PipelinePage() {
  return (
    <div className="space-y-5 h-full flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Pipeline de Vendas</h1>
          <p className="text-white/30 mt-0.5">Arraste os cards para mover entre etapas</p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <PipelineBoard />
      </div>
    </div>
  );
}
