import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("crm_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("crm_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

export const leadsApi = {
  list: (params?: Record<string, unknown>) => api.get("/leads", { params }),
  get: (id: string) => api.get(`/leads/${id}`),
  create: (data: unknown) => api.post("/leads", data),
  update: (id: string, data: unknown) => api.patch(`/leads/${id}`, data),
  delete: (id: string) => api.delete(`/leads/${id}`),
  import: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return api.post("/leads/import", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const pipelineApi = {
  list: () => api.get("/pipeline"),
  updateStage: (leadId: string, stageId: string) =>
    api.patch(`/pipeline/${leadId}/stage`, { stageId }),
};

export const whatsappApi = {
  conversations: (params?: Record<string, unknown>) =>
    api.get("/whatsapp/conversations", { params }),
  messages: (conversationId: string) =>
    api.get(`/whatsapp/conversations/${conversationId}/messages`),
  send: (conversationId: string, message: string) =>
    api.post(`/whatsapp/conversations/${conversationId}/messages`, { message }),
  connect: (instanceId: string) => api.post(`/whatsapp/instances/${instanceId}/connect`),
};

export const dashboardApi = {
  stats: () => api.get("/dashboard/stats"),
  revenue: (period: string) => api.get(`/dashboard/revenue?period=${period}`),
  topSellers: () => api.get("/dashboard/top-sellers"),
};
