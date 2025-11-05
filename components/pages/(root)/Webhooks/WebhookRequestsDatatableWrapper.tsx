'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { DataTableBackendPaginated } from '@/components/shared/datatable/DataTableBackendPaginated'
import { DataTablePagination } from '@/components/shared/datatable/DataTablePagination'
import type { RequestLog } from '@prisma/client'
import { RequestLogSheet } from '@/components/pages/(root)/Webhooks/RequestLogSheet'
import { Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal'

type Data = RequestLog

type Props = {
  data: Data[]
  page: number
  pageSize: number
  totalItems: number
  deleteWebhookAction: (
    id: number,
  ) => Promise<{ error: string; message: string } | undefined>
}

export function WebhookRequestsDataTableWrapper({
  data,
  page,
  pageSize,
  totalItems,
  deleteWebhookAction,
}: Props) {
  const t = useTranslations()

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: 'method',
      header: t('WebhookPage.WebhookDetail.Datatable.Method'),
      cell: ({ row }) => row.original.method ?? t('Datatable.NA'),
    },
    {
      accessorKey: 'origin',
      header: t('WebhookPage.WebhookDetail.Datatable.Origin'),
      cell: ({ row }) => row.original.origin ?? t('Datatable.NA'),
    },
    {
      accessorKey: 'ip',
      header: t('WebhookPage.WebhookDetail.Datatable.Ip'),
      cell: ({ row }) => row.original.ip ?? t('Datatable.NA'),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <RequestLogSheet request={row.original}>
            <Button variant="outline" size="icon">
              <Search className="size-4" />
            </Button>
          </RequestLogSheet>
          <DeleteConfirmationModal
            deleteId={row.original.id}
            action={deleteWebhookAction}
            description={t('WebhookPage.WebhookDetail.Datatable.DeleteMessage')}
          >
            <Button variant="destructive" size="icon">
              <Trash2 className="size-4" />
            </Button>
          </DeleteConfirmationModal>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <DataTableBackendPaginated columns={columns} data={data} />
      <DataTablePagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
      />
    </div>
  )
}
