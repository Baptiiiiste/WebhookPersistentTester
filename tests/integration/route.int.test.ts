import request from 'supertest'
import { createApp } from '../setup/server'
import { createRequestLogAction } from '@/lib/actions/request/create.actions'

jest.mock('@/lib/actions/request/create.actions', () => ({
  createRequestLogAction: jest.fn(),
}))

describe('integration: /api/:uuid', () => {
  let app: any
  beforeAll(() => {
    app = createApp()
  })
  beforeEach(() => {
    ;(createRequestLogAction as jest.Mock).mockReset()
  })

  it('returns status from createRequestLogAction for GET', async () => {
    ;(createRequestLogAction as jest.Mock).mockResolvedValue(204)
    const res = await request(app).get('/api/thing-1?foo=bar').set('User-Agent', 'ua').set('Referer', 'https://ref')
    expect(res.status).toBe(204)
    expect(createRequestLogAction).toHaveBeenCalled()
    const call = (createRequestLogAction as jest.Mock).mock.calls[0][0]
    expect(call.uuid).toBe('thing-1')
    expect(call.queryParams).toContain('"foo":"bar"')
  })

  it('accepts JSON POST and returns its status', async () => {
    ;(createRequestLogAction as jest.Mock).mockResolvedValue(201)
    const payload = { hello: 'world' }
    const res = await request(app).post('/api/my-uuid').set('Content-Type', 'application/json').send(payload)
    expect(res.status).toBe(201)
    const call = (createRequestLogAction as jest.Mock).mock.calls[0][0]
    expect(call.body).toContain('"hello":"world"')
  })
})
