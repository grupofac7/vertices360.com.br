"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";

const salesData = [
  { week: "Sem 1", vendas: 45, meta: 50 },
  { week: "Sem 2", vendas: 62, meta: 50 },
  { week: "Sem 3", vendas: 38, meta: 50 },
  { week: "Sem 4", vendas: 71, meta: 50 },
];

const sourceData = [
  { name: "Meta Ads", value: 38, color: "#6271f1" },
  { name: "Google Ads", value: 22, color: "#3b82f6" },
  { name: "WhatsApp", value: 18, color: "#10b981" },
  { name: "Indicação", value: 14, color: "#f59e0b" },
  { name: "Orgânico", value: 8, color: "#8b5cf6" },
];

const conversionData = [
  { month: "Jan", taxa: 18 },
  { month: "Fev", taxa: 22 },
  { month: "Mar", taxa: 20 },
  { month: "Abr", taxa: 26 },
  { month: "Mai", taxa: 24.5 },
];

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Análise completa de performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-1">Vendas por Semana</h3>
          <p className="text-sm text-muted-foreground mb-5">vs meta semanal</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="meta" fill="hsl(var(--border))" radius={[4, 4, 0, 0]} name="Meta" />
              <Bar dataKey="vendas" fill="#6271f1" radius={[4, 4, 0, 0]} name="Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-1">Origem dos Leads</h3>
          <p className="text-sm text-muted-foreground mb-5">Distribuição por canal</p>
          <div className="flex items-center justify-center gap-8">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {sourceData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-sm text-muted-foreground">{s.name}</span>
                  <span className="text-sm font-medium ml-auto pl-4">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-semibold mb-1">Taxa de Conversão</h3>
          <p className="text-sm text-muted-foreground mb-5">Evolução mensal (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Line type="monotone" dataKey="taxa" stroke="#6271f1" strokeWidth={2.5} dot={{ fill: "#6271f1", r: 4 }} name="Conversão" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
