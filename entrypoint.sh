#!/usr/bin/env sh
set -e

echo "=========================================="
echo "🔧 ENTRYPOINT START"
echo "=========================================="

echo "📍 Current directory: $(pwd)"
echo "📂 Contents:"
ls -la

echo ""
echo "⏳ Waiting for database to be ready..."
echo "DATABASE_URL: $DATABASE_URL"

max_attempts=30
attempt=0

until echo "SELECT 1;" | npx prisma db execute --stdin 2>/dev/null || [ $attempt -eq $max_attempts ]; do
  echo "⚠️  Database is unavailable - attempt $((attempt+1))/$max_attempts"
  attempt=$((attempt+1))
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ Database connection timeout after $max_attempts attempts"
  exit 1
fi

echo "✅ Database is ready!"

echo ""
echo "📦 Checking migrations..."
ls -la prisma/migrations/ || echo "⚠️  No migrations folder found"

echo ""
echo "📦 Applying migrations (prisma migrate deploy)..."
npx prisma migrate deploy || {
  echo "❌ Migration failed with exit code $?"
  exit 1
}

echo ""
echo "✅ Migrations applied successfully"
echo "=========================================="
echo "🚀 Starting app: $*"
echo "=========================================="

exec "$@"