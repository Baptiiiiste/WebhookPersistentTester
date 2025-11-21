import { PageLayout } from '@/components/shared/PageLayout'
import { PAGE_NAMES } from '@/constants/pages'
import { ICONS } from '@/constants/icons'
import { getTranslations } from 'next-intl/server'

export default async function PricingPage() {
  const t = await getTranslations('PricingPage')

  return (
    <PageLayout.Root>
      <PageLayout.Icon icon={ICONS.PRICING} color="#E39520" />

      <PageLayout.Title>{t('Title')}</PageLayout.Title>

      <PageLayout.Description>{t('Description')}</PageLayout.Description>

      <PageLayout.Content>{t('TODO')}</PageLayout.Content>
    </PageLayout.Root>
  )
}
