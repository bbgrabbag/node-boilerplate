import { server } from './server'
import './config'

server.listen(process.env.PORT, () => console.log('Server running on port: ' + process.env.PORT))
