import { useEffect, useState } from 'react'
import { useSocketContext, useGameStateContext } from '../contexts/hooks.js'
import GuessModal from './GuessModal.jsx'
import '../styles/ControlPanel.css'

function ControlPanel({ remaining }) {
  const [open, setOpen] = useState(false)
  const [turn, setTurn] = useState(false)
  const { socket, room } = useSocketContext()
  const { selectedCard } = useGameStateContext()

  useEffect(() => {
    function handleStartGame(startingPlayer) {
      setTurn(socket.id === startingPlayer)  
    }

    socket.on('start_game', handleStartGame)
    return () => socket.off('start_game', handleStartGame)
  }, [socket])

  useEffect(() => {
    function startTurn() {
      setTurn(true)
    }
  
    socket.on('end_turn', startTurn)
    return () => socket.off('end_turn', startTurn)
  }, [socket])
  
  function endTurn() {
    setTurn(false)
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
        remaining={remaining}
        onClose={() => setOpen(false)}
        onGuess={() => setTurn(false)}>
      </GuessModal>
    </section>
  )
}

export default ControlPanel