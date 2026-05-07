import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { WhatsappService } from "./whatsapp.service";
import { IsString, IsOptional } from "class-validator";

class SendMessageDto {
  @IsString() message: string;
}

class CreateInstanceDto {
  @IsString() name: string;
  @IsString() apiUrl: string;
  @IsString() apiKey: string;
}

@ApiTags("whatsapp")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("whatsapp")
export class WhatsappController {
  constructor(private whatsapp: WhatsappService) {}

  @Get("conversations")
  getConversations(@Request() req: any, @Query("status") status?: string) {
    return this.whatsapp.getConversations(req.user.companyId, status);
  }

  @Get("conversations/:id/messages")
  getMessages(@Param("id") id: string) {
    return this.whatsapp.getMessages(id);
  }

  @Post("conversations/:id/messages")
  sendMessage(@Param("id") id: string, @Body() dto: SendMessageDto, @Request() req: any) {
    return this.whatsapp.sendMessage(id, dto.message, req.user.sub, req.user.companyId);
  }

  @Get("instances")
  getInstances(@Request() req: any) {
    return this.whatsapp.getInstances(req.user.companyId);
  }

  @Post("instances")
  createInstance(@Body() dto: CreateInstanceDto, @Request() req: any) {
    return this.whatsapp.createInstance(req.user.companyId, dto.name, dto.apiUrl, dto.apiKey);
  }

  @Post("webhook")
  webhook(@Body() payload: any) {
    return this.whatsapp.handleWebhook(payload);
  }
}
