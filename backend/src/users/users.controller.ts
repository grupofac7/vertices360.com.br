import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import { IsString, IsEmail, MinLength, IsOptional } from "class-validator";

class CreateUserDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsOptional() @IsString() role?: string;
}

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.users.findAll(req.user.companyId);
  }

  @Post()
  create(@Body() dto: CreateUserDto, @Request() req: any) {
    return this.users.create(req.user.companyId, dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.users.update(id, body);
  }

  @Delete(":id")
  deactivate(@Param("id") id: string) {
    return this.users.deactivate(id);
  }
}
