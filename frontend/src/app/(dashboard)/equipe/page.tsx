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

const statusDot: Record<string, string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-gray-400",
};

export default function EquipePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Equipe</h1>
          <p className="text-muted-foreground">Gestão da equipe comercial</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm shadow-primary/20">
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
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {getInitials(member.name)}
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${statusDot[member.status]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{member.score}</span>
              </div>
            </div>

            {member.target > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Meta mensal</span>
                  <span>{Math.round((member.revenue / member.target) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-accent rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${Math.min(100, (member.revenue / member.target) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="font-medium">{formatCurrency(member.revenue)}</span>
                  <span className="text-muted-foreground">{formatCurrency(member.target)}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-accent/50 rounded-xl p-2.5 text-center">
                <p className="text-lg font-bold">{member.deals}</p>
                <p className="text-xs text-muted-foreground">Negócios</p>
              </div>
              <div className="bg-accent/50 rounded-xl p-2.5 text-center">
                <p className="text-lg font-bold text-green-500">{formatCurrency(member.revenue).replace("R$ ", "")}</p>
                <p className="text-xs text-muted-foreground">Receita</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-xs hover:bg-accent transition">
                <Mail className="w-3.5 h-3.5" />
                Email
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-xs hover:bg-accent transition">
                <Phone className="w-3.5 h-3.5" />
                Ligar
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-xs hover:bg-accent transition">
                <TrendingUp className="w-3.5 h-3.5" />
                Relatório
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
