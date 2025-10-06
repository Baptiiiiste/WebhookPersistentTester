#!/usr/bin/env sh
set -e

echo "🔧 Running prisma generate…"
npx prisma generate

echo "📦 Applying migrations (prisma migrate deploy)…"
npx prisma migrate deploy

echo "🚀 Starting app: $*"
exec "$@"
