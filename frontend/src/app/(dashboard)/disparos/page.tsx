"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Plus, Users, FileText, BarChart3, Play, Pause, Trash2,
  Clock, CheckCircle2, XCircle, Upload, Zap, Target, MessageSquare,
  ChevronRight, Calendar, Filter, Search, MoreHorizontal, Eye,
  TrendingUp, AlertCircle, Wifi, WifiOff,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────── */
type CampaignStatus = "draft" | "scheduled" | "running" | "paused" | "completed" | "failed";

interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  template: string;
  contacts: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  scheduledAt?: string;
  createdAt: string;
}

interface Template {
  id: string;
  name: string;
  message: string;
  variables: string[];
  usedIn: number;
}

interface ContactList {
  id: string;
  name: string;
  count: number;
  source: string;
  createdAt: string;
}

/* ─── Mock data ──────────────────────────────────────── */
const mockCampaigns: Campaign[] = [
  { id: "1", name: "Promoção Black Friday", status: "completed", template: "Oferta Especial", contacts: 1240, sent: 1198, delivered: 1150, read: 890, replied: 124, createdAt: "2024-11-20" },
  { id: "2", name: "Follow-up Leads Quentes", status: "running", template: "Follow-up Automático", contacts: 85, sent: 42, delivered: 40, read: 31, replied: 8, scheduledAt: "Agora", createdAt: "2024-11-21" },
  { id: "3", name: "Reativação Clientes Inativos", status: "scheduled", template: "Reativação 30 dias", contacts: 320, sent: 0, delivered: 0, read: 0, replied: 0, scheduledAt: "Hoje 18:00", createdAt: "2024-11-21" },
  { id: "4", name: "Pós-venda Enterprise", status: "draft", template: "Onboarding Enterprise", contacts: 12, sent: 0, delivered: 0, read: 0, replied: 0, createdAt: "2024-11-21" },
  { id: "5", name: "Remarketing Proposta Enviada", status: "paused", template: "Lembrete Proposta", contacts: 67, sent: 30, delivered: 29, read: 22, replied: 3, createdAt: "2024-11-19" },
];

const mockTemplates: Template[] = [
  { id: "1", name: "Oferta Especial", message: "Olá {nome}! 🎉 Temos uma oferta exclusiva para você. O plano {plano} está com {desconto}% de desconto só até hoje. Quer aproveitar?", variables: ["{nome}", "{plano}", "{desconto}"], usedIn: 3 },
  { id: "2", name: "Follow-up Automático", message: "Oi {nome}, tudo bem? Vi que você se interessou pelo nosso serviço. Posso te ajudar com alguma dúvida? 😊", variables: ["{nome}"], usedIn: 5 },
  { id: "3", name: "Reativação 30 dias", message: "Olá {nome}! Faz um tempo que não falamos. A {empresa} tem novidades incríveis que podem te interessar. Podemos conversar?", variables: ["{nome}", "{empresa}"], usedIn: 2 },
  { id: "4", name: "Lembrete Proposta", message: "Oi {nome}! Você teve chance de analisar a proposta que enviamos? Estou à disposição para esclarecer qualquer dúvida. 💼", variables: ["{nome}"], usedIn: 1 },
  { id: "5", name: "Onboarding Enterprise", message: "Bem-vindo, {nome}! 🚀 Sua conta {empresa} está pronta. Agende sua reunião de onboarding: {link}", variables: ["{nome}", "{empresa}", "{link}"], usedIn: 1 },
];

const mockLists: ContactList[] = [
  { id: "1", name: "Leads Quentes Novembro", count: 85, source: "Funil Pipeline", createdAt: "2024-11-21" },
  { id: "2", name: "Clientes Inativos 30d", count: 320, source: "Filtro Automático", createdAt: "2024-11-20" },
  { id: "3", name: "Base Completa", count: 4821, source: "CSV Importado", createdAt: "2024-11-15" },
  { id: "4", name: "Proposta Enviada sem Resposta", count: 67, source: "Funil Pipeline", createdAt: "2024-11-19" },
  { id: "5", name: "Clientes Enterprise", count: 12, source: "Tag Automática", createdAt: "2024-11-10" },
];

/* ─── Status config ──────────────────────────────────── */
const statusConfig: Record<CampaignStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  draft:     { label: "Rascunho",  color: "text-white/40",    bg: "rgba(255,255,255,0.07)", icon: FileText },
  scheduled: { label: "Agendado",  color: "text-blue-400",    bg: "rgba(59,130,246,0.12)",  icon: Clock },
  running:   { label: "Enviando",  color: "text-emerald-400", bg: "rgba(16,185,129,0.12)",  icon: Play },
  paused:    { label: "Pausado",   color: "text-yellow-400",  bg: "rgba(234,179,8,0.12)",   icon: Pause },
  completed: { label: "Concluído", color: "text-violet-400",  bg: "rgba(124,58,237,0.12)",  icon: CheckCircle2 },
  failed:    { label: "Falhou",    color: "text-red-400",     bg: "rgba(239,68,68,0.12)",   icon: XCircle },
};

const cardStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" };
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };
const inputCls = "w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition";

/* ─── Nova Campanha Modal ────────────────────────────── */
function NewCampaignModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", template: "", list: "", schedule: "now", date: "", time: "", delay: "5", intervalMin: "30", intervalMax: "90" });

  const steps = ["Configurar", "Template", "Contatos", "Agendamento"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "rgba(10,10,20,0.98)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <h2 className="font-semibold text-lg text-white">Nova Campanha de Disparo</h2>
            <p className="text-xs text-white/30 mt-0.5">Passo {step} de {steps.length}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/60 transition text-xl leading-none">✕</button>
        </div>

        {/* Steps */}
        <div className="flex px-6 pt-4 gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => setStep(i + 1)}
                className={cn("w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition flex-shrink-0",
                  step > i + 1 ? "gradient-brand text-white" :
                  step === i + 1 ? "gradient-brand text-white glow-primary" :
                  "bg-white/10 text-white/30"
                )}
              >
                {step > i + 1 ? "✓" : i + 1}
              </button>
              <span className={cn("text-xs hidden sm:block", step === i + 1 ? "text-white" : "text-white/30")}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-white/10 ml-2" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Nome da Campanha *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ex: Promoção Black Friday" className={inputCls} style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-xl p-4 space-y-2" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Wifi className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-medium text-violet-300">Instância WhatsApp</span>
                    <span className="ml-auto text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Conectado</span>
                  </div>
                  <p className="text-xs text-white/30">Número: +55 11 9xxxx-xxxx · Instância: flowcrm-main</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Intervalo entre mensagens</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input type="number" value={form.intervalMin} onChange={e => setForm({ ...form, intervalMin: e.target.value })} placeholder="30" className={inputCls} style={inputStyle} />
                    <p className="text-xs text-white/20 mt-1">Mínimo (seg)</p>
                  </div>
                  <div>
                    <input type="number" value={form.intervalMax} onChange={e => setForm({ ...form, intervalMax: e.target.value })} placeholder="90" className={inputCls} style={inputStyle} />
                    <p className="text-xs text-white/20 mt-1">Máximo (seg)</p>
                  </div>
                </div>
                <p className="text-xs text-yellow-400/70 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3" />
                  Intervalo aleatório evita bloqueio do número pelo WhatsApp
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-white/40 mb-2">Escolha um template de mensagem:</p>
              {mockTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setForm({ ...form, template: t.id })}
                  className={cn("w-full text-left rounded-xl p-4 transition", form.template === t.id ? "ring-1 ring-violet-500" : "hover:bg-white/5")}
                  style={form.template === t.id ? { background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" } : cardStyle}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-white">{t.name}</span>
                    {form.template === t.id && <span className="text-xs text-violet-400">✓ Selecionado</span>}
                  </div>
                  <p className="text-xs text-white/40 line-clamp-2">{t.message}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {t.variables.map(v => (
                      <span key={v} className="text-xs text-violet-400 px-1.5 py-0.5 rounded" style={{ background: "rgba(124,58,237,0.12)" }}>{v}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-white/40 mb-2">Selecione a lista de contatos:</p>
              {mockLists.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setForm({ ...form, list: l.id })}
                  className={cn("w-full text-left rounded-xl p-4 transition flex items-center gap-4")}
                  style={form.list === l.id ? { background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" } : cardStyle}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.15)" }}>
                    <Users className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{l.name}</p>
                    <p className="text-xs text-white/30">{l.source}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-white">{l.count.toLocaleString()}</p>
                    <p className="text-xs text-white/30">contatos</p>
                  </div>
                  {form.list === l.id && <span className="text-violet-400 flex-shrink-0">✓</span>}
                </button>
              ))}
              <button
                className="w-full rounded-xl p-4 flex items-center gap-3 text-white/40 hover:text-white/60 transition"
                style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
              >
                <Upload className="w-5 h-5" />
                <span className="text-sm">Importar nova lista via CSV</span>
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "now", label: "Enviar agora", icon: Zap, desc: "Inicia imediatamente" },
                  { value: "scheduled", label: "Agendar", icon: Calendar, desc: "Data e hora específica" },
                  { value: "smart", label: "Inteligente", icon: Target, desc: "Melhor horário automático" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm({ ...form, schedule: opt.value })}
                    className={cn("rounded-xl p-3 text-center transition")}
                    style={form.schedule === opt.value
                      ? { background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)" }
                      : cardStyle
                    }
                  >
                    <opt.icon className={cn("w-5 h-5 mx-auto mb-2", form.schedule === opt.value ? "text-violet-400" : "text-white/30")} />
                    <p className={cn("text-xs font-medium", form.schedule === opt.value ? "text-white" : "text-white/50")}>{opt.label}</p>
                    <p className="text-xs text-white/25 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>

              {form.schedule === "scheduled" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Data</label>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Horário</label>
                    <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className={inputCls} style={inputStyle} />
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="rounded-xl p-4 space-y-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Resumo da campanha</p>
                {[
                  { label: "Campanha", value: form.name || "—" },
                  { label: "Template", value: mockTemplates.find(t => t.id === form.template)?.name || "—" },
                  { label: "Contatos", value: mockLists.find(l => l.id === form.list)?.count.toLocaleString() + " contatos" || "—" },
                  { label: "Envio", value: form.schedule === "now" ? "Imediato" : form.schedule === "smart" ? "Inteligente" : `${form.date} às ${form.time}` },
                  { label: "Intervalo", value: `${form.intervalMin}–${form.intervalMax} segundos` },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-white/30">{row.label}</span>
                    <span className="text-white font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="px-5 py-2.5 rounded-xl text-sm text-white/50 hover:text-white transition" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              Voltar
            </button>
          )}
          <button
            onClick={() => step < 4 ? setStep(s => s + 1) : onClose()}
            className="flex-1 gradient-brand text-white rounded-xl py-2.5 text-sm font-semibold hover:opacity-90 transition glow-primary flex items-center justify-center gap-2"
          >
            {step === 4 ? <><Send className="w-4 h-4" /> {form.schedule === "now" ? "Iniciar Disparo" : "Agendar Campanha"}</> : <>Próximo <ChevronRight className="w-4 h-4" /></>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Campaign Row ───────────────────────────────────── */
function CampaignRow({ c, i }: { c: Campaign; i: number }) {
  const s = statusConfig[c.status];
  const Icon = s.icon;
  const deliveryRate = c.sent > 0 ? Math.round((c.delivered / c.sent) * 100) : 0;
  const readRate = c.delivered > 0 ? Math.round((c.read / c.delivered) * 100) : 0;
  const replyRate = c.read > 0 ? Math.round((c.replied / c.read) * 100) : 0;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="group hover:bg-white/[0.02] transition"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <td className="px-5 py-4">
        <div>
          <p className="text-sm font-medium text-white">{c.name}</p>
          <p className="text-xs text-white/30 mt-0.5">{c.template}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={cn("flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit", s.color)} style={{ background: s.bg }}>
          <Icon className="w-3 h-3" />
          {s.label}
        </span>
      </td>
      <td className="px-4 py-4">
        <p className="text-sm text-white font-medium">{c.contacts.toLocaleString()}</p>
        {c.scheduledAt && <p className="text-xs text-white/30">{c.scheduledAt}</p>}
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div className="h-full rounded-full bg-violet-500" style={{ width: `${deliveryRate}%` }} />
            </div>
            <span className="text-xs text-white/40">{deliveryRate}% entregue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div className="h-full rounded-full bg-blue-400" style={{ width: `${readRate}%` }} />
            </div>
            <span className="text-xs text-white/40">{readRate}% lido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${replyRate}%` }} />
            </div>
            <span className="text-xs text-white/40">{replyRate}% respondeu</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          {c.status === "running" && <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-yellow-400 transition"><Pause className="w-3.5 h-3.5" /></button>}
          {c.status === "paused" && <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-emerald-400 transition"><Play className="w-3.5 h-3.5" /></button>}
          <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 transition"><Eye className="w-3.5 h-3.5" /></button>
          <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-red-400 transition"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </td>
    </motion.tr>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function DisparosPage() {
  const [tab, setTab] = useState<"campanhas" | "templates" | "contatos" | "relatorios">("campanhas");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "campanhas", label: "Campanhas", icon: Send },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "contatos", label: "Listas", icon: Users },
    { id: "relatorios", label: "Relatórios", icon: BarChart3 },
  ] as const;

  const totalEnviados = mockCampaigns.reduce((a, c) => a + c.sent, 0);
  const totalLidos = mockCampaigns.reduce((a, c) => a + c.read, 0);
  const totalRespostas = mockCampaigns.reduce((a, c) => a + c.replied, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Disparos WhatsApp</h1>
          <p className="text-white/30 mt-0.5">Campanhas automáticas e remarketing</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-emerald-400" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            WhatsApp Conectado
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 gradient-brand text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition glow-primary"
          >
            <Plus className="w-4 h-4" />
            Nova Campanha
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Campanhas Ativas", value: mockCampaigns.filter(c => c.status === "running").length.toString(), icon: Play, color: "text-emerald-400", glow: "rgba(16,185,129,0.15)" },
          { label: "Mensagens Enviadas", value: totalEnviados.toLocaleString(), icon: Send, color: "text-violet-400", glow: "rgba(124,58,237,0.15)" },
          { label: "Taxa de Leitura", value: totalEnviados > 0 ? Math.round((totalLidos / totalEnviados) * 100) + "%" : "0%", icon: Eye, color: "text-blue-400", glow: "rgba(59,130,246,0.15)" },
          { label: "Respostas Recebidas", value: totalRespostas.toLocaleString(), icon: MessageSquare, color: "text-orange-400", glow: "rgba(249,115,22,0.15)" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4"
            style={{ ...cardStyle, boxShadow: `0 4px 30px ${stat.glow}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/30 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition",
              tab === id ? "gradient-brand text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Campanhas */}
      {tab === "campanhas" && (
        <div className="rounded-2xl overflow-hidden" style={cardStyle}>
          <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                placeholder="Buscar campanha..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/40 hover:text-white/60 transition" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <Filter className="w-4 h-4" /> Filtrar
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  {["Campanha", "Status", "Contatos", "Performance", ""].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-white/30 px-4 py-3 first:pl-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockCampaigns
                  .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                  .map((c, i) => <CampaignRow key={c.id} c={c} i={i} />)
                }
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Templates */}
      {tab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockTemplates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-5 group hover:bg-white/[0.04] transition"
              style={cardStyle}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">Usado em {t.usedIn} campanha{t.usedIn !== 1 ? "s" : ""}</p>
                </div>
                <button className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/30 transition">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm text-white/70 leading-relaxed">{t.message}</p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {t.variables.map(v => (
                  <span key={v} className="text-xs text-violet-400 px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(124,58,237,0.12)" }}>{v}</span>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-white/30 hover:text-white/60 transition"
            style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
          >
            <Plus className="w-8 h-8" />
            <span className="text-sm">Criar novo template</span>
          </motion.button>
        </div>
      )}

      {/* Tab: Listas */}
      {tab === "contatos" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/40">{mockLists.length} listas de contatos</p>
            <button className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition">
              <Upload className="w-4 h-4" /> Importar CSV
            </button>
          </div>
          {mockLists.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-4 flex items-center gap-4 hover:bg-white/[0.03] transition group"
              style={cardStyle}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <Users className="w-5 h-5 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">{l.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{l.source} · {l.createdAt}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">{l.count.toLocaleString()}</p>
                <p className="text-xs text-white/30">contatos</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <button className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 transition"><Eye className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tab: Relatórios */}
      {tab === "relatorios" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { label: "Total Disparado", value: "1.724", sub: "últimos 30 dias", color: "text-violet-400" },
              { label: "Taxa Média de Leitura", value: "74%", sub: "acima da média do setor", color: "text-blue-400" },
              { label: "ROI Estimado", value: formatCurrency(48200), sub: "de receita gerada", color: "text-emerald-400" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="rounded-2xl p-5" style={cardStyle}>
                <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                <p className="text-sm font-medium text-white mt-1">{stat.label}</p>
                <p className="text-xs text-white/30 mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <h3 className="font-semibold text-white mb-4">Performance por Campanha</h3>
            <div className="space-y-4">
              {mockCampaigns.filter(c => c.sent > 0).map((c) => {
                const rate = Math.round((c.read / c.sent) * 100);
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-white/70">{c.name}</span>
                      <span className="text-sm font-semibold text-white">{rate}% leitura</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full gradient-brand transition-all" style={{ width: `${rate}%` }} />
                    </div>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-white/25">Enviado: {c.sent}</span>
                      <span className="text-xs text-white/25">Lido: {c.read}</span>
                      <span className="text-xs text-white/25">Resposta: {c.replied}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showModal && <NewCampaignModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
