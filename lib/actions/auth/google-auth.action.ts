'use server'

import { signIn } from '@/lib/auth/handlers'

export async function googleAuthAction() {
  await signIn('google', {
    redirect: true,
    callbackUrl: '/dashboard',
  })
}
