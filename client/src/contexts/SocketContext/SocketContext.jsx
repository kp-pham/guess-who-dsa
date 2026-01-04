import { useEffect, useState } from 'react'
import { SocketContext } from './useSocketContext.js'
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

    socket.on('matched', handleMatched)
    return () => socket.off('matched', handleMatched)
  }, [room])

  useEffect(() => {
    function handleRejoin() {
      setRoom(null)
      setMatched(false)
    }

    socket.on('rejoin', handleRejoin)
    return () => socket.off('rejoin', handleRejoin)
  }, [])

  return (
    <SocketContext.Provider value={{ socket, room, matched }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider