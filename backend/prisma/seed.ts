import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Empresa
  const company = await prisma.company.upsert({
    where: { cnpj: "00.000.000/0001-00" },
    update: {},
    create: {
      name: "FlowCRM Demo",
      cnpj: "00.000.000/0001-00",
      email: "contato@flowcrm.com",
      phone: "(11) 3000-0000",
      website: "https://flowcrm.com",
      plan: "enterprise",
    },
  });

  // Admin
  const adminPw = await bcrypt.hash("123456", 12);
  const admin = await prisma.user.upsert({
    where: { email_companyId: { email: "admin@flowcrm.com", companyId: company.id } },
    update: {},
    create: {
      name: "Admin Master",
      email: "admin@flowcrm.com",
      password: adminPw,
      role: "ADMIN",
      companyId: company.id,
    },
  });

  // Vendedores
  const vendors = [
    { name: "Carlos Silva", email: "carlos@flowcrm.com" },
    { name: "Ana Lima", email: "ana@flowcrm.com" },
    { name: "Pedro Santos", email: "pedro@flowcrm.com" },
    { name: "Juliana Costa", email: "juliana@flowcrm.com" },
  ];

  const vendorUsers = await Promise.all(
    vendors.map((v) =>
      prisma.user.upsert({
        where: { email_companyId: { email: v.email, companyId: company.id } },
        update: {},
        create: { ...v, password: adminPw, role: "SELLER", companyId: company.id },
      })
    )
  );

  // Leads
  const leadData = [
    { name: "Roberto Almeida", phone: "11987654321", email: "roberto@empresa.com", city: "São Paulo", source: "META_ADS", value: 12000, score: 92, status: "QUALIFIED" },
    { name: "Fernanda Souza", phone: "21976543210", email: "fernanda@tech.com", city: "Rio de Janeiro", source: "WHATSAPP", value: 28000, score: 85, status: "PROPOSAL" },
    { name: "Marcelo Costa", phone: "11965432109", email: "marcelo@startup.com", city: "São Paulo", source: "LANDING_PAGE", value: 8500, score: 61, status: "NEW" },
    { name: "Patricia Lima", phone: "31954321098", email: "patricia@corp.com", city: "Belo Horizonte", source: "REFERRAL", value: 45000, score: 97, status: "NEGOTIATION" },
    { name: "Lucas Ferreira", phone: "11943210987", email: "lucas@digital.com", city: "São Paulo", source: "GOOGLE_ADS", value: 19500, score: 74, status: "CONTACTED" },
  ];

  for (const [i, ld] of leadData.entries()) {
    await prisma.lead.upsert({
      where: { id: `seed_lead_${i + 1}` },
      update: {},
      create: {
        id: `seed_lead_${i + 1}`,
        ...ld as any,
        companyId: company.id,
        ownerId: vendorUsers[i % vendorUsers.length].id,
      },
    });
  }

  console.log("✅ Seed completed!");
  console.log(`📧 Login: admin@flowcrm.com | Senha: 123456`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
