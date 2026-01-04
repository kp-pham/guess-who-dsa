import { createPortal } from 'react-dom'
import { useSocketContext } from '../contexts/hooks.js'
import '../styles/DisconnectModal.css'

function DisconnectModal({ disconnected, onClose }) { 
  const { socket } = useSocketContext()

  if (!disconnected) return null

  function handleClick() {
    onClose()
    socket.emit('rejoin')
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