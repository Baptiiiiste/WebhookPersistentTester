import { prisma } from '@/lib/prisma'

export function getAllWebhooksByUserIdService(userId: number) {
  return prisma.webhook.findMany({
    where: { userId },
    include: {
      requestLogs: true,
    },
  })
}
