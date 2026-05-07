import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export const PIPELINE_STAGES = [
  { id: "new", label: "Lead Novo", color: "#6366f1" },
  { id: "contacted", label: "Contato Iniciado", color: "#f59e0b" },
  { id: "qualified", label: "Qualificação", color: "#3b82f6" },
  { id: "proposal", label: "Proposta Enviada", color: "#8b5cf6" },
  { id: "negotiation", label: "Negociação", color: "#ec4899" },
  { id: "closed_won", label: "Fechado", color: "#10b981" },
  { id: "closed_lost", label: "Perdido", color: "#ef4444" },
  { id: "post_sale", label: "Pós-venda", color: "#14b8a6" },
];
