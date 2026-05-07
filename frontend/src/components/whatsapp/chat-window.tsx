"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Mic, MoreVertical, Phone, Video, Info, Bot } from "lucide-react";
import { cn, getInitials, formatDateTime } from "@/lib/utils";
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
  { id: "2", text: "Olá Roberto! Que ótimo! Vou te explicar tudo sobre o plano Enterprise. Pode me dizer um pouco mais sobre sua empresa?", time: new Date("2024-11-21T14:29:00"), fromMe: true, status: "read" },
  { id: "3", text: "Somos uma empresa de tecnologia com 50 funcionários, precisamos de uma solução completa para CRM.", time: new Date("2024-11-21T14:30:00"), fromMe: false },
  { id: "4", text: "Perfeito! O plano Enterprise é ideal para vocês. Inclui: usuários ilimitados, automação avançada, integração com todos os seus sistemas e suporte dedicado 24/7.", time: new Date("2024-11-21T14:31:00"), fromMe: true, status: "read" },
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
      <div className="h-16 border-b border-border px-4 flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
          {getInitials(conversation.name)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{conversation.name}</p>
          <p className="text-xs text-muted-foreground">{conversation.phone}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAiMode(!aiMode)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition",
              aiMode ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "hover:bg-accent text-muted-foreground"
            )}
          >
            <Bot className="w-3.5 h-3.5" />
            IA {aiMode ? "Ativa" : "Off"}
          </button>
          <button className="w-8 h-8 rounded-xl hover:bg-accent flex items-center justify-center transition">
            <Phone className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-8 h-8 rounded-xl hover:bg-accent flex items-center justify-center transition">
            <Video className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={onToggleInfo}
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition",
              showInfo ? "bg-primary/10 text-primary" : "hover:bg-accent text-muted-foreground"
            )}
          >
            <Info className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-xl hover:bg-accent flex items-center justify-center transition">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "hsl(var(--accent) / 0.3)" }}>
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.fromMe ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                msg.fromMe
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-card border border-border rounded-tl-sm"
              )}
            >
              <p>{msg.text}</p>
              <p className={cn("text-xs mt-1 text-right", msg.fromMe ? "text-primary-foreground/60" : "text-muted-foreground")}>
                {msg.time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                {msg.fromMe && msg.status === "read" && " ✓✓"}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 flex-shrink-0">
        {aiMode && (
          <div className="mb-3 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 flex items-center gap-2">
            <Bot className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs text-purple-700 dark:text-purple-400">IA respondendo automaticamente com base no contexto do lead</span>
          </div>
        )}
        <div className="flex items-end gap-2">
          <button className="w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition flex-shrink-0">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Digite uma mensagem..."
              rows={1}
              className="w-full bg-accent/50 border border-border rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition max-h-32"
            />
          </div>
          <button className="w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition flex-shrink-0">
            <Smile className="w-4 h-4 text-muted-foreground" />
          </button>
          {text.trim() ? (
            <button
              onClick={send}
              className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition hover:opacity-90 flex-shrink-0"
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          ) : (
            <button className="w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition flex-shrink-0">
              <Mic className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
