'use client'

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'
import { useLocale } from 'next-intl'

const chartConfig = {
  amount: {
    label: '',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

type Props = {
  data: { date: Date; amount: number }[]
}

export function RequestLogsChart({ data }: Props) {
  const locale = useLocale()

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const chartData = data.map((item) => ({
    ...item,
    dateTimestamp: item.date.getTime(),
    dateFormatted: formatDate(item.date),
  }))

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="dateTimestamp"
          type="number"
          scale="time"
          domain={['dataMin', 'dataMax']}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(timestamp) => formatDate(new Date(timestamp))}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{
            angle: -90,
            position: 'insideLeft',
            textAnchor: 'middle',
          }}
        />
        <Line
          dataKey="amount"
          type="natural"
          stroke="var(--color-amount)"
          strokeWidth={2}
          dot={{
            fill: 'var(--color-amount)',
            strokeWidth: 2,
            r: 4,
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}
