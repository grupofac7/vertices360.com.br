import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LeadsService } from "./leads.service";
import { IsString, IsEmail, IsOptional, IsNumber, IsEnum, IsArray } from "class-validator";
import { Transform, Type } from "class-transformer";

class CreateLeadDto {
  @IsString() name: string;
  @IsString() phone: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() source?: string;
  @IsOptional() @IsString() interest?: string;
  @IsOptional() @Type(() => Number) @IsNumber() value?: number;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() ownerId?: string;
  @IsOptional() @IsArray() tags?: string[];
}

class UpdateLeadDto extends CreateLeadDto {
  @IsOptional() @IsString() status?: string;
}

@ApiTags("leads")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("leads")
export class LeadsController {
  constructor(private leads: LeadsService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query("status") status?: string,
    @Query("source") source?: string,
    @Query("ownerId") ownerId?: string,
    @Query("search") search?: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ) {
    return this.leads.findAll({ companyId: req.user.companyId, status, source, ownerId, search, page, limit });
  }

  @Get("stats")
  getStats(@Request() req: any) {
    return this.leads.getStats(req.user.companyId);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Request() req: any) {
    return this.leads.findOne(id, req.user.companyId);
  }

  @Post()
  create(@Body() dto: CreateLeadDto, @Request() req: any) {
    return this.leads.create({
      ...dto,
      company: { connect: { id: req.user.companyId } },
      ...(dto.ownerId && { owner: { connect: { id: dto.ownerId } } }),
    } as any);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateLeadDto, @Request() req: any) {
    return this.leads.update(id, req.user.companyId, dto as any);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req: any) {
    return this.leads.remove(id, req.user.companyId);
  }
}
