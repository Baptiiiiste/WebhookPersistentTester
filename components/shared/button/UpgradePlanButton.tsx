import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { ICONS } from '@/constants/icons'
import { useTranslations } from 'next-intl'

type Props = {
  size?: 'icon' | 'default'
}

export function UpgradePlanButton({ size = 'default' }: Props) {
  const t = useTranslations('Configuration.Plans')
  const isIcon = size === 'icon'

  return (
    <Button variant="default" asChild size={isIcon ? 'icon' : 'default'}>
      <Link href={`/${ROUTES.PRICING}`}>
        <ICONS.UPGRADE className={isIcon ? 'size-4' : 'mr-2 size-4'} />
        {!isIcon && t('Upgrade')}
      </Link>
    </Button>
  )
}
