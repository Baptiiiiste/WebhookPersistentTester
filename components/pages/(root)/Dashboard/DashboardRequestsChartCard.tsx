import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import type { RequestLog } from '@prisma/client'
import { RequestLogsChart } from '@/components/pages/(root)/Dashboard/RequestLogsChart'

type Props = {
  requestLogs: RequestLog[]
}

export async function DashbordRequestChartCard({ requestLogs }: Props) {
  const t = await getTranslations('DashboardPage.InfoCard.Requests')

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  const sortedData = requestLogs
    .filter((log) => new Date(log.createdAt) >= sevenDaysAgo)
    .map((log) => {
      const dateObj = new Date(log.createdAt)
      return new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
      )
    })
    .sort((a, b) => a.getTime() - b.getTime())
    .reduce(
      (acc, date) => {
        const existing = acc.find(
          (item) => item.date.getTime() === date.getTime(),
        )
        if (existing) {
          existing.amount++
        } else {
          acc.push({ date, amount: 1 })
        }
        return acc
      },
      [] as { date: Date; amount: number }[],
    )

  return (
    <Card className="flex flex-col h-full max-h-[calc(100vh-2rem)]">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{t('Title')}</CardTitle>
        <CardDescription>{t('Description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-0">
        <RequestLogsChart data={sortedData} />
      </CardContent>
    </Card>
  )
}
