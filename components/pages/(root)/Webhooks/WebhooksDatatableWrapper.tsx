'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { DataTableBackendPaginated } from '@/components/shared/datatable/DataTableBackendPaginated'
import { DataTablePagination } from '@/components/shared/datatable/DataTablePagination'
import { ROUTES } from '@/constants/routes'
import type { RequestLog, Webhook } from '@prisma/client'
import { useTranslations } from 'next-intl'

type Data = Webhook & { requestLogs: RequestLog[] }

type Props = {
  data: Data[]
  page: number
  pageSize: number
  totalItems: number
}

export function WebhooksDataTableWrapper({
  data,
  page,
  pageSize,
  totalItems,
}: Props) {
  const router = useRouter()
  const t = useTranslations('WebhookPage.Datatable')

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: 'name',
      header: t('Name'),
    },
    {
      accessorKey: 'url',
      header: t('URL'),
    },
  ]

  const onClick = (row: Webhook) => {
    router.push(`/${ROUTES.WEBHOOKS}/${row.url}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTableBackendPaginated
        columns={columns}
        data={data}
        onClick={onClick}
      />
      <DataTablePagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
      />
    </div>
  )
}
