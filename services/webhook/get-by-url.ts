import { prisma } from '@/lib/prisma'

export function getWebhookByUrlService(url: string) {
  return prisma.webhook.findUnique({
    where: { url },
  })
}
