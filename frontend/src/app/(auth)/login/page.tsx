"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      router.replace("/dashboard");
    } catch {
      setError("password", { message: "E-mail ou senha incorretos. Use: admin@flowcrm.com / 123456" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-brand mb-4 shadow-lg shadow-brand-500/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">FlowCRM</h1>
            <p className="text-brand-200 mt-1">Gestão comercial inteligente</p>
          </div>

          {/* Card */}
          <div className="glass rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">Entrar na plataforma</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="seu@email.com"
                    className={cn(
                      "w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-brand-500 transition",
                      errors.email ? "border-red-500" : "border-white/10"
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn(
                      "w-full bg-white/5 border rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-brand-500 transition",
                      errors.password ? "border-red-500" : "border-white/10"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                  <span className="text-sm text-gray-400">Lembrar de mim</span>
                </label>
                <button type="button" className="text-sm text-brand-400 hover:text-brand-300 transition">
                  Esqueci a senha
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full gradient-brand text-white font-semibold py-3 rounded-xl",
                  "transition-all duration-200 shadow-lg shadow-brand-500/30",
                  "hover:opacity-90 hover:shadow-xl hover:shadow-brand-500/40",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-500 text-sm">
                Demo: admin@flowcrm.com / 123456
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
