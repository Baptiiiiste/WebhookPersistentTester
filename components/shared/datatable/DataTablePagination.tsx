'use client'

import type { ReadonlyURLSearchParams } from 'next/navigation'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

type Props = {
  page: number
  pageSize: number
  totalItems: number
  sizes?: number[]
}

function getParams(
  params: ReadonlyURLSearchParams,
  parameterName: string,
  value: string,
): string {
  const newParams = new URLSearchParams(params)
  newParams.set(parameterName, value)
  return `?${newParams.toString()}`
}

export function DataTablePagination({
  page,
  pageSize,
  totalItems,
  sizes = [10, 20, 30, 50, 100],
}: Props) {
  const params = useSearchParams()
  const router = useRouter()
  const t = useTranslations('Datatable')

  const previousPage = page <= 0 ? 0 : page - 1
  const lastPage =
    pageSize !== 0 ? Math.max(Math.ceil(totalItems / pageSize) - 1, 0) : 0
  const nextPage = page >= lastPage ? lastPage : page + 1

  const canGoNext = page < lastPage
  const canGoPrevious = page > 0
  const canGoFirst = page > 0
  const canGoLast = page < lastPage

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">
        {t('Amount', { count: totalItems })}
      </p>
      <div className="flex items-center space-x-6 px-2 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t('LinesPerPage')}</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newParams = new URLSearchParams(params)
              newParams.set('page', '0')
              newParams.set('size', value)
              router.push(`?${newParams.toString()}`)
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {sizes.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm font-medium">
          {t('PageNumber', { page: page + 1, pages: lastPage + 1 })}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            disabled={!canGoFirst}
            asChild
          >
            <Link href={getParams(params, 'page', '0')}>
              <ChevronsLeftIcon className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            disabled={!canGoPrevious}
            asChild
          >
            <Link href={getParams(params, 'page', previousPage.toString())}>
              <ChevronLeftIcon className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            disabled={!canGoNext}
            asChild
          >
            <Link href={getParams(params, 'page', nextPage.toString())}>
              <ChevronRightIcon className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            disabled={!canGoLast}
            asChild
          >
            <Link href={getParams(params, 'page', lastPage.toString())}>
              <ChevronsRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
