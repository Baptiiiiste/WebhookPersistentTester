'use client'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CustomInput } from '@/components/shared/form/inputs/CustomInput'
import { Form, FormRootError } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import type { SignUpSchema } from '@/lib/schemas/auth.schema'
import { signUpSchema } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormAction } from '@/hooks/useFormAction'
import type { FormActionCallback } from '@/types/form'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'
import { signInGoogleAction } from '@/lib/actions/auth/sign-in-google.action'
import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import { SubmitButton } from '@/components/shared/form/SubmitButton'
import { ENABLED_AUTH_PROVIDERS } from '@/constants/auth'

interface Props {
  action: FormActionCallback<SignUpSchema>
  googleAuthAction: any
}

export function SignUpForm({ action }: Props) {
  const t = useTranslations('Auth.SignUpPage')

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = useFormAction(form, action)

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('Title')}</CardTitle>
          <CardDescription>{t('Subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <CustomInput
                    control={form.control}
                    name="username"
                    label={t('Form.Username')}
                    placeholder="John"
                    disabled={
                      form.formState.isSubmitting ||
                      !ENABLED_AUTH_PROVIDERS.CREDENTIALS
                    }
                    inputProps={{
                      autoComplete: 'name',
                      autoCorrect: 'off',
                    }}
                  />
                  <CustomInput
                    control={form.control}
                    name="email"
                    label={t('Form.Email')}
                    placeholder="john@doe.com"
                    disabled={
                      form.formState.isSubmitting ||
                      !ENABLED_AUTH_PROVIDERS.CREDENTIALS
                    }
                    inputProps={{
                      autoCapitalize: 'none',
                      autoComplete: 'email',
                      autoCorrect: 'off',
                    }}
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label={t('Form.Password')}
                    placeholder="••••••••••••"
                    type="password"
                    disabled={
                      form.formState.isSubmitting ||
                      !ENABLED_AUTH_PROVIDERS.CREDENTIALS
                    }
                    inputProps={{
                      autoComplete: 'current-password',
                      autoCorrect: 'off',
                    }}
                  />
                  <FormRootError />
                  <SubmitButton
                    isSubmitting={form.formState.isSubmitting}
                    className="mt-4"
                    disabled={!ENABLED_AUTH_PROVIDERS.CREDENTIALS}
                  >
                    {t('Form.Submit')}
                  </SubmitButton>
                </div>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    {t('Methods.Other')}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(event) => {
                      event.preventDefault()
                      signInGoogleAction()
                    }}
                    disabled={!ENABLED_AUTH_PROVIDERS.GOOGLE}
                  >
                    <Image
                      src={IMAGES.GOOGLE_ICON}
                      alt="Google Icon"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    {t('Methods.Google')}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(event) => {
                      event.preventDefault()
                      // TODO: Implement GitHub OAuth
                    }}
                    disabled={!ENABLED_AUTH_PROVIDERS.GITHUB}
                  >
                    <Image
                      src={IMAGES.GITHUB_ICON}
                      alt="Github Icon"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    {t('Methods.Github')}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  {t('Footer.AlreadyHaveAccount')}
                  <Link
                    href={`/${ROUTES.SIGN_IN}`}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {t('Footer.SignIn')}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
