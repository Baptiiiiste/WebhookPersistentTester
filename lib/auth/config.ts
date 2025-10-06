import { ROUTES } from '@/constants/routes'
import type { NextAuthConfig } from 'next-auth'

export const AUTH_CONFIG: NextAuthConfig = {
  pages: {
    signIn: '/' + ROUTES.SIGN_IN,
  },

  cookies: {
    callbackUrl: {
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image
        token.provider = account?.provider
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
        // @ts-expect-error - provider not in base Session.user
        session.user.provider = token.provider
        session.user.role = token.role
      }
      return session
    },
    async redirect() {
      return `/${ROUTES.DASHBOARD}`
    },
  },

  providers: [],
}
