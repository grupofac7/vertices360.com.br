"use client";

import { motion } from "framer-motion";
import { Plus, Mail, Phone, Star, TrendingUp } from "lucide-react";
import { getInitials, formatCurrency } from "@/lib/utils";

const team = [
  { id: "1", name: "Carlos Silva", email: "carlos@flowcrm.com", phone: "(11) 98765-0001", role: "Vendedor", status: "online", deals: 24, revenue: 87400, score: 98, target: 100000 },
  { id: "2", name: "Ana Lima", email: "ana@flowcrm.com", phone: "(11) 98765-0002", role: "Vendedor", status: "online", deals: 19, revenue: 72100, score: 88, target: 80000 },
  { id: "3", name: "Pedro Santos", email: "pedro@flowcrm.com", phone: "(11) 98765-0003", role: "Vendedor", status: "away", deals: 16, revenue: 58900, score: 79, target: 80000 },
  { id: "4", name: "Juliana Costa", email: "juliana@flowcrm.com", phone: "(11) 98765-0004", role: "Supervisor", status: "online", deals: 14, revenue: 49300, score: 72, target: 60000 },
  { id: "5", name: "Marcos Oliveira", email: "marcos@flowcrm.com", phone: "(11) 98765-0005", role: "Vendedor", status: "offline", deals: 9, revenue: 31200, score: 55, target: 60000 },
  { id: "6", name: "Gabriela Nunes", email: "gabi@flowcrm.com", phone: "(11) 98765-0006", role: "Atendimento", status: "online", deals: 0, revenue: 0, score: 85, target: 0 },
];

const statusDot: Record<string, string> = { online: "bg-emerald-500", away: "bg-yellow-400", offline: "bg-white/20" };

const cardStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" };

export default function EquipePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Equipe</h1>
          <p className="text-white/30 mt-0.5">Gestão da equipe comercial</p>
        </div>
        <button className="flex items-center gap-2 gradient-brand text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition glow-primary">
          <Plus className="w-4 h-4" />
          Adicionar Membro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl p-5 hover:bg-white/[0.04] transition-all"
            style={cardStyle}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-violet-300 font-bold"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
                >
                  {getInitials(member.name)}
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${statusDot[member.status]}`} style={{ borderColor: "#08080f" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{member.name}</p>
                <p className="text-sm text-white/30">{member.role}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-white">{member.score}</span>
              </div>
            </div>

            {member.target > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/30 mb-1.5">
                  <span>Meta mensal</span>
                  <span>{Math.round((member.revenue / member.target) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full gradient-brand rounded-full transition-all"
                    style={{ width: `${Math.min(100, (member.revenue / member.target) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1.5">
                  <span className="font-semibold text-white">{formatCurrency(member.revenue)}</span>
                  <span className="text-white/20">{formatCurrency(member.target)}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                <p className="text-lg font-bold text-white">{member.deals}</p>
                <p className="text-xs text-white/30">Negócios</p>
              </div>
              <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                <p className="text-lg font-bold text-emerald-400">{formatCurrency(member.revenue).replace("R$ ", "")}</p>
                <p className="text-xs text-white/30">Receita</p>
              </div>
            </div>

            <div className="flex gap-2">
              {[
                { icon: Mail, label: "Email" },
                { icon: Phone, label: "Ligar" },
                { icon: TrendingUp, label: "Relatório" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
