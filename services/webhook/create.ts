import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export async function createWebhookService(name: string, userId: number) {
  const uuid = randomUUID()

  return prisma.webhook.create({
    data: {
      name,
      url: uuid,
      user: {
        connect: { id: userId },
      },
    },
  })
}