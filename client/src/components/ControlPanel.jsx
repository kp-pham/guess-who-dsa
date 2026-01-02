import { useEffect, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import '../styles/ControlPanel.css'

function ControlPanel() {
  const [turn, setTurn] = useState(true)
  const socket = useSocket()

  useEffect(() => {
    function startTurn() {
      setTurn(true)
    }

    socket.on('end_turn', startTurn)
    return () => socket.off('end_turn', startTurn)
  }, [socket])

  function endTurn() {
    setTurn(false)
    socket.emit('end_turn')
  }

  return (
    <section id="control-panel">
      <div id="selected">Dijkstra's Algorithm</div>
      <div>
        <button 
          id="guess"
          type="button"
          disabled={!turn}>
            Guess
        </button>
        <button 
          id="end-turn" 
          type="button"
          disabled={!turn}
          onClick={endTurn}>
            End Turn
          </button>
      </div>
    </section>
  )
}

export default ControlPanel