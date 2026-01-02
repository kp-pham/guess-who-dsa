import { createContext } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3500')
const SocketContext = createContext()

function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }