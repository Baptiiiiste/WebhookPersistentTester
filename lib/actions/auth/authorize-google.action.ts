'use server'

import { upsertGoogleService } from '@/services/auth/upsert-google.service'
import type { GoogleProfile } from 'next-auth/providers/google'

export async function authorizeGoogleAction(profile: GoogleProfile) {
  const user = await upsertGoogleService(profile.email, profile.name)

  return {
    id: user.id.toString(),
    name: user.username,
    email: user.email,
    image: profile.picture,
    role: user.role,
  }
}
