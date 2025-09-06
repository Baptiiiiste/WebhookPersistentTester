import { PageLayout } from '@/components/shared/PageLayout'
import { PAGE_NAMES } from '@/constants/pages'
import { ICONS } from '@/constants/icons'
import { getTranslations } from 'next-intl/server'

export default async function WebhooksPage() {
  const t = await getTranslations('WebhookPage')

  return (
    <PageLayout.Root>
      <PageLayout.Icon icon={ICONS.WEBHOOKS} color="#F22222" />

      <PageLayout.Title>{PAGE_NAMES.WEBHOOKS}</PageLayout.Title>

      <PageLayout.Description>{t('Description')}</PageLayout.Description>

      <PageLayout.Content>TODO</PageLayout.Content>
    </PageLayout.Root>
  )
}
