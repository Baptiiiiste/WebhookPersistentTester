import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RequestLog, Webhook } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LinkIcon } from 'lucide-react'

type Props = {
  webhooks: (Webhook & {requestLogs: RequestLog[]})[]
}

export async function DashboardWebhooksCard({ webhooks }: Props) {
  const t = await getTranslations('DashboardPage.InfoCard.Webhooks')

  return (
    <Card className="flex flex-col h-full max-h-[calc(100vh-2rem)]">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{t('Title')}</CardTitle>
        <CardDescription>{t('Description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-2">
            {webhooks.map((webhook) => (
              <Card
                key={webhook.id}
                className="hover:bg-muted/50 transition-all duration-200 hover:shadow-sm"
              >
                <CardContent>
                  <div className="font-medium mb-1 text-sm">{webhook.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <LinkIcon className="w-3 h-3" />
                    <span className="truncate">{webhook.url}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
