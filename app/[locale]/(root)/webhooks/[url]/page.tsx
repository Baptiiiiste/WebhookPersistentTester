import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import { getSearchParamNumber } from '@/lib/utils/searchParams'
import { getWebhookByUrlAction } from '@/lib/actions/webhook/getByUrl.actions'
import { notFound } from 'next/navigation'
import { WebhookUsageCard } from '@/components/pages/(root)/Webhooks/WebhookUsageCard'
import { WebhookRequestsDataTableWrapper } from '@/components/pages/(root)/Webhooks/WebhookRequestsDatatableWrapper'

type Props = {
  params: Promise<{ url: string }>
  searchParams: Promise<{ page: string; size: string }>
}

export default async function WebhooksPage({ params, searchParams }: Props) {
  const { url } = await params
  const { page, size } = await searchParams
  const pageIndex = getSearchParamNumber(page, 0)
  const pageSize = getSearchParamNumber(size, 20)
  const webhook = await getWebhookByUrlAction(url)
  if (!webhook) notFound()

  // TODO: backend pagination for requests
  const requests = webhook.requestLogs

  return (
    <PageLayout.Root>
      <PageLayout.Icon icon={ICONS.WEBHOOKS} color="#F22222" />

      <PageLayout.Title>{webhook.name}</PageLayout.Title>

      <PageLayout.Description>{webhook.url}</PageLayout.Description>

      <PageLayout.Content className="flex flex-col gap-6">
        <WebhookUsageCard url={url} />
        <WebhookRequestsDataTableWrapper
          data={requests}
          page={pageIndex}
          pageSize={pageSize}
          totalItems={requests.length}
        />
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
