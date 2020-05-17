import socketClient from 'socket.io-client'

export const createClient = (): SocketIOClient.Socket => {
  return socketClient(`http://localhost:${process.env.PORT}`)
}
