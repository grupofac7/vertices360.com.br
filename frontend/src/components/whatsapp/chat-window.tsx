"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Mic, MoreVertical, Phone, Video, Info, Bot } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import type { Conversation } from "@/app/(dashboard)/whatsapp/page";

interface Message {
  id: string;
  text: string;
  time: Date;
  fromMe: boolean;
  status?: "sent" | "delivered" | "read";
}

const mockMessages: Message[] = [
  { id: "1", text: "Olá! Vi o anúncio de vocês no Instagram e fiquei interessado no plano Enterprise.", time: new Date("2024-11-21T14:28:00"), fromMe: false },
  { id: "2", text: "Olá Roberto! Que ótimo! Pode me dizer um pouco mais sobre sua empresa?", time: new Date("2024-11-21T14:29:00"), fromMe: true, status: "read" },
  { id: "3", text: "Somos uma empresa de tecnologia com 50 funcionários, precisamos de uma solução completa de CRM.", time: new Date("2024-11-21T14:30:00"), fromMe: false },
  { id: "4", text: "Perfeito! O plano Enterprise inclui: usuários ilimitados, automação avançada, integrações e suporte dedicado 24/7.", time: new Date("2024-11-21T14:31:00"), fromMe: true, status: "read" },
  { id: "5", text: "Qual o valor?", time: new Date("2024-11-21T14:32:00"), fromMe: false },
  { id: "6", text: "Olá, gostaria de saber mais sobre o plano enterprise", time: new Date("2024-11-21T14:32:00"), fromMe: false },
];

interface Props {
  conversation: Conversation;
  onToggleInfo: () => void;
  showInfo: boolean;
}

export function ChatWindow({ conversation, onToggleInfo, showInfo }: Props) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [text, setText] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, time: new Date(), fromMe: true, status: "sent" },
    ]);
    setText("");
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div
        className="h-16 px-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-violet-300 text-sm font-bold"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          {getInitials(conversation.name)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-white">{conversation.name}</p>
          <p className="text-xs text-white/30">{conversation.phone}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAiMode(!aiMode)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition",
              aiMode
                ? "text-violet-400 bg-violet-500/15"
                : "text-white/30 hover:text-white/60 hover:bg-white/5"
            )}
          >
            <Bot className="w-3.5 h-3.5" />
            IA {aiMode ? "Ativa" : "Off"}
          </button>
          {[Phone, Video].map((Icon, i) => (
            <button key={i} className="w-8 h-8 rounded-xl hover:bg-white/5 flex items-center justify-center transition">
              <Icon className="w-4 h-4 text-white/30" />
            </button>
          ))}
          <button
            onClick={onToggleInfo}
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition",
              showInfo ? "bg-violet-500/15 text-violet-400" : "text-white/30 hover:bg-white/5"
            )}
          >
            <Info className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-xl hover:bg-white/5 flex items-center justify-center transition">
            <MoreVertical className="w-4 h-4 text-white/30" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide"
        style={{ background: "rgba(255,255,255,0.01)" }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.fromMe ? "justify-end" : "justify-start")}>
            <div
              className={cn("max-w-[70%] px-4 py-2.5 rounded-2xl text-sm")}
              style={
                msg.fromMe
                  ? { background: "linear-gradient(135deg,#7c3aed,#6271f1)", color: "#fff", borderRadius: "18px 4px 18px 18px" }
                  : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)", borderRadius: "4px 18px 18px 18px" }
              }
            >
              <p>{msg.text}</p>
              <p className={cn("text-xs mt-1 text-right", msg.fromMe ? "text-white/50" : "text-white/25")}>
                {msg.time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                {msg.fromMe && msg.status === "read" && " ✓✓"}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {aiMode && (
          <div
            className="mb-3 px-3 py-2 rounded-xl flex items-center gap-2"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs text-violet-300">IA respondendo automaticamente com base no contexto do lead</span>
          </div>
        )}
        <div className="flex items-end gap-2">
          <button className="w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center transition flex-shrink-0">
            <Paperclip className="w-4 h-4 text-white/30" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Digite uma mensagem..."
              rows={1}
              className="w-full rounded-2xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none transition max-h-32"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
            />
          </div>
          <button className="w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center transition flex-shrink-0">
            <Smile className="w-4 h-4 text-white/30" />
          </button>
          {text.trim() ? (
            <button
              onClick={send}
              className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center transition hover:opacity-90 flex-shrink-0 glow-primary"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button className="w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center transition flex-shrink-0">
              <Mic className="w-4 h-4 text-white/30" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
