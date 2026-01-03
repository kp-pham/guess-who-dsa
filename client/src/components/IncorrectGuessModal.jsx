import { createPortal } from 'react-dom'

function IncorrectGuessModal({ incorrectGuess, onClose }) {
  if (!incorrectGuess) return null

  return createPortal(
    <>
      <div classname="overlay"></div>
      <div id="incorrect-guess">
        Incorrect guess!
      </div>
      <button onClick={onClose} type="button">Close</button>
    </>,
    document.getElementById('portal')
  )
}

export default IncorrectGuessModal