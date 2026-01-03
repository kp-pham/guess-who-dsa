import { useEffect, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import GuessModal from './GuessModal.jsx'
import '../styles/ControlPanel.css'

function ControlPanel({ selected, remaining }) {
  const [open, setOpen] = useState(false)
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
      <div id="selected">{selected}</div>
      <div>
        <button 
          id="guess"
          type="button"
          disabled={!turn}
          onClick={() => setOpen(true)}>
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
      <GuessModal
        open={open}
        remaining={remaining}
        onClose={() => setOpen(false)}
        onGuess={() => setTurn(false)}>
      </GuessModal>
    </section>
  )
}

export default ControlPanel