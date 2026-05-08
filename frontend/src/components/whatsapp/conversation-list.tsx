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
  open: "bg-emerald-500",
  pending: "bg-yellow-400",
  closed: "bg-white/20",
};

export function ConversationList({ conversations, selectedId, onSelect }: Props) {
  const tabs = ["Todas", "Abertas", "Pendentes", "Fechadas"];

  return (
    <div
      className="w-80 flex-shrink-0 flex flex-col"
      style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">Conversas</h2>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition">
              <Filter className="w-3.5 h-3.5 text-white/30" />
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition">
              <Plus className="w-3.5 h-3.5 text-white/30" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
          <input
            placeholder="Buscar conversa..."
            className="w-full rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={cn(
              "px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition",
              i === 0
                ? "border-violet-500 text-violet-400"
                : "border-transparent text-white/30 hover:text-white/60"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={cn(
              "w-full flex items-start gap-3 p-4 text-left transition",
              selectedId === conv.id
                ? "border-l-2 border-l-violet-500"
                : "hover:bg-white/[0.02] border-l-2 border-l-transparent"
            )}
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: selectedId === conv.id ? "rgba(124,58,237,0.06)" : undefined,
            }}
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-violet-300 text-sm font-bold"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                {getInitials(conv.name)}
              </div>
              <span className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2", statusColors[conv.status])} style={{ borderColor: "#08080f" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-medium text-white truncate">{conv.name}</span>
                <span className="text-xs text-white/25 flex-shrink-0 ml-2">{conv.lastTime}</span>
              </div>
              <p className="text-xs text-white/30 truncate">{conv.lastMessage}</p>
              {conv.tags.length > 0 && (
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {conv.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-violet-400 px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(124,58,237,0.12)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {conv.unread > 0 && (
              <span className="flex-shrink-0 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {conv.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
