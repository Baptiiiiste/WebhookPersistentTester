'use server'

import { Prisma } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import { deleteRequestService } from '@/services/request/delete'
import { ROUTES } from '@/constants/routes'
import { redirect } from 'next/navigation'

export async function deleteRequestByIdActions(id: number) {
  const t = await getTranslations('WebhookPage.Errors')
  let deletedRequest
  try {
    // TODO: Check if user is the owner of the webhook before deleting the request log
    deletedRequest = await deleteRequestService(id)
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
  redirect(`/${ROUTES.WEBHOOKS}/${deletedRequest.webhook.url}`)
}
