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
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { signInSchema } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormAction } from '@/hooks/useFormAction'
import type { FormActionCallback } from '@/types/form'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'
import { googleAuthAction } from '@/lib/actions/auth/google-auth.action'
import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import { SubmitButton } from '@/components/shared/form/SubmitButton'

interface Props {
  action: FormActionCallback<SignInSchema>
  googleAuthAction: any
}

export function SignInForm({ action }: Props) {
  const t = useTranslations('Auth.SignInPage')

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
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(event) => {
                      event.preventDefault()
                      googleAuthAction()
                    }}
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
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    {t('Methods.Email')}
                  </span>
                </div>
                <div className="grid gap-6">
                  <CustomInput
                    control={form.control}
                    name="email"
                    label={t('Form.Email')}
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
                    label={t('Form.Password')}
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
                    {t('Form.Submit')}
                  </SubmitButton>
                </div>
                <div className="text-center text-sm">
                  {t('Footer.NoAccount')}
                  <Link
                    href={`/${ROUTES.SIGN_UP}`}
                    className="underline underline-offset-4"
                  >
                    {t('Footer.SignUp')}
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
