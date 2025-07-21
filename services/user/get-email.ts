import { prisma } from '@/lib/prisma'

export async function getUserByEmailService(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}
