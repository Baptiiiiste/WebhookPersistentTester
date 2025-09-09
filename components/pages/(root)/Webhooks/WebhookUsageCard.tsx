import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { Input } from '@/components/ui/input'

type Props = {
  url: string
}

export async function WebhookUsageCard({ url }: Props) {
  const t = await getTranslations('WebhookPage.Usage')
  const API_URL = process.env.API_URL

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Title')}</CardTitle>
        <CardDescription>{t('Description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Input value={API_URL + '/' + url} readOnly />
      </CardContent>
    </Card>
  )
}
