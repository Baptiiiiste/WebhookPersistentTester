'use server'

import { upsertGoogleService } from '@/services/auth/upsert-google.service'

export async function authorizeGoogleAction(profile: any) {
  const user = await upsertGoogleService(profile.email, profile.name)

  return {
    id: user.id.toString(),
    name: user.username,
    email: user.email,
    image: profile.picture,
    role: user.role,
  }
}
