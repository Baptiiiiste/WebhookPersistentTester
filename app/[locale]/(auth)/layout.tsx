import type { PropsWithChildren } from 'react'
import { SITENAME } from '@/constants/globals'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { IMAGES } from '@/constants/images'
import { Link } from '@/lib/i18n/navigation'
import { ROUTES } from '@/constants/routes'

export default function AuthLayout({ children }: PropsWithChildren) {
  const t = useTranslations('Auth')

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Image src={IMAGES.LOGO} alt="Logo" width={48} height={48} />
          {SITENAME}
        </div>
        {children}
        <div className="text-muted-foreground text-center text-xs text-balance ">
          {t('Footer.Title')}
          <div className="*:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
            {/*TODO: Change routes*/}
            <Link href={'/' + ROUTES.ROOT}>{t('Footer.Terms')}</Link>
            {t('Footer.AndConditions')}
            <Link href={'/' + ROUTES.ROOT}>{t('Footer.Privacy')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
