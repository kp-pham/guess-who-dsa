import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import '../styles/ControlPanel.css'

function ControlPanel({ remaining }) {
  const [turn, setTurn] = useState(true)
  const dialogRef = useRef(null)
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

  function showModal() {
    dialogRef.current.openModal()
  }

  function closeModal() {
    dialogRef.current.closeModal()
  }

  return (
    <section id="control-panel">
      <div id="selected">Dijkstra's Algorithm</div>
      <div>
        <button 
          id="guess"
          type="button"
          disabled={!turn}
          onClick={showModal}>
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
      <dialog ref={dialogRef} id="guess-modal">
        <select>
          <option value="" disabled>Select data structure or algorithm...</option>
          {remaining.map((card, index) => {
            return (
              <option key={index} value={card}>
                {card}
              </option>
            )
          })}
        </select>
        <button onClick={closeModal} type="button">Cancel</button>
        <button type="submit">Guess</button>
      </dialog>
    </section>
  )
}

export default ControlPanel