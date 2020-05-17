import { server } from './server'
import { socketServer } from './socket'
import './config'

const runningInstance = server.listen(process.env.PORT, () => console.log('Server running on port: ' + process.env.PORT))
socketServer.attach(runningInstance)
