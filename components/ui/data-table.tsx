import type {
  ColumnDef,
  Row,
  Table as TanstackTable,
} from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type CSSProperties } from 'react'

interface DataTablePaginationProps<TData, TValue> {
  table: TanstackTable<TData>
  columns: ColumnDef<TData, TValue>[]
  onClick?: (item: TData) => void
  rowStyle?: (item: Row<TData>) => CSSProperties
  cellStyle?: (cellId: string, row: Row<TData>) => CSSProperties
}

export function DataTable<TData, TValue>({
  table,
  columns,
  onClick,
  rowStyle,
  cellStyle,
}: DataTablePaginationProps<TData, TValue>) {
  return (
    <div className="overflow-hidden rounded-md border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={onClick ? () => onClick(row.original) : undefined}
                className={onClick ? 'cursor-pointer' : ''}
                style={rowStyle?.(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={cellStyle?.(cell.id, row)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucun résultat
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
