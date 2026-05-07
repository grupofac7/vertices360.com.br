import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { WhatsappGateway } from "./whatsapp.gateway";
import axios from "axios";

@Injectable()
export class WhatsappService {
  constructor(
    private prisma: PrismaService,
    private gateway: WhatsappGateway
  ) {}

  async getConversations(companyId: string, status?: string) {
    return this.prisma.whatsappConversation.findMany({
      where: {
        instance: { companyId },
        ...(status && { status }),
      },
      include: {
        messages: { orderBy: { timestamp: "desc" }, take: 1 },
        lead: { select: { id: true, name: true, score: true } },
      },
      orderBy: { lastMessageAt: "desc" },
    });
  }

  async getMessages(conversationId: string) {
    return this.prisma.whatsappMessage.findMany({
      where: { conversationId },
      orderBy: { timestamp: "asc" },
      take: 100,
    });
  }

  async sendMessage(conversationId: string, text: string, senderId: string, companyId: string) {
    const conversation = await this.prisma.whatsappConversation.findFirst({
      where: { id: conversationId, instance: { companyId } },
      include: { instance: true },
    });
    if (!conversation) throw new NotFoundException("Conversa não encontrada");

    // Envia via Evolution API
    if (conversation.instance.apiUrl && conversation.instance.apiKey) {
      await axios.post(
        `${conversation.instance.apiUrl}/message/sendText/${conversation.instance.name}`,
        { number: conversation.remoteJid, text },
        { headers: { apikey: conversation.instance.apiKey } }
      ).catch(() => null);
    }

    const message = await this.prisma.whatsappMessage.create({
      data: {
        conversationId,
        content: text,
        fromMe: true,
        type: "text",
        status: "sent",
        senderId,
      },
    });

    await this.prisma.whatsappConversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    });

    this.gateway.emitNewMessage(companyId, message);
    return message;
  }

  async handleWebhook(payload: any) {
    const { instance, data, event } = payload;
    if (event !== "messages.upsert") return;

    const inst = await this.prisma.whatsappInstance.findFirst({ where: { name: instance } });
    if (!inst) return;

    const remoteJid = data.key.remoteJid;
    const fromMe = data.key.fromMe;
    const content = data.message?.conversation || data.message?.extendedTextMessage?.text || "";

    let conversation = await this.prisma.whatsappConversation.findUnique({
      where: { instanceId_remoteJid: { instanceId: inst.id, remoteJid } },
    });

    if (!conversation) {
      conversation = await this.prisma.whatsappConversation.create({
        data: { instanceId: inst.id, remoteJid, name: data.pushName || remoteJid, status: "open" },
      });
    }

    await this.prisma.whatsappMessage.create({
      data: {
        conversationId: conversation.id,
        messageId: data.key.id,
        content,
        fromMe,
        type: "text",
        status: "received",
        timestamp: new Date(data.messageTimestamp * 1000),
      },
    });

    await this.prisma.whatsappConversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        unread: fromMe ? 0 : { increment: 1 },
      },
    });

    this.gateway.emitConversationUpdate(inst.companyId, { conversationId: conversation.id });
  }

  async getInstances(companyId: string) {
    return this.prisma.whatsappInstance.findMany({ where: { companyId } });
  }

  async createInstance(companyId: string, name: string, apiUrl: string, apiKey: string) {
    return this.prisma.whatsappInstance.create({
      data: { companyId, name, apiUrl, apiKey },
    });
  }
}
