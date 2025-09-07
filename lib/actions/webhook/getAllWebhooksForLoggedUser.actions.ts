import { getAllWebhooksByUserIdService } from '@/services/webhook/get-all'
import { getLoggedUserAction } from '@/lib/actions/user/getLoggedUser.actions'
import type { Pagination } from '@/types/pagination'

export async function getAllWebhooksForLoggedUserActions({
  pageIndex,
  pageSize,
}: Pagination = {}) {
  const loggedUser = await getLoggedUserAction()
  return getAllWebhooksByUserIdService({
    userId: loggedUser!.id,
    pageIndex,
    pageSize,
  })
}
