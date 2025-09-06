import { getAllWebhooksByUserIdService } from '@/services/webhook/get-all'
import { getLoggedUserAction } from '@/lib/actions/user/getLoggedUser.actions'

export async function getAllWebhooksForLoggedUserActions() {
  const loggedUser = await getLoggedUserAction()
  return getAllWebhooksByUserIdService(loggedUser!.id)
}
