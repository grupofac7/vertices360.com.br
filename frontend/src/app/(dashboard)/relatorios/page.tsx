"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { week: "Sem 1", vendas: 45, meta: 50 },
  { week: "Sem 2", vendas: 62, meta: 50 },
  { week: "Sem 3", vendas: 38, meta: 50 },
  { week: "Sem 4", vendas: 71, meta: 50 },
];

const sourceData = [
  { name: "Meta Ads", value: 38, color: "#7c3aed" },
  { name: "Google Ads", value: 22, color: "#3b82f6" },
  { name: "WhatsApp", value: 18, color: "#10b981" },
  { name: "Indicação", value: 14, color: "#f59e0b" },
  { name: "Orgânico", value: 8, color: "#6271f1" },
];

const conversionData = [
  { month: "Jan", taxa: 18 },
  { month: "Fev", taxa: 22 },
  { month: "Mar", taxa: 20 },
  { month: "Abr", taxa: 26 },
  { month: "Mai", taxa: 24.5 },
];

const tooltipStyle = {
  background: "rgba(15,15,25,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#fff",
};
const cardStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" };

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Relatórios</h1>
        <p className="text-white/30 mt-0.5">Análise completa de performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl p-5" style={cardStyle}>
          <h3 className="font-semibold text-white">Vendas por Semana</h3>
          <p className="text-sm text-white/30 mt-0.5 mb-5">vs meta semanal</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "rgba(255,255,255,0.5)" }} />
              <Bar dataKey="meta" fill="rgba(255,255,255,0.08)" radius={[4, 4, 0, 0]} name="Meta" />
              <Bar dataKey="vendas" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={cardStyle}>
          <h3 className="font-semibold text-white">Origem dos Leads</h3>
          <p className="text-sm text-white/30 mt-0.5 mb-5">Distribuição por canal</p>
          <div className="flex items-center justify-center gap-8">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {sourceData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-sm text-white/40">{s.name}</span>
                  <span className="text-sm font-semibold text-white ml-auto pl-4">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 lg:col-span-2" style={cardStyle}>
          <h3 className="font-semibold text-white">Taxa de Conversão</h3>
          <p className="text-sm text-white/30 mt-0.5 mb-5">Evolução mensal (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "rgba(255,255,255,0.5)" }} />
              <Line type="monotone" dataKey="taxa" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: "#7c3aed", r: 4, strokeWidth: 0 }} name="Conversão" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
