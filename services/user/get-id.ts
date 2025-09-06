import { prisma } from '@/lib/prisma'

export async function getUserByIdService(id: number) {
  return prisma.user.findUnique({
    where: { id },
  })
}
