import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { AUTH_CONFIG } from '@/lib/auth/config'
import { authorizeCredentialsAction } from '@/lib/actions/auth/authorize-credentials.action'
import type { Role } from '@prisma/client'
import { authorizeGoogleAction } from '@/lib/actions/auth/authorize-google.action'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string | null
      role: Role
    }
  }

  interface User {
    role: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role
  }
}

export const { signIn, signOut, handlers, auth } = NextAuth({
  ...AUTH_CONFIG,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== 'string' ||
          typeof credentials?.password !== 'string'
        ) {
          return null
        }

        return await authorizeCredentialsAction(
          credentials.email,
          credentials.password,
        )
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile: authorizeGoogleAction,
    }),
  ],
})
