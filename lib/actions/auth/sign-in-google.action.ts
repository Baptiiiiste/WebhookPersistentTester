'use server'

import { signIn } from '@/lib/auth/handlers'
import { ROUTES } from '@/constants/routes'

export async function signInGoogleAction() {
  await signIn('google', {
    redirect: true,
    callbackUrl: `/${ROUTES.DASHBOARD}`,
  })
}
