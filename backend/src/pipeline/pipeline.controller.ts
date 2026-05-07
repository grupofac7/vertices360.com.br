import { Controller, Get, Patch, Param, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PipelineService } from "./pipeline.service";
import { IsString } from "class-validator";

class MoveStageDto {
  @IsString() stageId: string;
}

@ApiTags("pipeline")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("pipeline")
export class PipelineController {
  constructor(private pipeline: PipelineService) {}

  @Get()
  getBoard(@Request() req: any) {
    return this.pipeline.getBoard(req.user.companyId);
  }

  @Patch(":leadId/stage")
  moveStage(@Param("leadId") leadId: string, @Body() dto: MoveStageDto, @Request() req: any) {
    return this.pipeline.moveStage(leadId, req.user.companyId, dto.stageId, req.user.sub);
  }
}
