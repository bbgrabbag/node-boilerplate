import io from 'socket.io'

export const socketServer = io()
socketServer.on('connection', (client) => {
  socketServer.on('ECHO', (msg: string) => {
    socketServer.emit('ECHO', msg)
  })
})
