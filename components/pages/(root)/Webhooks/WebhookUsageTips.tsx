'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

type Props = {
  url: string
}

export function WebhookUsageTips({ url }: Props) {
  const t = useTranslations('WebhookPage.Usage')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        className="flex gap-2 text-muted-foreground text-sm hover:cursor-pointer"
        variant="link"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t('CurlIndication')}
        {isOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </Button>

      {isOpen && (
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          <code>
            {`curl -X POST ${url} \\
  -H "Content-Type: application/json" \\
  -d '{"event":"my_webhook_data","data":{"key1":"value1","key2":"value2"}}'`}
          </code>
        </pre>
      )}
    </>
  )
}
