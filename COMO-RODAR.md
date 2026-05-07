# Como Rodar o FlowCRM

## 1. Instale o Node.js

Acesse https://nodejs.org e baixe a versão LTS (20.x).

Ou via Homebrew:
```bash
brew install node
```

## 2. Instale o Docker Desktop

Acesse https://www.docker.com/products/docker-desktop

## 3. Configure e rode

```bash
cd /Users/fabioalves/crm

# Sobe banco de dados
docker-compose up postgres redis -d

# Backend
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npx ts-node prisma/seed.ts
npm run start:dev
# Rodando em http://localhost:3001

# Frontend (em outro terminal)
cd ../frontend
npm install
npm run dev
# Rodando em http://localhost:3000
```

## 4. Acesse

Abra **http://localhost:3000**

- Email: `admin@flowcrm.com`
- Senha: `123456`

## 5. Produção (tudo junto)

```bash
docker-compose up -d
```

Acesse http://localhost
