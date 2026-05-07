"use client";

import { Search, Plus, Filter } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import type { Conversation } from "@/app/(dashboard)/whatsapp/page";

interface Props {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (c: Conversation) => void;
}

const statusColors: Record<string, string> = {
  open: "bg-green-500",
  pending: "bg-yellow-500",
  closed: "bg-gray-400",
};

export function ConversationList({ conversations, selectedId, onSelect }: Props) {
  const tabs = ["Todas", "Abertas", "Pendentes", "Fechadas"];

  return (
    <div className="w-80 flex-shrink-0 border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Conversas</h2>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition">
              <Plus className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar conversa..."
            className="w-full bg-accent/50 border border-border rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              "px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition",
              tab === "Todas"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={cn(
              "w-full flex items-start gap-3 p-4 text-left hover:bg-accent/50 transition border-b border-border/50",
              selectedId === conv.id && "bg-primary/5 border-l-2 border-l-primary"
            )}
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                {getInitials(conv.name)}
              </div>
              <span className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card", statusColors[conv.status])} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-medium truncate">{conv.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conv.lastTime}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
              {conv.tags.length > 0 && (
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {conv.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            {conv.unread > 0 && (
              <span className="flex-shrink-0 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {conv.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
