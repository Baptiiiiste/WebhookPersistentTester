import { prisma } from '@/lib/prisma'
import type { Session } from 'next-auth'

export function getLoggedUserService(session: Session) {
  return prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      webhooks: {
        include: {
          _count: {
            select: { requestLogs: true },
          },
        },
      },
    },
  })
}
