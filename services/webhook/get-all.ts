import { prisma } from '@/lib/prisma'
import type { Paginated } from '@/types/paginated'
import type { RequestLog, Webhook } from '@prisma/client'

interface Props {
  userId: number
  pageIndex?: number
  pageSize?: number
}

export async function getAllWebhooksByUserIdService({
  userId,
  pageIndex,
  pageSize,
}: Props): Promise<Paginated<Webhook & { requestLogs: RequestLog[] }>> {
  if (pageIndex === undefined || pageSize === undefined) {
    const [items, total] = await Promise.all([
      prisma.webhook.findMany({
        where: { userId },
        include: { requestLogs: true },
      }),
      prisma.webhook.count({ where: { userId } }),
    ])

    return {
      items,
      total,
      index: 0,
      size: total,
    }
  }

  const [items, total] = await Promise.all([
    prisma.webhook.findMany({
      where: { userId },
      include: { requestLogs: true },
      skip: pageIndex * pageSize,
      take: pageSize,
    }),
    prisma.webhook.count({ where: { userId } }),
  ])

  return {
    items,
    total,
    index: pageIndex,
    size: pageSize,
  }
}
