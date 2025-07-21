'use server'

import { ROUTES } from '@/constants/routes'
import { signIn } from '@/lib/auth/handlers'
import type { SignUpSchema } from '@/lib/schemas/auth.schema'
import { insertCredentialsService } from '@/services/auth/insert-credentials.service'

export async function signUpCredentialsAction(values: SignUpSchema) {
  try {
    await insertCredentialsService({
      email: values.email.toLowerCase(),
      username: values.username,
      password: values.password,
    })

    await signIn('credentials', {
      email: values.email.toLowerCase(),
      password: values.password,
      callbackUrl: `/${ROUTES.DASHBOARD}`,
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }

    if (error instanceof Error && error.message === 'email_already_exists') {
      return {
        error: 'email_already_exists',
        message: 'Un utilisateur avec cet email existe déjà',
      }
    }

    console.error(error)

    return {
      error: 'unknown',
      message: 'Une erreur est survenue, veuillez réessayer',
    }
  }
}
