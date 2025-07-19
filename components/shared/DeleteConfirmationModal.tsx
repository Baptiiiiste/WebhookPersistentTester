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

  const handleAction = async () => {
    try {
      const result = await action(deleteId)
      if (result?.message) {
        setError(result.message)
      }
    } catch (e) {
      console.error(e)
      setError('Une erreur est survenue')
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
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
                onClick={() => setError('')}
              >
                Annuler
              </Button>
            </AlertDialogCancel>
            <Button onClick={handleAction} variant="destructive">
              Confirmer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
