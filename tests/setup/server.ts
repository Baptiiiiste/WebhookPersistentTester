import express from 'express'
import { handleRequest } from '@/app/api/[uuid]/handler'

function makeHeadersObj(nodeHeaders: any) {
  const lowered: Record<string, string> = {}
  for (const k of Object.keys(nodeHeaders || {})) {
    const v = nodeHeaders[k]
    if (Array.isArray(v)) lowered[k.toLowerCase()] = v[0]
    else if (v === undefined) continue
    else lowered[k.toLowerCase()] = String(v)
  }
  return {
    get: (k: string) => lowered[k.toLowerCase()] ?? null,
    entries: () => Object.entries(lowered),
  }
}

export function createApp() {
  const app = express()
  app.use(express.raw({ type: '*/*', limit: '1mb' }))

  app.all('/api/:uuid', async (req, res) => {
    const fullUrl = `http://localhost${req.originalUrl}`
    const nextReq = {
      method: req.method,
      headers: makeHeadersObj(req.headers),
      url: fullUrl,
      arrayBuffer: async () => {
        const buf: Buffer = req.body || Buffer.alloc(0)
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
      },
    } as any
    try {
      const nextResp = await handleRequest(nextReq, req.params.uuid)
      const status =
        (nextResp as any).status || (nextResp as any).statusCode || 200
      res.status(status).end()
    } catch (err) {
      res.status(500).send(String(err))
    }
  })

  return app
}
