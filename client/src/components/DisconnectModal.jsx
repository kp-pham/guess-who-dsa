import { createPortal } from 'react-dom'
import '../styles/DisconnectModal.css'

function DisconnectModal({ disconnected }) {
  if (!disconnected) return null

  return createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <p>Opponent has disconnected...</p>
        <button>Return to lobby</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default DisconnectModal