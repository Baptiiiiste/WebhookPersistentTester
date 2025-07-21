import { prisma } from '@/lib/prisma'
import { AuthProvider, Role } from '@prisma/client'
import { getUserByEmailService } from '@/services/user/get-email'

export async function upsertGoogleService(email: string, username: string) {
  const existingUser = await getUserByEmailService(email)

  if (existingUser) {
    if (existingUser.provider === AuthProvider.CREDENTIALS) {
      throw new Error('email_already_taken')
    }

    return existingUser
  }

  return await prisma.user.create({
    data: {
      email,
      username,
      provider: AuthProvider.GOOGLE,
      role: Role.FREE,
    },
  })
}
