import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

const STAGES = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST", "POST_SALE"];

@Injectable()
export class PipelineService {
  constructor(private prisma: PrismaService) {}

  async getBoard(companyId: string) {
    const leads = await this.prisma.lead.findMany({
      where: { companyId, status: { notIn: ["CLOSED_LOST"] } },
      include: { owner: { select: { id: true, name: true } } },
      orderBy: { updatedAt: "desc" },
    });

    return STAGES.map((stage) => ({
      id: stage,
      leads: leads.filter((l) => l.status === stage),
      total: leads.filter((l) => l.status === stage).reduce((s, l) => s + l.value, 0),
    }));
  }

  async moveStage(leadId: string, companyId: string, status: string, userId: string) {
    const lead = await this.prisma.lead.update({
      where: { id: leadId },
      data: { status: status as any, updatedAt: new Date() },
    });
    await this.prisma.activity.create({
      data: {
        type: "STAGE_CHANGE",
        description: `Movido para: ${status}`,
        leadId,
        userId,
      },
    });
    return lead;
  }
}
