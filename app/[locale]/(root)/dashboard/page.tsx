import { PageLayout } from '@/components/shared/PageLayout'
import { PAGE_NAMES } from '@/constants/pages'
import { ICONS } from '@/constants/icons'
import DashboardInfoCard from '@/components/pages/(root)/Dashboard/DashboardInfoCard'
import { getTranslations } from 'next-intl/server'
import { Role } from '@prisma/client'
import { UpgradePlanButton } from '@/components/shared/button/UpgradePlanButton'
import { PLANS } from '@/constants/plans'
import { getLoggedUserAction } from '@/lib/actions/user/getLoggedUser.actions'

export default async function DashboardPage() {
  const t = await getTranslations('DashboardPage')
  const tConfig = await getTranslations('Configuration')
  const loggedUser = await getLoggedUserAction()

  return (
    <PageLayout.Root>
      <PageLayout.Icon icon={ICONS.DASHBOARD} color="#3b82f6" />

      <PageLayout.Title>{PAGE_NAMES.DASHBOARD}</PageLayout.Title>

      <PageLayout.Description>{t('Description')}</PageLayout.Description>

      <PageLayout.Content>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardInfoCard
            title={t('InfoCard.RequestsCount.Title')}
            description={t('InfoCard.RequestsCount.Description')}
            content={
              <div className="flex gap-4 items-end justify-between">
                {/*TODO: Replace data*/}
                <span className="font-bold text-2xl">
                  {loggedUser!.webhooks.reduce(
                    (sum, w) => sum + w._count.requestLogs,
                    0,
                  )}
                </span>
                <span className="text-gray-500">
                  /{PLANS[loggedUser!.role].maxRequests}
                </span>
              </div>
            }
          />

          <DashboardInfoCard
            title={t('InfoCard.WebhooksCount.Title')}
            description={t('InfoCard.WebhooksCount.Description')}
            content={
              <div className="flex gap-4 items-end justify-between">
                {/*TODO: Replace data*/}
                <span className="font-bold text-2xl">
                  {loggedUser!.webhooks.length}
                </span>
                <span className="text-gray-500">
                  /{PLANS[loggedUser!.role].maxWebhooks}
                </span>
              </div>
            }
          />

          <DashboardInfoCard
            title={t('InfoCard.Plan.Title')}
            description={t('InfoCard.Plan.Description')}
            content={
              loggedUser!.role === Role.FREE ? (
                <div className="flex justify-between items-center h-full">
                  <span className="text-2xl font-bold">
                    {tConfig(`Plans.${loggedUser!.role}`)}
                  </span>
                  <UpgradePlanButton size="icon" />
                </div>
              ) : (
                <span className="text-2xl font-bold">
                  {tConfig(`Plans.${loggedUser!.role}`)}
                </span>
              )
            }
          />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
