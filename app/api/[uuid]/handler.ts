import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createRequestLogAction } from '@/lib/actions/request/create.actions'

export async function handleRequest(req: NextRequest, uuid: string) {
  const method = req.method
  const origin = req.headers.get('referer') || req.headers.get('origin') || null
  const headers = Object.fromEntries(req.headers.entries())

  const { searchParams } = new URL(req.url)
  const queryParams = Object.fromEntries(searchParams.entries())

  let body = null
  let contentLength = 0

  try {
    if (method !== 'GET' && method !== 'HEAD') {
      const rawBody = await req.arrayBuffer()
      contentLength = rawBody.byteLength
      try {
        body = JSON.parse(new TextDecoder().decode(rawBody))
      } catch {
        body = null
      }
    }
  } catch {
    body = null
    contentLength = 0
  }

  const ip =
    (headers['x-forwarded-for'] as string)?.split(',')[0] ||
    headers['x-real-ip'] ||
    null
  const userAgent = headers['user-agent'] || null

  const status = await createRequestLogAction({
    uuid,
    method,
    origin,
    headers: JSON.stringify(headers),
    queryParams: Object.keys(queryParams).length
      ? JSON.stringify(queryParams)
      : null,
    body: body ? JSON.stringify(body) : null,
    ip,
    userAgent,
    contentLength,
  })

  return new NextResponse(undefined, { status })
}
