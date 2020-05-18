// eslint-disable-next-line no-unused-vars
import http from 'http'
import { createClient, registerEventListener } from '../utils'
import { server } from '../../src/server'
import { socketServer } from '../../src/socket'
import '../../src/config'

describe('Server', () => {
  let runningServerInstance: http.Server
  let clients: SocketIOClient.Socket[] = []

  beforeAll((done) => {
    runningServerInstance = server.listen(process.env.PORT, done)
    socketServer.attach(runningServerInstance)
  })

  afterAll((done) => {
    runningServerInstance.close(done)
    socketServer.close(done)
  })

  beforeEach(async (done) => {
    clients = await Promise.all(
      Array.from(Array(3)).map(() => createClient())
    )
    done()
  })

  afterEach((done) => {
    clients.forEach(c => c.disconnected && c.disconnect())
    clients = []
    done()
  })

  it('Should connect', () => {
    clients.forEach(client => {
      expect(client.connected).toBe(true)
    })
  })

  it('Should communicate', async () => {
    expect.assertions(3)
    const echoEventListeners = clients.map(client => registerEventListener<{message:string}>(client, 'ECHO'))
    clients[0].emit('ECHO', 'test')
    const responses = await Promise.all(echoEventListeners)
    responses.forEach(response => expect(response.message).toBe('test'))
  })

  it('Should notify all other clients of socket disconnection', async () => {
    expect.assertions(2)
    const discEventListeners = clients.filter((_, i) => i !== 0).map(client => registerEventListener<{socketId: string}>(client, 'CLIENT_DISCONNECTED'))
    const discClientId = clients[0].id
    clients[0].disconnect()
    const responses = await Promise.all(discEventListeners)
    responses.forEach(response => expect(response.socketId).toBe(discClientId))
  })
})
