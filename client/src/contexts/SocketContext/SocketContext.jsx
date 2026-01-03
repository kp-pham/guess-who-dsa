import { useEffect, useState } from 'react'
import { SocketContext } from './useSocket.js'
import io from 'socket.io-client'

const socket = io('http://localhost:3500')
  
function SocketProvider({ children }) {
  const [room, setRoom] = useState(null)
  const [matched, setMatched] = useState(false)

  useEffect(() => {
    function handleMatched(room) {
      setRoom(room)
      setMatched(true)
    }

    socket.on('matched', () => handleMatched(room))
    return () => socket.off('matched', () => handleMatched(room))
  }, [room])

  return (
    <SocketContext.Provider value={{ socket, room, matched }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider