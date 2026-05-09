import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

export interface CreateCampaignDto {
  name: string;
  templateMessage: string;
  contactListId?: string;
  contacts?: { phone: string; variables?: Record<string, string> }[];
  scheduleAt?: string;
  intervalMin?: number;
  intervalMax?: number;
  companyId: string;
  createdBy: string;
}

@Injectable()
export class DisparosService {
  private evolutionUrl: string;
  private evolutionKey: string;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.evolutionUrl = config.get("EVOLUTION_API_URL") || "";
    this.evolutionKey = config.get("EVOLUTION_API_KEY") || "";
  }

  async getCampaigns(companyId: string) {
    return this.prisma.disparo.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getCampaign(id: string, companyId: string) {
    const d = await this.prisma.disparo.findFirst({ where: { id, companyId } });
    if (!d) throw new NotFoundException("Campanha não encontrada");
    return d;
  }

  async createCampaign(dto: CreateCampaignDto) {
    return this.prisma.disparo.create({
      data: {
        name: dto.name,
        status: dto.scheduleAt ? "SCHEDULED" : "DRAFT",
        templateMessage: dto.templateMessage,
        totalContacts: dto.contacts?.length || 0,
        sentCount: 0,
        deliveredCount: 0,
        readCount: 0,
        repliedCount: 0,
        intervalMin: dto.intervalMin || 30,
        intervalMax: dto.intervalMax || 90,
        scheduleAt: dto.scheduleAt ? new Date(dto.scheduleAt) : null,
        companyId: dto.companyId,
        createdBy: dto.createdBy,
        contactsJson: JSON.stringify(dto.contacts || []),
      },
    });
  }

  async startCampaign(id: string, companyId: string) {
    const campaign = await this.getCampaign(id, companyId);
    if (!["DRAFT", "SCHEDULED", "PAUSED"].includes(campaign.status)) {
      throw new BadRequestException("Campanha não pode ser iniciada");
    }

    await this.prisma.disparo.update({
      where: { id },
      data: { status: "RUNNING", startedAt: new Date() },
    });

    // Inicia envio em background
    this.processCampaign(id, companyId).catch(console.error);

    return { message: "Campanha iniciada", id };
  }

  async pauseCampaign(id: string, companyId: string) {
    await this.getCampaign(id, companyId);
    return this.prisma.disparo.update({
      where: { id },
      data: { status: "PAUSED" },
    });
  }

  async deleteCampaign(id: string, companyId: string) {
    await this.getCampaign(id, companyId);
    return this.prisma.disparo.delete({ where: { id } });
  }

  async getTemplates(companyId: string) {
    return this.prisma.disparoTemplate.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
  }

  async createTemplate(companyId: string, name: string, message: string) {
    const variables = (message.match(/\{[a-z_]+\}/gi) || []);
    return this.prisma.disparoTemplate.create({
      data: { name, message, variables: JSON.stringify(variables), companyId },
    });
  }

  async getStats(companyId: string) {
    const campaigns = await this.prisma.disparo.findMany({ where: { companyId } });
    const active = campaigns.filter(c => c.status === "RUNNING").length;
    const sent = campaigns.reduce((a, c) => a + c.sentCount, 0);
    const read = campaigns.reduce((a, c) => a + c.readCount, 0);
    const replied = campaigns.reduce((a, c) => a + c.repliedCount, 0);
    return {
      activeCampaigns: active,
      totalSent: sent,
      readRate: sent > 0 ? Math.round((read / sent) * 100) : 0,
      totalReplied: replied,
    };
  }

  /* ── Evolution API ──────────────────────────────── */
  private async sendWhatsappMessage(instanceName: string, phone: string, message: string): Promise<boolean> {
    if (!this.evolutionUrl || !this.evolutionKey) {
      console.warn("Evolution API não configurada");
      return false;
    }
    try {
      await axios.post(
        `${this.evolutionUrl}/message/sendText/${instanceName}`,
        { number: phone.replace(/\D/g, ""), textMessage: { text: message } },
        { headers: { apikey: this.evolutionKey }, timeout: 10000 },
      );
      return true;
    } catch (err) {
      console.error(`Erro ao enviar para ${phone}:`, err);
      return false;
    }
  }

  private interpolate(template: string, vars: Record<string, string>): string {
    return template.replace(/\{([a-z_]+)\}/gi, (_, key) => vars[key] || `{${key}}`);
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async processCampaign(id: string, companyId: string) {
    const campaign = await this.getCampaign(id, companyId);
    const contacts: { phone: string; variables?: Record<string, string> }[] =
      JSON.parse(campaign.contactsJson || "[]");

    const instance = await this.prisma.whatsappInstance.findFirst({
      where: { companyId, status: "CONNECTED" },
    });

    if (!instance) {
      await this.prisma.disparo.update({ where: { id }, data: { status: "FAILED" } });
      return;
    }

    for (const contact of contacts) {
      const fresh = await this.prisma.disparo.findUnique({ where: { id } });
      if (fresh?.status !== "RUNNING") break;

      const message = this.interpolate(campaign.templateMessage, contact.variables || {});
      const ok = await this.sendWhatsappMessage(instance.name, contact.phone, message);

      await this.prisma.disparo.update({
        where: { id },
        data: {
          sentCount: { increment: 1 },
          ...(ok && { deliveredCount: { increment: 1 } }),
        },
      });

      const delay = Math.floor(
        Math.random() * ((campaign.intervalMax - campaign.intervalMin) * 1000) +
        campaign.intervalMin * 1000
      );
      await this.sleep(delay);
    }

    await this.prisma.disparo.update({
      where: { id },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
  }
}
