import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { Input } from '@/components/ui/input'
import { WebhookUsageTips } from '@/components/pages/(root)/Webhooks/WebhookUsageTips'

type Props = {
  url: string
}

export async function WebhookUsageCard({ url }: Props) {
  const t = await getTranslations('WebhookPage.Usage')
  const API_URL = process.env.API_URL + '/' + url

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('Title')}</CardTitle>
          <CardDescription>{t('Description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input value={API_URL} readOnly />
          <WebhookUsageTips url={API_URL} />
        </CardContent>
      </Card>
    </>
  )
}
