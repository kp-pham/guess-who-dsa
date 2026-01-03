import { createPortal } from 'react-dom'
import '../styles/GameOverModal.css'

function GameOverModal({ gameOver, onClose }) {
  if (!gameOver) return null

  return createPortal(
    <>
      <div className="overlay"></div>
      <div id="game-over-modal">

      </div>
    </>,
    document.getElementById('portal')
  )
}

export default GameOverModal