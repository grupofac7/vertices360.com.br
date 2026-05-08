import { DashboardStats } from "@/components/dashboard/stats";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { LeadsFunnel } from "@/components/dashboard/leads-funnel";
import { TopSellers } from "@/components/dashboard/top-sellers";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { TasksWidget } from "@/components/dashboard/tasks-widget";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/30 mt-0.5">Visão geral do seu negócio em tempo real</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-white/20">Bem-vindo de volta,</p>
          <p className="text-sm font-semibold text-white/60">Admin</p>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <LeadsFunnel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentLeads />
        </div>
        <div className="space-y-5">
          <TopSellers />
          <TasksWidget />
        </div>
      </div>
    </div>
  );
}
