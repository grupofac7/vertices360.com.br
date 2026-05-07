"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bell, Lock, Building2, Users, Webhook, CreditCard, Palette } from "lucide-react";

const tabs = [
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "equipe", label: "Equipe", icon: Users },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "integrações", label: "Integrações", icon: Webhook },
  { id: "segurança", label: "Segurança", icon: Lock },
  { id: "plano", label: "Plano", icon: CreditCard },
  { id: "aparência", label: "Aparência", icon: Palette },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("empresa");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-card border border-border rounded-2xl p-6">
          {activeTab === "empresa" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-lg">Dados da Empresa</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Nome da Empresa</label>
                  <input defaultValue="FlowCRM Demo" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">CNPJ</label>
                  <input defaultValue="00.000.000/0001-00" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Telefone</label>
                  <input defaultValue="(11) 3000-0000" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Website</label>
                  <input defaultValue="https://flowcrm.com" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
                Salvar Alterações
              </button>
            </div>
          )}

          {activeTab === "integrações" && (
            <div className="space-y-6">
              <h2 className="font-semibold text-lg">Integrações</h2>
              <div className="space-y-4">
                {[
                  { name: "WhatsApp (Evolution API)", desc: "Conecte sua instância WhatsApp", connected: true, color: "bg-green-500" },
                  { name: "Meta Ads", desc: "Capture leads automaticamente", connected: true, color: "bg-blue-600" },
                  { name: "Google Ads", desc: "Importe leads do Google", connected: false, color: "bg-red-500" },
                  { name: "RD Station", desc: "Sincronize com seu CRM de marketing", connected: false, color: "bg-orange-500" },
                  { name: "Zapier", desc: "Automatize com 5000+ apps", connected: false, color: "bg-yellow-500" },
                ].map((int) => (
                  <div key={int.name} className="flex items-center gap-4 p-4 border border-border rounded-xl">
                    <div className={`w-10 h-10 rounded-xl ${int.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {int.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{int.name}</p>
                      <p className="text-xs text-muted-foreground">{int.desc}</p>
                    </div>
                    <button className={cn("px-4 py-1.5 rounded-xl text-xs font-medium transition", int.connected ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-primary text-primary-foreground hover:opacity-90")}>
                      {int.connected ? "Conectado" : "Conectar"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== "empresa" && activeTab !== "integrações" && (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <p>Configurações de {tabs.find((t) => t.id === activeTab)?.label} em desenvolvimento...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
