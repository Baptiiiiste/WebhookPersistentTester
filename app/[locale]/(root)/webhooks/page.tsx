import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import { getTranslations } from 'next-intl/server'
import { WebhooksDataTableWrapper } from '@/components/pages/(root)/Webhooks/WebhooksDatatableWrapper'
import { getAllWebhooksForLoggedUserActions } from '@/lib/actions/webhook/getAllWebhooksForLoggedUser.actions'
import { getSearchParamNumber } from '@/lib/utils/searchParams'
import { deleteWebhookByIdActions } from '@/lib/actions/webhook/delete.actions'
import { WebhooksAmountProgression } from '@/components/pages/(root)/Webhooks/WebhooksAmountProgression'

type Props = {
  searchParams: Promise<{ page: string; size: string }>
}

export default async function WebhooksPage({ searchParams }: Props) {
  const t = await getTranslations('WebhookPage')
  const { page, size } = await searchParams
  const pageIndex = getSearchParamNumber(page, 0)
  const pageSize = getSearchParamNumber(size, 20)
  const webhooks = await getAllWebhooksForLoggedUserActions({
    pageIndex,
    pageSize,
  })

  const handleDelete = async (id: number) => {
    'use server'
    return deleteWebhookByIdActions(id)
  }

  return (
    <PageLayout.Root>
      <PageLayout.Icon icon={ICONS.WEBHOOKS} color="#F22222" />

      <PageLayout.Title>{t('Title')}</PageLayout.Title>

      <PageLayout.Description>{t('Description')}</PageLayout.Description>

      <PageLayout.Content className="flex flex-col gap-6">
        <WebhooksAmountProgression />

        <WebhooksDataTableWrapper
          data={webhooks.items}
          page={pageIndex}
          pageSize={pageSize}
          totalItems={webhooks.total}
          deleteWebhookAction={handleDelete}
        />
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
