import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { Prisma } from "@prisma/client";

interface ListLeadsParams {
  companyId: string;
  status?: string;
  source?: string;
  ownerId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ companyId, status, source, ownerId, search, page = 1, limit = 50 }: ListLeadsParams) {
    const where: Prisma.LeadWhereInput = {
      companyId,
      ...(status && { status: status as any }),
      ...(source && { source: source as any }),
      ...(ownerId && { ownerId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: { owner: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: string, companyId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, companyId },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        activities: { orderBy: { createdAt: "desc" }, take: 20 },
        deals: true,
        tasks: { where: { done: false }, orderBy: { dueDate: "asc" } },
      },
    });
    if (!lead) throw new NotFoundException("Lead não encontrado");
    return lead;
  }

  async create(data: Prisma.LeadCreateInput) {
    return this.prisma.lead.create({ data });
  }

  async update(id: string, companyId: string, data: Prisma.LeadUpdateInput) {
    await this.findOne(id, companyId);
    return this.prisma.lead.update({ where: { id }, data });
  }

  async remove(id: string, companyId: string) {
    await this.findOne(id, companyId);
    return this.prisma.lead.delete({ where: { id } });
  }

  async updateStage(id: string, companyId: string, status: string) {
    await this.findOne(id, companyId);
    const lead = await this.prisma.lead.update({
      where: { id },
      data: { status: status as any },
    });
    await this.prisma.activity.create({
      data: {
        type: "STAGE_CHANGE",
        description: `Etapa alterada para: ${status}`,
        leadId: id,
      },
    });
    return lead;
  }

  async getStats(companyId: string) {
    const [total, byStatus, recentLeads] = await Promise.all([
      this.prisma.lead.count({ where: { companyId } }),
      this.prisma.lead.groupBy({
        by: ["status"],
        where: { companyId },
        _count: { id: true },
      }),
      this.prisma.lead.count({
        where: { companyId, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      }),
    ]);

    return { total, byStatus, recentLeads };
  }
}
