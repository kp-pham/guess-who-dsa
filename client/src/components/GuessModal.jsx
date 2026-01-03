import { createPortal } from 'react-dom'
import '../styles/GuessModal.css'

function GuessModal({ open, remaining, onClose }) {
  if (!open) return null

  return createPortal(
    <>
      <div id="overlay"></div>
      <div id="guess-modal">
        <label for="select-guess">Select data structure or algorithm...</label>
        <select id="select-guess">
            {remaining.map((card, index) => {
              return (
                <option key={index} value={card}>
                  {card}
                </option>
              )
            })}
        </select>
        <div class="actions">
          <button id="cancel" onClick={onClose} type="button">Cancel</button>
          <button id="make-guess" type="submit">Guess</button>
        </div>
      </div>
    </>,
    document.getElementById('portal') 
  )
}

export default GuessModal