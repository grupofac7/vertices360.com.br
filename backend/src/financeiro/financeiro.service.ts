import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class FinanceiroService {
  constructor(private prisma: PrismaService) {}

  async getTransactions(params: { type?: string; page?: number; limit?: number }) {
    const { type, page = 1, limit = 50 } = params;
    const where = { ...(type && { type: type as any }) };

    const [data, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async getSummary() {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const transactions = await this.prisma.transaction.findMany({
      where: { date: { gte: monthStart } },
    });

    const income = transactions.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.value, 0);
    const expenses = transactions.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.value, 0);

    return { income, expenses, profit: income - expenses };
  }

  async create(data: { description: string; type: string; value: number; category?: string; notes?: string }) {
    return this.prisma.transaction.create({ data: data as any });
  }
}
