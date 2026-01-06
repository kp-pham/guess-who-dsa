import { createPortal } from 'react-dom'
import { useSocketContext, useGameStateContext } from '../contexts/hooks.js'
import '../styles/DisconnectModal.css'

function DisconnectModal({ onClose }) { 
  const { socket } = useSocketContext()
  const { disconnected } = useGameStateContext()

  if (!disconnected) return null

  function handleClick() {
    onClose()
    socket.emit('leave_game')
  }

  return createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal" id="disconnect">
        <p id="message">Opponent has disconnected...</p>
        <button id="return" onClick={handleClick} type="button">Return to lobby</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default DisconnectModal