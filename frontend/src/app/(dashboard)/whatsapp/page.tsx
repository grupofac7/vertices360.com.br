"use client";

import { useState } from "react";
import { ConversationList } from "@/components/whatsapp/conversation-list";
import { ChatWindow } from "@/components/whatsapp/chat-window";
import { ChatInfo } from "@/components/whatsapp/chat-info";

export interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  status: "open" | "pending" | "closed";
  avatar?: string;
  tags: string[];
  assignee?: string;
}

const mockConversations: Conversation[] = [
  { id: "1", name: "Roberto Almeida", phone: "+55 11 98765-4321", lastMessage: "Olá, gostaria de saber mais sobre o plano enterprise", lastTime: "14:32", unread: 2, status: "open", tags: ["quente", "enterprise"], assignee: "Carlos" },
  { id: "2", name: "Fernanda Souza", phone: "+55 21 97654-3210", lastMessage: "Qual o prazo de entrega?", lastTime: "13:15", unread: 0, status: "pending", tags: ["proposta"], assignee: "Ana" },
  { id: "3", name: "Marcelo Costa", phone: "+55 11 96543-2109", lastMessage: "Perfeito! Vou analisar a proposta", lastTime: "11:45", unread: 1, status: "open", tags: [], assignee: "Pedro" },
  { id: "4", name: "Patricia Lima", phone: "+55 31 95432-1098", lastMessage: "Podemos agendar uma call?", lastTime: "10:20", unread: 3, status: "open", tags: ["priority", "quente"], assignee: "Carlos" },
  { id: "5", name: "Lucas Ferreira", phone: "+55 11 94321-0987", lastMessage: "Obrigado pelo atendimento!", lastTime: "09:05", unread: 0, status: "closed", tags: [], assignee: "Juliana" },
];

export default function WhatsAppPage() {
  const [selected, setSelected] = useState<Conversation>(mockConversations[0]);
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="flex h-[calc(100vh-7rem)] rounded-2xl border border-border overflow-hidden bg-card">
      <ConversationList
        conversations={mockConversations}
        selectedId={selected.id}
        onSelect={setSelected}
      />
      <ChatWindow
        conversation={selected}
        onToggleInfo={() => setShowInfo(!showInfo)}
        showInfo={showInfo}
      />
      {showInfo && <ChatInfo conversation={selected} />}
    </div>
  );
}
