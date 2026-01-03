import { createPortal } from 'react-dom'
import '../styles/GameOverModal.css'

function GameOverModal({ gameOver, winner, onClose }) {
  if (!gameOver) return null

  return createPortal(
    <>
      <div className="overlay"></div>
      <div class="modal" id="game-over">
        <div id="outcome">
          <p style={{textAlign: "center"}}>{winner ? "You won!" : "You lost!"}</p>
          <p>You selected: Stacks</p>
          <p>Your opponent selected: Topological Sort</p>
        </div>
       
        <div id="hand">
          <div id="player">Stacks</div>
          <div id="opponent">Topological Sort</div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default GameOverModal