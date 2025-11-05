'use server'

import { prisma } from '@/lib/prisma'

export async function deleteRequestService(id: number) {
  return prisma.requestLog.delete({
    where: { id },
    include: {
      webhook: true,
    },
  })
}
