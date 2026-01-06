import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useGameState, useSocketContext } from '../contexts/hooks.js'
import '../styles/GuessModal.css'

function GuessModal({ open, onClose, onGuess }) {
  const [guess, setGuess] = useState('')
  const { socket, room } = useSocketContext()
  const { cards, eliminated } = useGameState()

  const remaining = cards.filter(card => !eliminated.has(card))

  function handleChange(e) {
    setGuess(e.target.value)
  }

  function handleGuess(e) {
    e.preventDefault()
    onGuess()
    onClose()
    socket.emit('guess', { guess: guess, room: room })
    socket.emit('end-turn', { room: room })
  }

  if (!open) return null

  return createPortal(
    <>
      <div className="overlay"></div>
      <form className="modal" id="guess-form" onSubmit={handleGuess}>
        <label htmlFor="select-guess">Select data structure or algorithm...</label>
        <select 
          id="select-guess"
          value={guess} 
          onChange={handleChange}
          size="5">
            <option value="" disabled hidden></option>
            {remaining.map((card, index) => {
              return (
                <option key={index} value={card}>
                  {card}
                </option>
              )
            })}
        </select>
        <div className="actions">
          <button id="cancel" onClick={onClose} type="button">Cancel</button>
          <button id="make-guess" type="submit">Guess</button>
        </div>
      </form>
    </>,
    document.getElementById('portal') 
  )
}

export default GuessModal