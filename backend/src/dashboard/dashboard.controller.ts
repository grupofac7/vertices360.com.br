import { Controller, Get, Query, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DashboardService } from "./dashboard.service";

@ApiTags("dashboard")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("dashboard")
export class DashboardController {
  constructor(private dashboard: DashboardService) {}

  @Get("stats")
  getStats(@Request() req: any) {
    return this.dashboard.getStats(req.user.companyId);
  }

  @Get("revenue")
  getRevenue(@Request() req: any, @Query("period") period?: string) {
    return this.dashboard.getRevenue(req.user.companyId, period);
  }

  @Get("top-sellers")
  getTopSellers(@Request() req: any) {
    return this.dashboard.getTopSellers(req.user.companyId);
  }
}
