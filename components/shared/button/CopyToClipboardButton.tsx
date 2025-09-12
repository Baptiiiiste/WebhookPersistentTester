'use client'

import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Props = {
  text: string
}

export function CopyToClipboardButton({ text }: Props) {
  const t = useTranslations('CopyButton')
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => copyToClipboard(text)}
      className={`inline-flex items-center gap-2`}
    >
      <Copy size="size-4" />
      <span>{isCopied ? t('Copied') : t('Copy')}</span>
    </Button>
  )
}
