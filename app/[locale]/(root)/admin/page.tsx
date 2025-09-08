import { PageLayout } from '@/components/shared/PageLayout'
import { PAGE_NAMES } from '@/constants/pages'
import { ICONS } from '@/constants/icons'
import { getTranslations } from 'next-intl/server'

export default async function AdminPage() {
  const t = await getTranslations('AdminPage')

  return (
    <PageLayout.Root>
      <PageLayout.Icon icon={ICONS.ADMIN} color="#B427F5" />

      <PageLayout.Title>{PAGE_NAMES.ADMIN}</PageLayout.Title>

      <PageLayout.Description>{t('Description')}</PageLayout.Description>

      <PageLayout.Content>TODO</PageLayout.Content>
    </PageLayout.Root>
  )
}
