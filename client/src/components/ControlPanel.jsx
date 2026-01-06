import { useState } from 'react'
import { useSocket, useGameState } from '../contexts/hooks.js'
import GuessModal from './GuessModal.jsx'
import '../styles/ControlPanel.css'

function ControlPanel() {
  const [open, setOpen] = useState(false)
  const { socket, room } = useSocket()
  const { selectedCard, turn, dispatch } = useGameState()
  
  function endTurn() {
    dispatch({ type: 'END_TURN', payload: false })
    socket.emit('end_turn', { room: room })
  }
  
  return (
    <section id="control-panel">
      <div id="selected">{selectedCard}</div>
      <div id="controls">
        <button 
          id="guess"
          type="button"
          disabled={!turn}
          onClick={() => setOpen(true)}
          style={{
            opacity: !turn ? 0.4 : 1,
            filter: !turn ? "grayscale(100%)" : "none"
          }}>
            Guess
        </button>
        <button 
          id="end-turn" 
          type="button"
          disabled={!turn}
          onClick={endTurn}
          style={{
            opacity: !turn ? 0.4 : 1,
            filter: !turn ? "grayscale(100%)" : "none"
          }}>
            End Turn
          </button>
      </div>
      <GuessModal
        open={open}
        onClose={() => setOpen(false)}
        onGuess={() => dispatch({ type: 'END_TURN', payload: false })}>
      </GuessModal>
    </section>
  )
}

export default ControlPanel