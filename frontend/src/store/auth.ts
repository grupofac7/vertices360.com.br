import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  company: { id: string; name: string };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

const DEMO_USERS: Record<string, User> = {
  "admin@flowcrm.com": {
    id: "1",
    name: "Admin Master",
    email: "admin@flowcrm.com",
    role: "admin",
    company: { id: "1", name: "FlowCRM Demo" },
  },
  "carlos@flowcrm.com": {
    id: "2",
    name: "Carlos Silva",
    email: "carlos@flowcrm.com",
    role: "seller",
    company: { id: "1", name: "FlowCRM Demo" },
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("crm_token") : null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 600));

    // Tenta backend real primeiro
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          signal: AbortSignal.timeout(3000),
        }
      );
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("crm_token", data.token);
        set({ token: data.token, user: data.user, isAuthenticated: true, isLoading: false });
        return;
      }
    } catch {
      // Backend não disponível — usa modo demo
    }

    // Modo demo (sem backend)
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && password === "123456") {
      const token = "demo_token_" + Date.now();
      localStorage.setItem("crm_token", token);
      localStorage.setItem("crm_user", JSON.stringify(demoUser));
      set({ token, user: demoUser, isAuthenticated: true, isLoading: false });
      return;
    }

    set({ isLoading: false });
    throw new Error("Credenciais inválidas");
  },

  logout: () => {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_user");
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("crm_token");
    if (!token) return;

    // Tenta carregar do backend
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: AbortSignal.timeout(2000),
        }
      );
      if (res.ok) {
        const user = await res.json();
        set({ user, isAuthenticated: true });
        return;
      }
    } catch {
      // Backend offline — carrega do localStorage
    }

    // Modo demo
    const stored = localStorage.getItem("crm_user");
    if (stored) {
      try {
        set({ user: JSON.parse(stored), isAuthenticated: true });
      } catch {
        localStorage.removeItem("crm_token");
        localStorage.removeItem("crm_user");
      }
    }
  },
}));
