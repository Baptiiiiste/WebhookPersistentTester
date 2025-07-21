'use server'

import { AuthProvider } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { getUserByEmailService } from '@/services/user/get-email'

export async function authorizeCredentialsAction(
  email: string,
  password: string,
) {
  const user = await getUserByEmailService(email)

  if (!user || !user.password || user.provider !== AuthProvider.CREDENTIALS)
    return null

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null

  return {
    id: user.id.toString(),
    name: user.username,
    email: user.email,
    image: null,
    role: user.role,
  }
}
