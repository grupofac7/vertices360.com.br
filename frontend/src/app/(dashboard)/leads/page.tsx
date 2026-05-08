"use client";

import { useState } from "react";
import { Plus, Upload, Download, Search, Filter } from "lucide-react";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadModal } from "@/components/leads/lead-modal";
import { LeadFilters } from "@/components/leads/lead-filters";
import { cn } from "@/lib/utils";

export default function LeadsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-white/30 mt-0.5">Gerencie todos os seus leads</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Importar CSV</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 gradient-brand text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition glow-primary"
          >
            <Plus className="w-4 h-4" />
            Novo Lead
          </button>
        </div>
      </div>

      {/* Search & filters */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              placeholder="Buscar por nome, email, telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition",
              showFilters
                ? "gradient-brand text-white"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            )}
            style={!showFilters ? { border: "1px solid rgba(255,255,255,0.08)" } : {}}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
        {showFilters && <LeadFilters />}
      </div>

      <LeadsTable search={search} />

      {showModal && <LeadModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
