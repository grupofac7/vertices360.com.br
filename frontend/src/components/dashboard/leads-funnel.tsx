"use client";

const funnelData = [
  { stage: "Lead Novo", count: 142, pct: 100, color: "#6271f1" },
  { stage: "Contato", count: 98, pct: 69, color: "#7c3aed" },
  { stage: "Qualificação", count: 71, pct: 50, color: "#8b5cf6" },
  { stage: "Proposta", count: 45, pct: 32, color: "#3b82f6" },
  { stage: "Negociação", count: 28, pct: 20, color: "#06b6d4" },
  { stage: "Fechado", count: 18, pct: 13, color: "#10b981" },
];

export function LeadsFunnel() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <h3 className="font-semibold text-white">Funil de Vendas</h3>
      <p className="text-sm text-white/30 mb-5 mt-0.5">Taxa de conversão por etapa</p>
      <div className="space-y-3.5">
        {funnelData.map((item) => (
          <div key={item.stage}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-white/50">{item.stage}</span>
              <span className="font-medium text-white">{item.count}</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${item.pct}%`,
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}60`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
