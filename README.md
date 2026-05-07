# FlowCRM — CRM Completo e Escalável

CRM moderno com gestão de leads, pipeline, WhatsApp, financeiro e mais.

## Stack

**Frontend:** Next.js 14 · TypeScript · Tailwind CSS · Shadcn/UI · Framer Motion · DnD Kit

**Backend:** NestJS · TypeScript · Prisma ORM · PostgreSQL · Redis · WebSockets

**Infra:** Docker · NGINX · GitHub Actions

---

## Início Rápido

### 1. Subir banco de dados (Docker)

```bash
docker-compose up postgres redis -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
npm run start:dev
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Acesse: **http://localhost:3000**

Login demo: `admin@flowcrm.com` / `123456`

---

## Produção (Docker Compose)

```bash
docker-compose up -d
```

---

## Módulos

| Módulo | Descrição |
|--------|-----------|
| Dashboard | KPIs em tempo real, gráficos, ranking |
| Leads | Gestão completa com score e histórico |
| Pipeline | Kanban drag & drop com automações |
| WhatsApp | Chat multiagente com IA integrada |
| Clientes | Base de clientes com MRR e NPS |
| Financeiro | Receitas, despesas e fluxo de caixa |
| Equipe | Gestão de vendedores e metas |
| Relatórios | Analytics completos |
| Configurações | Integrações e personalização |

---

## API

Documentação: `http://localhost:3001/api/docs`

### Endpoints principais

```
POST   /api/auth/login
GET    /api/auth/me

GET    /api/leads
POST   /api/leads
PATCH  /api/leads/:id

GET    /api/pipeline
PATCH  /api/pipeline/:id/stage

GET    /api/whatsapp/conversations
POST   /api/whatsapp/conversations/:id/messages
POST   /api/whatsapp/webhook

GET    /api/dashboard/stats
GET    /api/dashboard/revenue
```

---

## Integrações

- **WhatsApp**: Evolution API (self-hosted) ou API Oficial Meta
- **Meta Ads**: Webhook para captura automática de leads
- **Google Ads**: Integração via webhook
