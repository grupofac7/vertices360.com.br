"use client";

import { motion } from "framer-motion";

const sources = ["Meta Ads", "Google Ads", "WhatsApp", "Landing Page", "Indicação", "Orgânico"];
const statuses = ["Novo", "Contatado", "Qualificado", "Proposta", "Negociação", "Fechado", "Perdido"];

export function LeadFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Status</label>
        <select className="w-full bg-accent/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="">Todos</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Origem</label>
        <select className="w-full bg-accent/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="">Todas</option>
          {sources.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Score mínimo</label>
        <input type="number" min="0" max="100" placeholder="0" className="w-full bg-accent/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Responsável</label>
        <select className="w-full bg-accent/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="">Todos</option>
          <option>Carlos Silva</option>
          <option>Ana Lima</option>
          <option>Pedro Santos</option>
        </select>
      </div>
    </motion.div>
  );
}
