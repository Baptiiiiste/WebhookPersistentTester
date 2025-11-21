import { handleRequest } from '@/app/api/[uuid]/handler'
import { POST, GET } from '@/app/api/[uuid]/route'
import { createRequestLogAction } from '@/lib/actions/request/create.actions'

jest.mock('@/lib/actions/request/create.actions', () => ({
  createRequestLogAction: jest.fn(),
}))

function makeHeaders(obj: Record<string, string>) {
  return {
    get: (k: string) => obj[k.toLowerCase()] ?? null,
    entries: () => Object.entries(obj),
  }
}

function makeNextReq(opts: {
  method?: string
  url?: string
  headers?: Record<string, string>
  body?: Buffer | string
}) {
  const buf = opts.body ? Buffer.from(opts.body) : Buffer.alloc(0)
  return {
    method: opts.method ?? 'GET',
    headers: makeHeaders(
      Object.fromEntries(
        Object.entries(opts.headers ?? {}).map(([k, v]) => [
          k.toLowerCase(),
          v,
        ]),
      ),
    ),
    url: opts.url ?? 'https://example.com/api/123',
    arrayBuffer: async () =>
      buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
  } as any
}

describe('unit: route handler', () => {
  beforeEach(() => {
    ;(createRequestLogAction as jest.Mock).mockReset()
  })

  it('handles GET and calls createRequestLogAction with correct fields', async () => {
    ;(createRequestLogAction as jest.Mock).mockResolvedValue(204)
    const req = makeNextReq({
      method: 'GET',
      url: 'https://host/api/abc?x=1',
      headers: { 'user-agent': 'ua', referer: 'https://ref' },
    })
    const resp = await GET(
      req as any,
      { params: Promise.resolve({ uuid: 'abc' }) } as any,
    )
    expect(createRequestLogAction).toHaveBeenCalled()
    const call = (createRequestLogAction as jest.Mock).mock.calls[0][0]
    expect(call.uuid).toBe('abc')
    expect(call.method).toBe('GET')
    expect(call.origin).toBe('https://ref')
    expect(call.queryParams).toContain('"x":"1"')
    expect((resp as any).status || (resp as any).statusCode).toBe(204)
  })

  it('parses JSON body and contentLength for POST', async () => {
    ;(createRequestLogAction as jest.Mock).mockResolvedValue(201)
    const body = JSON.stringify({ a: 1 })
    const req = makeNextReq({
      method: 'POST',
      url: 'https://host/api/xyz',
      headers: { 'user-agent': 'ua', 'x-forwarded-for': '1.2.3.4' },
      body,
    })
    const resp = await POST(
      req as any,
      { params: Promise.resolve({ uuid: 'xyz' }) } as any,
    )
    const call = (createRequestLogAction as jest.Mock).mock.calls[0][0]
    expect(call.body).toContain('"a":1')
    expect(call.ip).toBe('1.2.3.4')
    expect(call.contentLength).toBe(Buffer.byteLength(body))
    expect((resp as any).status || (resp as any).statusCode).toBe(201)
  })

  it('handles invalid JSON body gracefully', async () => {
    ;(createRequestLogAction as jest.Mock).mockResolvedValue(202)
    const body = 'not json'
    const req = makeNextReq({
      method: 'POST',
      url: 'https://host/api/xyz',
      headers: {},
      body,
    })
    const resp = await handleRequest(req as any, 'u1')
    const call = (createRequestLogAction as jest.Mock).mock.calls[0][0]
    expect(call.body).toBeNull()
    expect((resp as any).status || (resp as any).statusCode).toBe(202)
  })
})