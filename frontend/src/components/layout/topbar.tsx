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
    <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4 flex-shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar leads, clientes, negócios..."
          className="w-full bg-accent/50 border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-background border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* New Lead */}
        <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition shadow-sm shadow-primary/20">
          <Plus className="w-4 h-4" />
          Novo Lead
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl hover:bg-accent transition flex items-center justify-center">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-accent transition"
          >
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white text-xs font-bold">
              {user ? getInitials(user.name) : "AD"}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium leading-none">{user?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role || "admin"}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-xl shadow-lg py-1 z-50"
              >
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition">
                  Perfil
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition">
                  Configurações
                </button>
                <div className="border-t border-border mt-1" />
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
                >
                  Sair
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
