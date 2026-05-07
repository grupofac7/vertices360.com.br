import { Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string) {
    return this.prisma.user.findMany({
      where: { companyId, active: true },
      select: { id: true, name: true, email: true, role: true, avatar: true, lastLogin: true, createdAt: true },
    });
  }

  async create(companyId: string, data: { name: string; email: string; password: string; role?: string }) {
    const exists = await this.prisma.user.findFirst({ where: { email: data.email, companyId } });
    if (exists) throw new ConflictException("E-mail já cadastrado");

    const hash = await bcrypt.hash(data.password, 12);
    return this.prisma.user.create({
      data: { ...data, password: hash, role: (data.role as any) || "SELLER", companyId },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async update(id: string, data: Partial<{ name: string; role: string; avatar: string }>) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deactivate(id: string) {
    return this.prisma.user.update({ where: { id }, data: { active: false } });
  }
}
