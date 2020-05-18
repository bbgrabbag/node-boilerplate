import io from 'socket.io'

export const socketServer = io()
socketServer.on('connection', (client) => {
  client.on('disconnect', () => {
    client.broadcast.emit('CLIENT_DISCONNECTED', { socketId: client.id })
  })

  client.on('ECHO', (message: string) => {
    socketServer.emit('ECHO', { message })
  })
})
