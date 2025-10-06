import { NextResponse } from 'next/server'
import { createRequestLogAction } from '@/lib/actions/request/create.actions'

async function handleRequest(req: Request, uuid: string) {
  const method = req.method
  const origin = req.headers.get('referer') ?? req.headers.get('origin') ?? null

  const headers: Record<string, string> = Object.fromEntries(
    req.headers.entries(),
  )
  const { searchParams } = new URL(req.url)
  const queryParams: Record<string, string> = Object.fromEntries(
    searchParams.entries(),
  )

  let body: unknown = null
  let contentLength = 0
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      const raw = await req.arrayBuffer()
      contentLength = raw.byteLength
      const text = new TextDecoder().decode(raw)
      try {
        body = JSON.parse(text)
      } catch {
        body = null
      }
    } catch {
      body = null
      contentLength = 0
    }
  }

  const ip =
    headers['x-forwarded-for']?.split(',')[0] ?? headers['x-real-ip'] ?? null
  const userAgent = headers['user-agent'] ?? null

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

// ⬇️ Laisse Next typer le 2e arg ; on supprime toute annotation et on narrow à l'intérieur
//    (pas de `any`, et l'annotation est juste une directive de vérif)
export function GET(
  req: Request,
  // @ts-expect-error: Next injecte le type exact du contexte pour cette route
  { params },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export function POST(
  req: Request,
  // @ts-expect-error: contexte typé par Next
  { params },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export function PUT(
  req: Request,
  // @ts-expect-error: contexte typé par Next
  { params },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export function PATCH(
  req: Request,
  // @ts-expect-error: contexte typé par Next
  { params },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export function DELETE(
  req: Request,
  // @ts-expect-error: contexte typé par Next
  { params },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export function OPTIONS(
  req: Request,
  // @ts-expect-error: contexte typé par Next
  { params },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
export function HEAD(
  req: Request,
  // @ts-expect-error: contexte typé par Next
  { params },
) {
  const { uuid } = params as { uuid: string }
  return handleRequest(req, uuid)
}
