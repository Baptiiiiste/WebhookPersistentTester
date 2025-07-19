'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CustomInput } from '@/components/shared/form/inputs/CustomInput'
import { Form, FormRootError } from '@/components/ui/form'
import { SubmitButton } from '@/components/shared/form/SubmitButton'
import { useForm } from 'react-hook-form'
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { signInSchema } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormAction } from '@/hooks/useFormAction'
import type { FormActionCallback } from '@/types/form'
import { googleAuthAction } from '@/lib/actions/auth/google-auth.action'

interface Props {
  action: FormActionCallback<SignInSchema>
  googleAuthAction: any
}

export function SignInForm({ action }: Props) {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = useFormAction(form, action)

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(event) => {
                      event.preventDefault()
                      googleAuthAction()
                    }}
                  >
                    Login with Google
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Adresse email"
                    placeholder="user@example.com"
                    disabled={form.formState.isSubmitting}
                    inputProps={{
                      autoCapitalize: 'none',
                      autoComplete: 'email',
                      autoCorrect: 'off',
                    }}
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Mot de passe"
                    placeholder="••••••••••••"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    inputProps={{
                      autoComplete: 'current-password',
                      autoCorrect: 'off',
                    }}
                  />
                  <FormRootError />
                  <SubmitButton
                    isSubmitting={form.formState.isSubmitting}
                    className="mt-4"
                  >
                    Se connecter
                  </SubmitButton>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
