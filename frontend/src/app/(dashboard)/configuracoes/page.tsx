"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bell, Lock, Building2, Users, Webhook, CreditCard, Palette } from "lucide-react";

const tabs = [
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "equipe", label: "Equipe", icon: Users },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "integracoes", label: "Integrações", icon: Webhook },
  { id: "seguranca", label: "Segurança", icon: Lock },
  { id: "plano", label: "Plano", icon: CreditCard },
  { id: "aparencia", label: "Aparência", icon: Palette },
];

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("empresa");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-white/30 mt-0.5">Gerencie as configurações da plataforma</p>
      </div>

      <div className="flex gap-5">
        {/* Sidebar tabs */}
        <div className="w-52 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                  activeTab === tab.id
                    ? "gradient-brand text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div
          className="flex-1 rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {activeTab === "empresa" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-lg text-white">Dados da Empresa</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Nome da Empresa</label>
                  <input
                    defaultValue="FlowCRM Demo"
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-1.5">CNPJ</label>
                  <input
                    defaultValue="00.000.000/0001-00"
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Telefone</label>
                  <input
                    defaultValue="(11) 3000-0000"
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                    style={inputStyle}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Website</label>
                  <input
                    defaultValue="https://flowcrm.com"
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                    style={inputStyle}
                  />
                </div>
              </div>
              <button className="gradient-brand text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition glow-primary">
                Salvar Alterações
              </button>
            </div>
          )}

          {activeTab === "integracoes" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-lg text-white">Integrações</h2>
              <div className="space-y-3">
                {[
                  { name: "WhatsApp (Evolution API)", desc: "Conecte sua instância WhatsApp", connected: true, color: "#10b981" },
                  { name: "Meta Ads", desc: "Capture leads automaticamente", connected: true, color: "#3b82f6" },
                  { name: "Google Ads", desc: "Importe leads do Google", connected: false, color: "#ef4444" },
                  { name: "RD Station", desc: "Sincronize com seu CRM de marketing", connected: false, color: "#f97316" },
                  { name: "Zapier", desc: "Automatize com 5000+ apps", connected: false, color: "#f59e0b" },
                ].map((int) => (
                  <div
                    key={int.name}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: int.color + "25", border: `1px solid ${int.color}40` }}
                    >
                      <span style={{ color: int.color }}>{int.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-white">{int.name}</p>
                      <p className="text-xs text-white/30">{int.desc}</p>
                    </div>
                    <button
                      className={cn(
                        "px-4 py-1.5 rounded-xl text-xs font-medium transition",
                        int.connected
                          ? "text-emerald-400 bg-emerald-400/10"
                          : "gradient-brand text-white hover:opacity-90"
                      )}
                    >
                      {int.connected ? "Conectado" : "Conectar"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== "empresa" && activeTab !== "integracoes" && (
            <div className="flex items-center justify-center h-48 text-white/20">
              <p>Configurações de {tabs.find((t) => t.id === activeTab)?.label} em desenvolvimento...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
