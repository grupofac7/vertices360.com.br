"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Zap, BarChart3, Users, MessageCircle, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type Form = z.infer<typeof schema>;

const features = [
  { icon: BarChart3, label: "Dashboard em tempo real", color: "text-violet-400" },
  { icon: Users, label: "Gestão completa de leads", color: "text-blue-400" },
  { icon: MessageCircle, label: "WhatsApp integrado", color: "text-emerald-400" },
  { icon: TrendingUp, label: "Pipeline drag & drop", color: "text-orange-400" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await login(data.email, data.password);
      router.replace("/dashboard");
    } catch {
      setError("password", { message: "E-mail ou senha incorretos" });
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-[#0a0a0f] to-[#0a0a0f]" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center glow-primary">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FlowCRM</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Venda mais com<br />
              <span className="text-gradient">inteligência</span>
            </h1>
            <p className="text-white/50 text-lg mb-12">
              A plataforma completa para gestão comercial, leads e atendimento em um só lugar.
            </p>

            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                    <f.icon className={cn("w-4 h-4", f.color)} />
                  </div>
                  <span className="text-white/70 text-sm">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: "10k+", label: "Leads gerenciados" },
            { value: "98%", label: "Satisfação" },
            { value: "3x", label: "Mais vendas" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FlowCRM</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
            <p className="text-white/40">Entre com sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="seu@email.com"
                  className={cn(
                    "w-full glass rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/20 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all",
                    errors.email ? "ring-2 ring-red-500/50" : ""
                  )}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={cn(
                    "w-full glass rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-white/20 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all",
                    errors.password ? "ring-2 ring-red-500/50" : ""
                  )}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/5 text-violet-500" />
                <span className="text-sm text-white/40">Lembrar de mim</span>
              </label>
              <button type="button" className="text-sm text-violet-400 hover:text-violet-300 transition">
                Esqueci a senha
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-brand text-white font-semibold py-3.5 rounded-xl glow-primary hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : "Entrar na plataforma"
              }
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/20 text-xs mb-1">Conta de demonstração</p>
            <p className="text-white/40 text-sm font-mono">admin@flowcrm.com · 123456</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
