import { useEffect, useState } from 'react'
import { SocketContext } from './useSocketContext.js'
import io from 'socket.io-client'

const socket = io(process.env.NODE_ENV === "production" ?
                  process.env.REACT_APP_BACKEND_URL : 'http://localhost:3500')
  
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

    socket.on('leave_game', handleRejoin)
    return () => socket.off('leave_game', handleRejoin)
  }, [])

  return (
    <SocketContext.Provider value={{ socket, room, matched }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider