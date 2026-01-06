import { createPortal } from 'react-dom'
import { useGameStateContext } from '../contexts/hooks.js'
import '../styles/IncorrectGuessModal.css'

function IncorrectGuessModal({ onClose }) {
  const { incorrectGuess } = useGameStateContext()

  if (!incorrectGuess) return null

  return createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal" id="incorrect-guess">
        <svg id="incorrect-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>alpha-x-circle</title>
          <path fill="red" d="M9,7L11,12L9,17H11L12,14.5L13,17H15L13,12L15,7H13L12,9.5L11,7H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
        </svg>
        <p>Incorrect guess!</p>
        <div className="actions">
          <button id="close" onClick={onClose} type="button">Close</button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default IncorrectGuessModal