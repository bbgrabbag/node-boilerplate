import socketClient from 'socket.io-client'

export const createClient = (): Promise<SocketIOClient.Socket> => {
  return new Promise((resolve, reject) => {
    const client = socketClient.connect(`http://localhost:${process.env.PORT}`, { forceNew: true })
    client.on('connect', () => resolve(client))
    setTimeout(() => reject(new Error('Timeout exceeded')), 5000)
  })
}

export const registerEventListener = <R>(client: SocketIOClient.Socket, event: string):Promise<R> => {
  return new Promise((resolve) => {
    client.on(event, resolve)
  })
}
