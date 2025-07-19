import { upsertGoogleUser } from '@/services/auth/upsert-google-user.service'

export async function syncGoogleUser(profile: any) {
  const user = await upsertGoogleUser(profile.email, profile.name)

  return {
    id: user.id.toString(),
    name: user.username,
    email: user.email,
    image: profile.picture,
    role: user.role,
  }
}
