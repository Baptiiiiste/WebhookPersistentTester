'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { DataTableBackendPaginated } from '@/components/shared/datatable/DataTableBackendPaginated'
import { DataTablePagination } from '@/components/shared/datatable/DataTablePagination'
import { ROUTES } from '@/constants/routes'
import type { RequestLog, Webhook } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { Trash2 } from 'lucide-react'
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal'
import { Button } from '@/components/ui/button'

type Data = Webhook & { requestLogs: RequestLog[] }

type Props = {
  data: Data[]
  page: number
  pageSize: number
  totalItems: number
  deleteWebhookAction: (
    id: number,
  ) => Promise<{ error: string; message: string } | undefined>
}

export function WebhooksDataTableWrapper({
  data,
  page,
  pageSize,
  totalItems,
  deleteWebhookAction,
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
    {
      id: 'requestsCount',
      header: t('RequestsCount'),
      accessorFn: (row) => row.requestLogs.length,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <DeleteConfirmationModal
            deleteId={row.original.id}
            action={deleteWebhookAction}
            description={t('DeleteMessage')}
          >
            <Button
              variant="destructive"
              size="icon"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="size-4" />
            </Button>
          </DeleteConfirmationModal>
        </div>
      ),
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
