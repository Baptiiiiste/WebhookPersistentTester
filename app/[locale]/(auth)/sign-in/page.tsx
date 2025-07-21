import * as React from 'react'
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { credentialsAuthAction } from '@/lib/actions/auth/credentials-auth.action'
import { googleAuthAction } from '@/lib/actions/auth/google-auth.action'
import { SignInForm } from '@/components/pages/(auth)/sign-in/SignInForm'

export default function Page() {
  async function handleSignInCredentials(values: SignInSchema) {
    'use server'
    return credentialsAuthAction(values)
  }

  async function handleSignInGoogle() {
    'use server'
    return googleAuthAction()
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <div className="w-sm">
        <SignInForm
          action={handleSignInCredentials}
          googleAuthAction={handleSignInGoogle}
        />
      </div>
    </section>
  )
}
