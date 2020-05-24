interface SocketEvent{
    name: string;
    message:string;
    clientId: string;
    socketId: string;
}

type SocketEventTypes = 'connect' | 'connection' | 'disconnected' | 'MARCO' |'POLO'| 'NEW_GUEST' | 'CLIENT_DISCONNECTED'
