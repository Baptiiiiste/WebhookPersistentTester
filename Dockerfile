# Étape 1 : build
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# 1) copier manifests + prisma avant l'install
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# 2) installer (postinstall => prisma generate si défini)
RUN pnpm install --frozen-lockfile

# 3) copier le reste
COPY . .

# 4) ceinture + bretelles : re-générer au cas où
RUN npx prisma generate

# 5) build Next
RUN pnpm build

# Étape 2 : image finale propre
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm

# récupérer le nécessaire
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# indispensable pour Prisma en prod
COPY --from=builder /app/node_modules ./node_modules
# (ou au minimum)
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# installer prod (pnpm va réutiliser le lock)
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]