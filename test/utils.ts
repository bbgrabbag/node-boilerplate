import socketClient from 'socket.io-client'

export const createClient = (eventTypes: SocketEventTypes[]): {socket: SocketIOClient.Socket, registry: SocketEventRegistry} => {
  const socket = socketClient.connect(`http://localhost:${process.env.PORT}`)
  const registry = eventTypes.reduce((registry, eventName) => {
    return {
      ...registry,
      [eventName]: new Promise((resolve, reject) => {
        socket.on(eventName, (event: SocketEvent) => {
          resolve(event)
        })
      })
    }
  }, {} as SocketEventRegistry)

  return {
    socket,
    registry
  }
}
