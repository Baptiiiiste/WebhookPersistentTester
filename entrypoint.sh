#!/usr/bin/env sh
set -e

echo "⏳ Waiting for database to be ready..."
until npx prisma db execute --stdin <<< "SELECT 1;" 2>/dev/null; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "✅ Database is ready!"

echo "🔧 Running prisma generate…"
npx prisma generate

echo "📦 Applying migrations (prisma migrate deploy)…"
npx prisma migrate deploy

echo "🚀 Starting app: $*"
exec "$@"