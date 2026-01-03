import { useState } from 'react'
import GuessModal from './GuessModal.jsx'
import '../styles/ControlPanel.css'

function ControlPanel({ turn, endTurn, selected, remaining }) {
  const [open, setOpen] = useState(false)
  
  return (
    <section id="control-panel">
      <div id="selected">{selected}</div>
      <div>
        <button 
          id="guess"
          type="button"
          disabled={!turn}
          onClick={() => setOpen(true)}>
            Guess
        </button>
        <button 
          id="end-turn" 
          type="button"
          disabled={!turn}
          onClick={endTurn}>
            End Turn
          </button>
      </div>
      <GuessModal
        open={open}
        remaining={remaining}
        onClose={() => setOpen(false)}>
      </GuessModal>
    </section>
  )
}

export default ControlPanel