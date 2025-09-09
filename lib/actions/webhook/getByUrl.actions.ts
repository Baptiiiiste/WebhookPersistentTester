import { getWebhookByUrlService } from '@/services/webhook/get-by-url'

export async function getWebhookByUrlAction(url: string) {
  return getWebhookByUrlService(url)
}
