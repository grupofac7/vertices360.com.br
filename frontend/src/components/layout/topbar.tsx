"use client";

import { Bell, Search, Plus, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Topbar() {
  const { user, logout } = useAuthStore();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className="h-16 flex items-center px-6 gap-4 flex-shrink-0"
      style={{
        background: "rgba(10,10,20,0.9)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="Buscar leads, clientes, negócios..."
          className="w-full rounded-xl pl-10 pr-14 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/20 rounded px-1.5 py-0.5" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* New Lead */}
        <button className="flex items-center gap-2 gradient-brand text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-all glow-primary">
          <Plus className="w-4 h-4" />
          Novo Lead
        </button>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition text-white/40 hover:text-white/70 hover:bg-white/5"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/5 transition"
          >
            <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center text-white text-xs font-bold">
              {user ? getInitials(user.name) : "AD"}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium leading-none text-white">{user?.name || "Admin"}</p>
              <p className="text-xs text-white/30 capitalize mt-0.5">{user?.role || "admin"}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/30" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-2xl py-1.5 z-50 overflow-hidden"
                style={{
                  background: "rgba(15,15,25,0.98)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">{user?.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
                  Meu Perfil
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
                  Configurações
                </button>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "4px 0" }} />
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
                >
                  Sair da conta
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
