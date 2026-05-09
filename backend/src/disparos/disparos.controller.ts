import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from "@nestjs/common";
import { DisparosService } from "./disparos.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("disparos")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("disparos")
export class DisparosController {
  constructor(private service: DisparosService) {}

  @Get("stats")
  stats(@Request() req: any) {
    return this.service.getStats(req.user.companyId);
  }

  @Get("campanhas")
  list(@Request() req: any) {
    return this.service.getCampaigns(req.user.companyId);
  }

  @Get("campanhas/:id")
  findOne(@Param("id") id: string, @Request() req: any) {
    return this.service.getCampaign(id, req.user.companyId);
  }

  @Post("campanhas")
  create(@Body() body: any, @Request() req: any) {
    return this.service.createCampaign({
      ...body,
      companyId: req.user.companyId,
      createdBy: req.user.userId,
    });
  }

  @Post("campanhas/:id/start")
  start(@Param("id") id: string, @Request() req: any) {
    return this.service.startCampaign(id, req.user.companyId);
  }

  @Post("campanhas/:id/pause")
  pause(@Param("id") id: string, @Request() req: any) {
    return this.service.pauseCampaign(id, req.user.companyId);
  }

  @Delete("campanhas/:id")
  remove(@Param("id") id: string, @Request() req: any) {
    return this.service.deleteCampaign(id, req.user.companyId);
  }

  @Get("templates")
  listTemplates(@Request() req: any) {
    return this.service.getTemplates(req.user.companyId);
  }

  @Post("templates")
  createTemplate(@Body() body: { name: string; message: string }, @Request() req: any) {
    return this.service.createTemplate(req.user.companyId, body.name, body.message);
  }
}
