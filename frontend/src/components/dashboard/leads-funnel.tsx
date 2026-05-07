"use client";

import { PIPELINE_STAGES } from "@/lib/utils";

const funnelData = [
  { stage: "Lead Novo", count: 142, pct: 100 },
  { stage: "Contato", count: 98, pct: 69 },
  { stage: "Qualificação", count: 71, pct: 50 },
  { stage: "Proposta", count: 45, pct: 32 },
  { stage: "Negociação", count: 28, pct: 20 },
  { stage: "Fechado", count: 18, pct: 13 },
];

export function LeadsFunnel() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h3 className="font-semibold mb-1">Funil de Vendas</h3>
      <p className="text-sm text-muted-foreground mb-5">Taxa de conversão por etapa</p>
      <div className="space-y-3">
        {funnelData.map((item, i) => (
          <div key={item.stage}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{item.stage}</span>
              <span className="font-medium">{item.count}</span>
            </div>
            <div className="h-2 bg-accent rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${item.pct}%`,
                  background: PIPELINE_STAGES[i]?.color || "#6271f1",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
