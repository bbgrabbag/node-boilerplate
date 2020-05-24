import io from 'socket.io'

export const socketServer = io()
socketServer.on('connection', (socket) => {
  socket.broadcast.emit('NEW_GUEST', {
    socketId: socket.id,
    clientId: socket.client.id,
    name: 'NEW_GUEST',
    message: 'New user has connected'
  })

  socket.emit('connection', {
    socketId: socket.id,
    clientId: socket.client.id,
    name: 'connection',
    message: 'Welcome new user!'
  })

  socket.on('disconnect', () => {
    socketServer.emit('CLIENT_DISCONNECTED', {
      socketId: socket.id,
      clientId: socket.client.id,
      name: 'CLIENT_DISCONNECTED',
      message: 'User has disconnected'
    })
  })

  socket.on('MARCO', () => {
    socket.broadcast.emit('POLO', {
      socketId: socket.id,
      clientId: socket.client.id,
      message: 'Polo!',
      name: 'POLO'
    })
  })
})
