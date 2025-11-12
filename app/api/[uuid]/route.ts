import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createRequestLogAction } from '@/lib/actions/request/create.actions'

async function handleRequest(req: NextRequest, uuid: string) {
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
    headers['x-forwarded-for']?.split(',')[0] || headers['x-real-ip'] || null
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

export async function GET(
  req: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export async function POST(
  req: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export async function OPTIONS(
  req: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export async function HEAD(
  req: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
