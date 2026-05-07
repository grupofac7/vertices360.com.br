import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(companyId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const [leadsToday, leadsMonth, wonDeals, totalLeads, openTasks] = await Promise.all([
      this.prisma.lead.count({ where: { companyId, createdAt: { gte: today } } }),
      this.prisma.lead.count({ where: { companyId, createdAt: { gte: monthStart } } }),
      this.prisma.deal.findMany({ where: { companyId, stage: "CLOSED_WON", closedAt: { gte: monthStart } } }),
      this.prisma.lead.count({ where: { companyId } }),
      this.prisma.task.count({ where: { companyId, done: false } }),
    ]);

    const revenue = wonDeals.reduce((s, d) => s + d.value, 0);
    const conversions = wonDeals.length;

    return {
      leadsToday,
      leadsMonth,
      revenue,
      conversions,
      totalLeads,
      openTasks,
      conversionRate: leadsMonth > 0 ? ((conversions / leadsMonth) * 100).toFixed(1) : "0",
    };
  }

  async getRevenue(companyId: string, period = "6M") {
    const months = period === "1A" ? 12 : period === "6M" ? 6 : period === "3M" ? 3 : 1;
    const result = [];

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);

      const deals = await this.prisma.deal.findMany({
        where: { companyId, stage: "CLOSED_WON", closedAt: { gte: start, lte: end } },
        select: { value: true },
      });

      result.push({
        month: start.toLocaleDateString("pt-BR", { month: "short" }),
        revenue: deals.reduce((s, d) => s + d.value, 0),
      });
    }

    return result;
  }

  async getTopSellers(companyId: string) {
    const sellers = await this.prisma.user.findMany({
      where: { companyId, role: { in: ["SELLER", "SUPERVISOR"] } },
      select: {
        id: true,
        name: true,
        assignedDeals: {
          where: { stage: "CLOSED_WON" },
          select: { value: true },
        },
      },
    });

    return sellers
      .map((s) => ({
        id: s.id,
        name: s.name,
        deals: s.assignedDeals.length,
        revenue: s.assignedDeals.reduce((sum, d) => sum + d.value, 0),
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }
}
