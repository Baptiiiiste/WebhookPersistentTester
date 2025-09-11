import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { RequestLog, Webhook } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LinkIcon } from 'lucide-react'
import { Link } from '@/lib/i18n/navigation'

type Props = {
  webhooks: (Webhook & { requestLogs: RequestLog[] })[]
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
          <div>
            {webhooks.map((webhook) => (
              <Link href={`/webhooks/${webhook.url}`} key={webhook.id}>
                <Card className="hover:bg-muted/50 transition-all duration-200 hover:shadow-sm mb-2">
                  <CardContent>
                    <div className="font-medium mb-1 text-sm">
                      {webhook.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <LinkIcon className="w-3 h-3" />
                      <span className="truncate">{webhook.url}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
