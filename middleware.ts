import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PUBLIC_ROUTES, ROUTES } from '@/constants/routes'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/'

  const isAuthenticated = !!token
  const isPublic = PUBLIC_ROUTES.map((route) => `/${route}`).includes(pathname)

  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL(`/${ROUTES.SIGN_IN}`, request.url))
  }

  if (isAuthenticated && pathname === `/${ROUTES.SIGN_IN}`) {
    return NextResponse.redirect(new URL(`/${ROUTES.DASHBOARD}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
}
