import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async login(email: string, password: string, companyId?: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, active: true },
      include: { company: { select: { id: true, name: true, plan: true } } },
    });

    if (!user) throw new UnauthorizedException("Credenciais inválidas");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException("Credenciais inválidas");

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const payload = { sub: user.id, email: user.email, role: user.role, companyId: user.companyId };
    const token = this.jwt.sign(payload);

    const { password: _pw, twoFaSecret: _secret, ...userWithoutSensitive } = user;

    return { token, user: userWithoutSensitive };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, name: true, email: true, role: true, avatar: true,
        company: { select: { id: true, name: true, plan: true } },
      },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
