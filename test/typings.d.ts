type SocketEventRegistry = {
    [K in SocketEventTypes]: Promise<SocketEvent>
}
