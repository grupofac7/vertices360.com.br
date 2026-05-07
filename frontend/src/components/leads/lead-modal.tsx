"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  city: z.string().optional(),
  source: z.string().min(1, "Origem obrigatória"),
  interest: z.string().optional(),
  value: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface LeadModalProps { onClose: () => void; lead?: Partial<FormData> }

export function LeadModal({ onClose, lead }: LeadModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: lead,
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Novo Lead</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-accent flex items-center justify-center transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1.5">Nome *</label>
                <input {...register("name")} placeholder="Nome completo" className={cn("w-full border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition", errors.name ? "border-red-500" : "border-border")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Telefone *</label>
                <input {...register("phone")} placeholder="(11) 99999-9999" className={cn("w-full border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition", errors.phone ? "border-red-500" : "border-border")} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">E-mail</label>
                <input {...register("email")} type="email" placeholder="email@exemplo.com" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Cidade</label>
                <input {...register("city")} placeholder="São Paulo" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Origem *</label>
                <select {...register("source")} className={cn("w-full border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition", errors.source ? "border-red-500" : "border-border")}>
                  <option value="">Selecionar...</option>
                  <option>Meta Ads</option>
                  <option>Google Ads</option>
                  <option>WhatsApp</option>
                  <option>Landing Page</option>
                  <option>Indicação</option>
                  <option>Orgânico</option>
                  <option>Outro</option>
                </select>
                {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Interesse</label>
                <input {...register("interest")} placeholder="Produto / serviço" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Valor potencial (R$)</label>
                <input {...register("value")} type="number" placeholder="0,00" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1.5">Observações</label>
                <textarea {...register("notes")} rows={3} placeholder="Notas sobre o lead..." className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 border border-border rounded-xl py-2.5 text-sm hover:bg-accent transition">
                Cancelar
              </button>
              <button type="submit" disabled={isSubmitting} className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center">
                {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Salvar Lead"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
