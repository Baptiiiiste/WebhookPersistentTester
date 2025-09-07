'use server'

import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { deleteWebhookService } from '@/services/webhook/delete'
import { Prisma } from '@prisma/client'
import { getTranslations } from 'next-intl/server'

export async function deleteWebhookByIdActions(id: number) {
  const t = await getTranslations('WebhookPage.Errors')
  try {
    await deleteWebhookService(id)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2025':
          return {
            error: '404',
            message: t('404'),
          }
        case 'P2003':
          return {
            error: '400',
            message: t('400'),
          }
        default:
          return {
            error: 'UNKNOWN',
            message: t('UNKNOWN'),
          }
      }
    }
    return {
      error: 'UNKNOWN',
      message: t('UNKNOWN'),
    }
  }

  redirect(`/${ROUTES.WEBHOOKS}`)
}
