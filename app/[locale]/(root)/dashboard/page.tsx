import { PageLayout } from '@/components/shared/PageLayout'
import { PAGE_NAMES } from '@/constants/pages'
import { ICONS } from '@/constants/icons'
import DashboardInfoCard from '@/components/pages/(root)/Dashboard/DashboardInfoCard'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/lib/auth/handlers'
import { Role } from '@prisma/client'
import { UpgradePlanButton } from '@/components/shared/button/UpgradePlanButton'

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
              // TODO: Replace Data
              '45/50'
            }
          />

          <DashboardInfoCard
            title={t('InfoCard.WebhooksCount.Title')}
            description={t('InfoCard.WebhooksCount.Description')}
            content={
              // TODO: Replace Data
              '1/1'
            }
          />

          <DashboardInfoCard
            title={t('InfoCard.Plan.Title')}
            description={t('InfoCard.Plan.Description')}
            content={
              session?.user.role === Role.FREE ? (
                <div className="flex justify-between items-center">
                  {tConfig(`Plans.${session?.user.role}`)}
                  <UpgradePlanButton size="icon" />
                </div>
              ) : (
                tConfig(`Plans.${session?.user.role}`)
              )
            }
          />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
