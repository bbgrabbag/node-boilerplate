// eslint-disable-next-line no-unused-vars
import http from 'http'
import { createClient } from '../utils'
import { server } from '../../src/server'
import { socketServer } from '../../src/socket'
import '../test.config'

describe('Server', () => {
  let runningServerInstance: http.Server

  beforeEach(async () => {
    runningServerInstance = server.listen(process.env.PORT)
    socketServer.listen(runningServerInstance)
  })

  afterEach(async () => {
    runningServerInstance.close()
    socketServer.close()
  })

  it('Should emit a connection event when a new client socket connects', async () => {
    expect.assertions(4)
    const client = createClient(['connect', 'connection'])
    const newGuestEvent = await client.registry.connection

    expect(client.socket.connected).toBe(true)
    expect(newGuestEvent.clientId).toBe(client.socket.id)
    expect(newGuestEvent.name).toBe('connection')
    expect(newGuestEvent.message).toBe('Welcome new user!')
  })

  it('Should notify other sockets when a new client has joined', async () => {
    expect.assertions(3)
    const client1 = createClient(['connect', 'NEW_GUEST'])
    await client1.registry.connect
    const client2 = createClient([])
    const newGuestEvent = await client1.registry.NEW_GUEST

    expect(newGuestEvent.clientId).toBe(client2.socket.id)
    expect(newGuestEvent.name).toBe('NEW_GUEST')
    expect(newGuestEvent.message).toBe('New user has connected')
  })
  it('Should broadcast events to all other clients', async () => {
    expect.assertions(6)
    const sender = createClient(['connect'])
    const receivers = Array.from(Array(3)).map(() => createClient(['POLO']))
    sender.socket.emit('MARCO')

    const events = await Promise.all(receivers.map(async receiver => {
      return await receiver.registry.POLO
    }))

    events.forEach(event => {
      expect(event.name).toBe('POLO')
      expect(event.clientId).toBe(sender.socket.id)
    })
  })

  it('Should notify all other clients of socket disconnection', async () => {
    expect.assertions(16)
    const leaver = createClient(['connect'])
    const stayers = Array.from(Array(5)).map(() => createClient(['CLIENT_DISCONNECTED']))
    await leaver.registry.connect
    const idToRemove = leaver.socket.id
    leaver.socket.disconnect()

    expect(leaver.socket.disconnected).toBe(true)

    const events = await Promise.all(stayers.map(async stayer => {
      return await stayer.registry.CLIENT_DISCONNECTED
    }))

    events.forEach(event => {
      expect(event.socketId).toBe(idToRemove)
      expect(event.name).toBe('CLIENT_DISCONNECTED')
      expect(event.message).toBe(`ID:${idToRemove} has disconnected`)
    })
  })
})
