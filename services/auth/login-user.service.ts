import { prisma } from '@/lib/prisma'

export async function loginUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}
