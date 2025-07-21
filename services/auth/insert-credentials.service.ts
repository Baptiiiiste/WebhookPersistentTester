import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { AuthProvider, Role } from '@prisma/client'

export async function insertCredentialsService({
  email,
  username,
  password,
}: {
  email: string
  username: string
  password: string
}) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('email_already_exists')

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS!),
  )

  return await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role: Role.FREE,
      provider: AuthProvider.CREDENTIALS,
    },
  })
}
