import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { PLANS } from '@/constants/plans'
import { getAllWebhooksForLoggedUserActions } from '@/lib/actions/webhook/getAllWebhooksForLoggedUser.actions'
import { getLoggedUserAction } from '@/lib/actions/user/getLoggedUser.actions'
import { getTranslations } from 'next-intl/server'

export async function WebhooksAmountProgression() {
  const loggedUser = await getLoggedUserAction()
  const webhooks = await getAllWebhooksForLoggedUserActions()
  const maxWebhooks = PLANS[loggedUser!.role].maxWebhooks
  const percentage = Math.min(
    Math.round((webhooks.total / maxWebhooks) * 100),
    100,
  )
  const t = await getTranslations('WebhookPage')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("MaxWebhooks")}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 items-center">
        <Progress value={percentage} className="h-3" />
        <div className="flex gap-2 items-center">
          <span className="font-bold text-2xl">{webhooks.total}</span>
          <div className="flex gap-1 items-center text-sm text-gray-500">
            <span>/</span>
            <span>{maxWebhooks}</span>
          </div>
        </div>
        <span className="text-sm">{percentage}%</span>
      </CardContent>
    </Card>
  )
}
