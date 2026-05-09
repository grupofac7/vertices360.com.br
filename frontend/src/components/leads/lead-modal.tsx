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

const inputCls = "w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };
const inputErrorStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(239,68,68,0.5)" };

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
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl scrollbar-hide"
          style={{
            background: "rgba(12,12,22,0.98)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(40px)",
          }}
        >
          {/* Header */}
          <div
            className="sticky top-0 px-6 py-4 flex items-center justify-between z-10"
            style={{
              background: "rgba(12,12,22,0.98)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            <h2 className="font-semibold text-lg text-white">Novo Lead</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl hover:bg-white/8 flex items-center justify-center transition text-white/40 hover:text-white/70"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/50 mb-1.5">Nome *</label>
                <input
                  {...register("name")}
                  placeholder="Nome completo"
                  className={inputCls}
                  style={errors.name ? inputErrorStyle : inputStyle}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Telefone *</label>
                <input
                  {...register("phone")}
                  placeholder="(11) 99999-9999"
                  className={inputCls}
                  style={errors.phone ? inputErrorStyle : inputStyle}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">E-mail</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="email@exemplo.com"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Cidade</label>
                <input
                  {...register("city")}
                  placeholder="São Paulo"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Origem *</label>
                <select
                  {...register("source")}
                  className={cn(inputCls, "cursor-pointer")}
                  style={errors.source ? inputErrorStyle : inputStyle}
                >
                  <option value="" style={{ background: "#0c0c16" }}>Selecionar...</option>
                  {["Meta Ads","Google Ads","WhatsApp","Landing Page","Indicação","Orgânico","Outro"].map((o) => (
                    <option key={o} style={{ background: "#0c0c16" }}>{o}</option>
                  ))}
                </select>
                {errors.source && <p className="text-red-400 text-xs mt-1">{errors.source.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Interesse</label>
                <input
                  {...register("interest")}
                  placeholder="Produto / serviço"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Valor potencial (R$)</label>
                <input
                  {...register("value")}
                  type="number"
                  placeholder="0"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/50 mb-1.5">Observações</label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Notas sobre o lead..."
                  className={cn(inputCls, "resize-none")}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl py-2.5 text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 gradient-brand text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center glow-primary"
              >
                {isSubmitting
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : "Salvar Lead"
                }
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
