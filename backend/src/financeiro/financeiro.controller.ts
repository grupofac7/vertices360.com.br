import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FinanceiroService } from "./financeiro.service";

@ApiTags("financeiro")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("financeiro")
export class FinanceiroController {
  constructor(private financeiro: FinanceiroService) {}

  @Get()
  getTransactions(@Query("type") type?: string, @Query("page") page?: number) {
    return this.financeiro.getTransactions({ type, page });
  }

  @Get("summary")
  getSummary() {
    return this.financeiro.getSummary();
  }

  @Post()
  create(@Body() body: any) {
    return this.financeiro.create(body);
  }
}
