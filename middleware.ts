import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'
import { PUBLIC_ROUTES, ROUTES } from '@/constants/routes'

const intlMiddleware = createIntlMiddleware(routing)

// TODO: Verify on access /webhoks/{url} if the webhook belongs to the user, otherwise redirect to 404 or /webhooks

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request)
  if (intlResponse) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    })

    // get pathname without trailing slash
    const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/'

    // remove locale prefix to compare with PUBLIC_ROUTES
    const locale = request.nextUrl.pathname.split('/')[1]
    const basePath = pathname.replace(`/${locale}`, '') || '/'

    const isAuthenticated = !!token
    const isPublic = PUBLIC_ROUTES.map((route) => `/${route}`).includes(
      basePath,
    )

    if (!isAuthenticated && !isPublic) {
      return NextResponse.redirect(
        new URL(`/${locale}/${ROUTES.SIGN_IN}`, request.url),
      )
    }

    if (isAuthenticated && basePath === `/${ROUTES.SIGN_IN}`) {
      return NextResponse.redirect(
        new URL(`/${locale}/${ROUTES.DASHBOARD}`, request.url),
      )
    }

    return intlResponse
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
}
