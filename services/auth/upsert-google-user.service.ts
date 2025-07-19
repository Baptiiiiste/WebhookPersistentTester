import { prisma } from '@/lib/prisma'
import { AuthProvider, Role } from '@prisma/client'

export async function upsertGoogleUser(email: string, username: string) {
  return prisma.user.upsert({
    where: { email },
    update: {
      username,
    },
    create: {
      email,
      username,
      provider: AuthProvider.GOOGLE,
      role: Role.FREE,
    },
  })
}
