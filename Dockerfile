# Étape 1 : build
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Étape 2 : image finale propre
FROM node:22-alpine
WORKDIR /app
RUN npm install -g pnpm

# Copier les fichiers nécessaires
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Installer uniquement les dépendances de production
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]