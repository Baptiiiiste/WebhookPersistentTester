'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { DataTableBackendPaginated } from '@/components/shared/datatable/DataTableBackendPaginated'
import { DataTablePagination } from '@/components/shared/datatable/DataTablePagination'
import type { RequestLog } from '@prisma/client'

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
  // const t = useTranslations('WebhookPage.Datatable')

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: 'method',
      header: 'method',
    },
    {
      accessorKey: 'origin',
      header: 'origin',
    },
    {
      accessorKey: 'ip',
      header: 'ip',
    }
    // {
    //   id: 'actions',
    //   header: '',
    //   cell: ({ row }) => (
    //     <div className="flex gap-2 justify-end">
    //       <DeleteConfirmationModal
    //         deleteId={row.original.id}
    //         action={deleteWebhookAction}
    //         description={t('DeleteMessage')}
    //       >
    //         <Button
    //           variant="destructive"
    //           size="icon"
    //           onClick={(e) => e.stopPropagation()}
    //         >
    //           <Trash2 className="size-4" />
    //         </Button>
    //       </DeleteConfirmationModal>
    //     </div>
    //   ),
    // },
  ]

  // const onClick = (row: RequestLog) => {
  // }

  return (
    <div className="flex flex-col gap-4">
      <DataTableBackendPaginated
        columns={columns}
        data={data}
        // onClick={onClick}
      />
      <DataTablePagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
      />
    </div>
  )
}
