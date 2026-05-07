import { Controller, Get, Patch, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CompaniesService } from "./companies.service";

@ApiTags("companies")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("companies")
export class CompaniesController {
  constructor(private companies: CompaniesService) {}

  @Get("me")
  getMyCompany(@Request() req: any) {
    return this.companies.findOne(req.user.companyId);
  }

  @Patch("me")
  updateMyCompany(@Request() req: any, @Body() body: any) {
    return this.companies.update(req.user.companyId, body);
  }
}
