#!/bin/bash
set -e

echo "🚀 Configurando FlowCRM..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js não encontrado. Instale em https://nodejs.org"
  exit 1
fi

# Verificar Docker
if ! command -v docker &> /dev/null; then
  echo "⚠️  Docker não encontrado. Subindo sem containers..."
else
  echo "📦 Subindo PostgreSQL e Redis via Docker..."
  docker-compose up postgres redis -d
  echo "⏳ Aguardando banco de dados..."
  sleep 5
fi

# Backend
echo "📡 Configurando Backend..."
cd backend
npm install --silent
npx prisma generate
npx prisma migrate dev --name init 2>/dev/null || npx prisma db push
npx ts-node prisma/seed.ts
cd ..

# Frontend
echo "🎨 Configurando Frontend..."
cd frontend
npm install --silent
cd ..

echo ""
echo "✅ FlowCRM configurado com sucesso!"
echo ""
echo "📌 Para iniciar:"
echo "   Backend:  cd backend && npm run start:dev"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Acesse: http://localhost:3000"
echo "📧 Login:   admin@flowcrm.com"
echo "🔑 Senha:   123456"
