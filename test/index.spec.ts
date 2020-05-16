import supertest from 'supertest'
import { server } from '../src/server'

describe('Server', () => {
  it('Should run', async done => {
    expect.assertions(2)
    const response = await supertest(server).get('/')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Connected!')
    done();
  })
})
