'use server'

import { AuthError } from 'next-auth'
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { signIn } from '@/lib/auth/handlers'
import { ROUTES } from '@/constants/routes'

export async function signInCredentialsAction(values: SignInSchema) {
  try {
    await signIn('credentials', {
      email: values.email.toLowerCase(),
      password: values.password,
      callbackUrl: `/${ROUTES.DASHBOARD}`,
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }

    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return {
        error: 'invalid_credentials',
        message: 'Identifiants invalides',
      }
    }

    return {
      error: 'unknown',
      message: 'Une erreur est survenue, veuillez réessayer',
    }
  }
}
