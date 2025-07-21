import * as React from 'react'
import type { SignUpSchema } from '@/lib/schemas/auth.schema'
import { signInGoogleAction } from '@/lib/actions/auth/sign-in-google.action'
import { SignUpForm } from '@/components/pages/(auth)/sign-up/SignUpForm'
import { signUpCredentialsAction } from '@/lib/actions/auth/sign-up-credentials.action'

export default function Page() {
  async function handleSignUpCredentials(values: SignUpSchema) {
    'use server'
    return signUpCredentialsAction(values)
  }

  async function handleSignInGoogle() {
    'use server'
    return signInGoogleAction()
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <div className="w-sm">
        <SignUpForm
          action={handleSignUpCredentials}
          googleAuthAction={handleSignInGoogle}
        />
      </div>
    </section>
  )
}
