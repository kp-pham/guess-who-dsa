import { SocketContext } from './useSocket.js'
import io from 'socket.io-client'

const socket = io('http://localhost:3500')

function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider