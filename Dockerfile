# ===== Builder =====
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile
RUN npx prisma generate

COPY . .
RUN pnpm build

# ===== Runner =====
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

# Installer bash
RUN apk add --no-cache bash

# 1) Copier les fichiers de l'app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 2) Copier le schema Prisma
COPY --from=builder /app/prisma ./prisma

# 3) Installer les dépendances
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile

# 4) Générer le client Prisma
RUN npx prisma generate

# 5) Entrypoint
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["pnpm", "start"]