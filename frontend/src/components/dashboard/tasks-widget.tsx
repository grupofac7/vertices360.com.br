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

const priorityColors: Record<string, string> = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500",
};

export function TasksWidget() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id: string) => {
    setTasks((t) => t.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-semibold">Tarefas do Dia</h3>
        <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
          {tasks.filter((t) => !t.done).length} pendentes
        </span>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggle(task.id)}
            className="w-full flex items-center gap-3 text-left p-2 rounded-xl hover:bg-accent transition"
          >
            {task.done ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className={cn("w-4 h-4 flex-shrink-0", priorityColors[task.priority])} />
            )}
            <span className={cn("text-sm flex-1", task.done && "line-through text-muted-foreground")}>
              {task.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
