"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, GitBranch, MessageCircle,
  DollarSign, BarChart3, Settings, Zap,
  Building2, UserCheck, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Leads", href: "/leads" },
  { icon: GitBranch, label: "Pipeline", href: "/pipeline" },
  { icon: MessageCircle, label: "WhatsApp", href: "/whatsapp", badge: 3 },
  { icon: UserCheck, label: "Clientes", href: "/clientes" },
  { icon: DollarSign, label: "Financeiro", href: "/financeiro" },
  { icon: BarChart3, label: "Relatórios", href: "/relatorios" },
  { icon: Building2, label: "Equipe", href: "/equipe" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="flex flex-col h-full overflow-hidden flex-shrink-0 relative"
      style={{
        background: "rgba(10,10,20,0.95)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 glow-primary">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg text-white truncate"
            >
              FlowCRM
            </motion.span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white/30 hover:text-white/60 transition"
        >
          <motion.div animate={{ rotate: collapsed ? 0 : 180 }}>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                active
                  ? "gradient-brand text-white shadow-lg"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              )}
              style={active ? { boxShadow: "0 4px 20px rgba(124,58,237,0.3)" } : {}}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate flex-1">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {collapsed && (
                <div
                  className="absolute left-full ml-3 px-2.5 py-1.5 text-sm text-white rounded-lg shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition"
                  style={{ background: "rgba(20,20,35,0.95)" }}
                >
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Link
          href="/configuracoes"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
            pathname === "/configuracoes"
              ? "gradient-brand text-white"
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          )}
        >
          <Settings className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Configurações</span>}
          {collapsed && (
            <div
              className="absolute left-full ml-3 px-2.5 py-1.5 text-sm text-white rounded-lg shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition"
              style={{ background: "rgba(20,20,35,0.95)" }}
            >
              Configurações
            </div>
          )}
        </Link>
      </div>
    </motion.div>
  );
}
