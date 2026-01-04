import { createPortal } from 'react-dom'
import '../styles/GameOverModal.css'

function GameOverModal({ gameOver, reveal, winner, onClose }) {
  if (!gameOver) return null

  return createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal" id="game-over">
        <div id="summary">
          <p id="results">{winner ? "Congratulations, you won!" : "Better luck next time!"}</p>
          <p id="selected--black">You selected: {reveal.selected}</p>
          <p id="selected--red">Your opponent selected: {reveal.opponentSelected}</p>
        </div>

        <div id="hand">
          <div id="hand--black">{reveal.selected}</div>
          <div id="hand--red">{reveal.opponentSelected}</div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default GameOverModal