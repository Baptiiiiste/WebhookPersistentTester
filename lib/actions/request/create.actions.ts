import { getWebhookByUrlService } from '@/services/webhook/get-by-url'
import { PLANS } from '@/constants/plans'
import { createRequestLogService } from '@/services/request/create'
import { getAllWebhooksByUserIdService } from '@/services/webhook/get-all'
import { getUserByIdService } from '@/services/user/get-id'

type Data = {
  uuid: string
  method: string
  origin: string | null
  headers: string
  queryParams: string | null
  body: string | null
  ip: string | null
  userAgent: string | null
}

export async function createRequestLogAction(data: Data) {
  const webhook = await getWebhookByUrlService(data.uuid)
  if (!webhook) return 404

  const user = await getUserByIdService(webhook.userId)
  if (!user) return 404

  const webhooks = await getAllWebhooksByUserIdService({ userId: user.id })
  const requestLogsCount = webhooks.items.flatMap(
    (webhook) => webhook.requestLogs,
  ).length

  if (requestLogsCount >= PLANS[user!.role].maxRequests) return 403

  try {
    await createRequestLogService({ webhookId: webhook.id, ...data })
  } catch {
    return 500
  }

  return 200
}
