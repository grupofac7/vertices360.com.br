import { DashboardStats } from "@/components/dashboard/stats";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { LeadsFunnel } from "@/components/dashboard/leads-funnel";
import { TopSellers } from "@/components/dashboard/top-sellers";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { TasksWidget } from "@/components/dashboard/tasks-widget";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio em tempo real</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <LeadsFunnel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentLeads />
        </div>
        <div className="space-y-6">
          <TopSellers />
          <TasksWidget />
        </div>
      </div>
    </div>
  );
}
