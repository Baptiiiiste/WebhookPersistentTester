import { PageLayout } from '@/components/shared/PageLayout'
import { PAGE_NAMES } from '@/constants/pages'
import { ICONS } from '@/constants/icons'
import DashboardInfoCard from '@/components/pages/(root)/Dashboard/DashboardInfoCard'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/lib/auth/handlers'
import { Role } from '@prisma/client'
import { UpgradePlanButton } from '@/components/shared/button/UpgradePlanButton'
import { PLANS } from '@/constants/plans'

export default async function DashboardPage() {
  const t = await getTranslations('DashboardPage')
  const tConfig = await getTranslations('Configuration')
  const session = await auth()

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
                <span className="font-bold text-2xl">45</span>
                <span className="text-gray-500">
                  /{PLANS[session?.user.role || Role.FREE].maxRequests}
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
                <span className="font-bold text-2xl">7</span>
                <span className="text-gray-500">
                  /{PLANS[session?.user.role || Role.FREE].maxWebhooks}
                </span>
              </div>
            }
          />

          <DashboardInfoCard
            title={t('InfoCard.Plan.Title')}
            description={t('InfoCard.Plan.Description')}
            content={
              session?.user.role === Role.FREE ? (
                <div className="flex justify-between items-center h-full">
                  <span className="text-2xl font-bold">
                    {tConfig(`Plans.${session?.user.role}`)}
                  </span>
                  <UpgradePlanButton size="icon" />
                </div>
              ) : (
                <span className="text-2xl font-bold">
                  {tConfig(`Plans.${session?.user.role}`)}
                </span>
              )
            }
          />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
