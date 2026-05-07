"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Upload, Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadModal } from "@/components/leads/lead-modal";
import { LeadFilters } from "@/components/leads/lead-filters";
import { cn } from "@/lib/utils";

export default function LeadsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Gerencie todos os seus leads</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm hover:bg-accent transition">
            <Upload className="w-4 h-4" />
            Importar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm hover:bg-accent transition">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Novo Lead
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome, email, telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-accent/50 border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition",
              showFilters ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"
            )}
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
