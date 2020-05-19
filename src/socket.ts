import io from 'socket.io'

export const socketServer = io()
socketServer.on('connection', (client) => {
  client.broadcast.emit('NEW_GUEST', {
    socketId: 'SERVER',
    name: 'NEW_GUEST',
    message: 'New user has connected'
  })

  client.emit('NEW_GUEST', {
    socketId: 'SERVER',
    name: 'NEW_GUEST',
    message: 'Welcome new user!'
  })

  client.on('disconnect', () => {
    client.broadcast.emit('CLIENT_DISCONNECTED', {
      socketId: client.id,
      name: 'CLIENT_DISCONNECTED',
      message: `ID:${client.id} has disconnected`
    })
  })

  client.on('ECHO', (message: string) => {
    socketServer.emit('ECHO', {
      socketId: client.id,
      message: 'Polo!',
      name: 'ECHO'
    })
  })
})
