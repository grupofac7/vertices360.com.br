import { Module } from "@nestjs/common";
import { DisparosService } from "./disparos.service";
import { DisparosController } from "./disparos.controller";
import { PrismaModule } from "../common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [DisparosController],
  providers: [DisparosService],
})
export class DisparosModule {}
