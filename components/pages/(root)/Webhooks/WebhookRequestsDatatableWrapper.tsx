'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { DataTableBackendPaginated } from '@/components/shared/datatable/DataTableBackendPaginated'
import { DataTablePagination } from '@/components/shared/datatable/DataTablePagination'
import type { RequestLog } from '@prisma/client'
import { RequestLogSheet } from '@/components/pages/(root)/Webhooks/RequestLogSheet'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

type Data = RequestLog

type Props = {
  data: Data[]
  page: number
  pageSize: number
  totalItems: number
  // deleteWebhookAction: (
  //   id: number,
  // ) => Promise<{ error: string; message: string } | undefined>
}

export function WebhookRequestsDataTableWrapper({
  data,
  page,
  pageSize,
  totalItems,
  // deleteWebhookAction,
}: Props) {
  // const router = useRouter()
  const t = useTranslations('WebhookPage.WebhookDetail.Datatable')
  const tCommon = useTranslations('Datatable')

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: 'method',
      header: t('Method'),
      cell: ({ row }) => (
        row.original.method ?? tCommon('NA')
      ),
    },
    {
      accessorKey: 'origin',
      header: t('Origin'),
      cell: ({ row }) => (
        row.original.origin ?? tCommon('NA')
      ),
    },
    {
      accessorKey: 'ip',
      header: t('Ip'),
      cell: ({ row }) => (
        row.original.ip ?? tCommon('NA')
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <RequestLogSheet request={row.original}>
            <Button variant="outline" size="icon">
              <Search/>
            </Button>
          </RequestLogSheet>
          {/*<DeleteConfirmationModal*/}
          {/*  deleteId={row.original.id}*/}
          {/*  action={deleteWebhookAction}*/}
          {/*  description={t('DeleteMessage')}*/}
          {/*>*/}
          {/*  <Button*/}
          {/*    variant="destructive"*/}
          {/*    size="icon"*/}
          {/*    onClick={(e) => e.stopPropagation()}*/}
          {/*  >*/}
          {/*    <Trash2 className="size-4" />*/}
          {/*  </Button>*/}
          {/*</DeleteConfirmationModal>*/}
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
