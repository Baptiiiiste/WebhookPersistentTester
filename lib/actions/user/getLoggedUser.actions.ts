import { auth } from '@/lib/auth/handlers'
import { getLoggedUserService } from '@/services/user/get-logged'

export async function getLoggedUserAction() {
  const session = await auth()
  if (!session) throw new Error('Unauthenticated')
  return getLoggedUserService(session)
}
