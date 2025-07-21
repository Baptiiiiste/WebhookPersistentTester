import * as React from 'react'
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { signInCredentialsAction } from '@/lib/actions/auth/sign-in-credentials.action'
import { signInGoogleAction } from '@/lib/actions/auth/sign-in-google.action'
import { SignInForm } from '@/components/pages/(auth)/sign-in/SignInForm'

export default function Page() {
  async function handleSignInCredentials(values: SignInSchema) {
    'use server'
    return signInCredentialsAction(values)
  }

  async function handleSignInGoogle() {
    'use server'
    return signInGoogleAction()
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
