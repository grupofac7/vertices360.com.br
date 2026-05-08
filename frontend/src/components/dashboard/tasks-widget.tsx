"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const initialTasks = [
  { id: "1", title: "Ligar para Roberto Almeida", priority: "high", done: false },
  { id: "2", title: "Enviar proposta Fernanda", priority: "high", done: false },
  { id: "3", title: "Follow-up Patricia Lima", priority: "medium", done: true },
  { id: "4", title: "Reunião com equipe 15h", priority: "medium", done: false },
];

const priorityDot: Record<string, string> = {
  high: "text-red-400",
  medium: "text-yellow-400",
  low: "text-emerald-400",
};

export function TasksWidget() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id: string) => {
    setTasks((t) => t.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  const pending = tasks.filter((t) => !t.done).length;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-white/30" />
        <h3 className="font-semibold text-white">Tarefas do Dia</h3>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium text-violet-400"
          style={{ background: "rgba(124,58,237,0.15)" }}
        >
          {pending} pendentes
        </span>
      </div>
      <div className="space-y-1.5">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggle(task.id)}
            className="w-full flex items-center gap-3 text-left p-2.5 rounded-xl hover:bg-white/5 transition group"
          >
            {task.done ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <Circle className={cn("w-4 h-4 flex-shrink-0", priorityDot[task.priority])} />
            )}
            <span className={cn(
              "text-sm flex-1 text-left",
              task.done ? "line-through text-white/20" : "text-white/60 group-hover:text-white/80"
            )}>
              {task.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
