'use server'

import { prisma } from '@/lib/prisma'

export async function deleteWebhookService(id: number) {
  return prisma.webhook.delete({
    where: { id },
  })
}
