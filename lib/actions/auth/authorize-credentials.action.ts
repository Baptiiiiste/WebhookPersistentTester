import { loginUserByEmail } from '@/services/auth/login-user.service'
import { AuthProvider } from '@prisma/client'
import bcrypt from 'bcryptjs'

export async function authorizeWithCredentials(
  email: string,
  password: string,
) {
  const user = await loginUserByEmail(email)

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
