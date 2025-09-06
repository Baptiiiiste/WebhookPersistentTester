import { prisma } from '@/lib/prisma'

export function getWebhookByIdService(id: number) {
  return prisma.webhook.findUnique({
    where: { id },
    include: {
      requestLogs: true,
    },
  })
}
