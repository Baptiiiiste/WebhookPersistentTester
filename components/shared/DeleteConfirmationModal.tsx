'use client'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props extends PropsWithChildren {
  deleteId: number
  action: (id: number) => Promise<{ message: string } | undefined>
  description: string
}

export function DeleteConfirmationModal({
  deleteId,
  action,
  description,
  children,
}: Props) {
  const [error, setError] = useState<string>('')
  const t = useTranslations('DeleteConfirmationModal')

  const handleAction = async () => {
    const result = await action(deleteId)
    if (result?.message) {
      setError(result.message)
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Confirmation')}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
            {error && (
              <AlertDialogDescription className="text-red-500">
                {error}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation()
                  setError('')
                }}
              >
                {t('Cancel')}
              </Button>
            </AlertDialogCancel>
            <Button onClick={handleAction} variant="destructive">
              {t('Confirm')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
