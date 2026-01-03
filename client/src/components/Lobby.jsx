import { useEffect } from 'react'
import { useSocket } from '../contexts/hooks.js'
import '../styles/Lobby.css'

function Lobby({ onMatched }) {
  const socket = useSocket()

  useEffect(() => {
    socket.on('matched', onMatched)
    return () => socket.off('matched', onMatched)
  }, [socket, onMatched])

  return (
    <main id="lobby">
      <section>
        <p id="status">Finding opponent...</p>
      </section>
    </main>
  )
}

export default Lobby