import { PLANS } from '@/constants/plans'
import { getAllWebhooksByUserIdService } from '@/services/webhook/get-all'
import { getLoggedUserAction } from '@/lib/actions/user/getLoggedUser.actions'
import { createWebhookService } from '@/services/webhook/create'

export async function createWebhookAction(name: string) {
  const user = await getLoggedUserAction()
  if (!user) {
    return 401
  }
  const userWebhooks = await getAllWebhooksByUserIdService({ userId: user.id })
  const userPlan = PLANS[user!.role]

  if (userWebhooks.size >= userPlan.maxWebhooks) {
    return 401
  }

  try {
    await createWebhookService(name, user.id)
  } catch {
    return 500
  }

  return 200
}
