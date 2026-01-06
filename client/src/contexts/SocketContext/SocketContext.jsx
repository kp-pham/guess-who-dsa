import { useState } from 'react'
import { SocketContext } from './useSocketContext.js'
import io from 'socket.io-client'

const socket = io(process.env.NODE_ENV === "production" ?
                  process.env.REACT_APP_BACKEND_URL : 'http://localhost:3500')
  
function SocketProvider({ children }) {
  const [room, setRoom] = useState(null)

  return (
    <SocketContext.Provider value={{ socket, room, setRoom }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider