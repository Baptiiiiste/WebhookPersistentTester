import { prisma } from '@/lib/prisma'

type Data = {
  webhookId: number
  uuid: string
  method: string
  origin: string | null
  headers: string
  queryParams: string | null
  body: string | null
  ip: string | null
  userAgent: string | null
}

export async function createRequestLogService(data: Data) {
  return prisma.requestLog.create({
    data: {
      webhookId: data.webhookId,
      method: data.method,
      origin: data.origin,
      headers: JSON.parse(data.headers),
      queryParams: data.queryParams ? JSON.parse(data.queryParams) : null,
      body: data.body ? JSON.parse(data.body) : null,
      ip: data.ip,
      userAgent: data.userAgent,
    },
  })
}
