import supertest from 'supertest'
import http from 'http'
import io from 'socket.io'
import {createClient} from '../utils'
import { server } from '../../src/server'
import {socketServer} from '../../src/socket'
import '../../src/config'

describe('Server', () => {
  let runningServerInstance: http.Server;
  let io: io.Server
  let client: SocketIOClient.Socket

  beforeAll((done) =>{
    console.log('Starting server')
    runningServerInstance = server.listen(process.env.PORT)
    socketServer.attach(runningServerInstance)
    done()
  })

  afterAll((done) =>{
    console.log('Closing server')
    runningServerInstance.close();
    socketServer.close();
    done();
  })

  beforeEach((done) =>{
    client = createClient()
    client.on('connect', done)
  })

  afterEach((done) =>{
    if(client.connected) client.disconnect()
    done()
  })

  it('Should connect', () =>{
    expect(client.connected).toBe(true)
    expect(client.id).toBeDefined()
  })

  it('Should communicate', () =>{
    client.emit('ECHO', 'testing')
    client.on('ECHO', (msg: string) =>{
      expect(msg).toBe('true')
    })
  })
})