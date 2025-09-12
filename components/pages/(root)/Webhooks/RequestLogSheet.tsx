import type { PropsWithChildren } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { RequestLog } from '@prisma/client'
import { formatDate } from '@/lib/utils/formatDate'
import { CopyToClipboardButton } from '@/components/shared/button/CopyToClipboardButton'
import { useTranslations } from 'next-intl'

interface Props extends PropsWithChildren {
  request: RequestLog
}

export function RequestLogSheet({ request, children }: Props) {
  const t = useTranslations('RequestDetailSheet')

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[800px]">
        <SheetHeader>
          <SheetTitle>{t('Title', { requestId: request.id })}</SheetTitle>
          <SheetDescription>
            {formatDate(request.createdAt, true)} • {request.method}
          </SheetDescription>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {t('GlobalInfo.Title')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {request.ip && (
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t('GlobalInfo.Ip')}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-muted px-2 py-1 rounded text-xs whitespace-pre-wrap break-all">
                        {request.ip}
                      </code>
                    </div>
                  </div>
                )}
                {request.contentLength !== null && (
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t('GlobalInfo.Size')}
                    </span>
                    <div className="mt-1">
                      <code className="bg-muted px-2 py-1 rounded text-xs whitespace-pre-wrap break-all">
                        {((request.contentLength ?? 0) / 1024).toFixed(1)}KB
                      </code>
                    </div>
                  </div>
                )}
                {request.origin && (
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t('GlobalInfo.Origin')}
                    </span>
                    <div className="mt-1">
                      <code className="bg-muted px-2 py-1 rounded text-xs truncate max-w-32 whitespace-pre-wrap break-all">
                        {request.origin}
                      </code>
                    </div>
                  </div>
                )}
                {request.userAgent && (
                  <div className="col-span-2">
                    <span className="font-medium text-muted-foreground">
                      {t('GlobalInfo.UserAgent')}
                    </span>
                    <div className="mt-1">
                      <code className="bg-muted px-2 py-1 rounded text-xs truncate max-w-32 whitespace-pre-wrap break-all">
                        {request.userAgent}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {request.headers && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{t('Headers')}</h3>
                  <CopyToClipboardButton
                    text={JSON.stringify(request.headers)}
                  />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs whitespace-pre-wrap break-all">
                    {JSON.stringify(request.headers, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {request.queryParams && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{t('QueryParams')}</h3>
                  <CopyToClipboardButton
                    text={JSON.stringify(request.queryParams)}
                  />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs whitespace-pre-wrap break-all">
                    {JSON.stringify(request.queryParams, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {request.body && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{t('Body')}</h3>
                  <CopyToClipboardButton text={JSON.stringify(request.body)} />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs whitespace-pre-wrap break-all">
                    {JSON.stringify(request.body, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
