"use client";

import { motion } from "framer-motion";

const sources = ["Meta Ads", "Google Ads", "WhatsApp", "Landing Page", "Indicação", "Orgânico"];
const statuses = ["Novo", "Contatado", "Qualificado", "Proposta", "Negociação", "Fechado", "Perdido"];

const selectCls = "w-full rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition cursor-pointer";
const selectStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" };
const optStyle = { background: "#0c0c1a" };

export function LeadFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 pt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div>
        <label className="block text-xs font-medium text-white/30 mb-1.5">Status</label>
        <select className={selectCls} style={selectStyle}>
          <option value="" style={optStyle}>Todos</option>
          {statuses.map((s) => <option key={s} style={optStyle}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-white/30 mb-1.5">Origem</label>
        <select className={selectCls} style={selectStyle}>
          <option value="" style={optStyle}>Todas</option>
          {sources.map((s) => <option key={s} style={optStyle}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-white/30 mb-1.5">Score mínimo</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="0"
          className="w-full rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-white/30 mb-1.5">Responsável</label>
        <select className={selectCls} style={selectStyle}>
          <option value="" style={optStyle}>Todos</option>
          {["Carlos Silva","Ana Lima","Pedro Santos"].map((n) => (
            <option key={n} style={optStyle}>{n}</option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}
