import { createPortal } from 'react-dom'
import '../styles/GameOverModal.css'

function GameOverModal({ gameOver, winner, onClose }) {
  if (!gameOver) return null

  return createPortal(
    <>
      <div className="overlay"></div>
      <div class="modal" id="game-over">
        <p>{winner ? "You won!" : "You lost!"}</p>
        <p>You selected: </p>
        <p>Your opponent selected: </p>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default GameOverModal