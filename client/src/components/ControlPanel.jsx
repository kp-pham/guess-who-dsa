import '../styles/ControlPanel.css'

function ControlPanel({ turn, endTurn }) {
  return (
    <section id="control-panel">
      <div id="selected">Dijkstra's Algorithm</div>
      <div>
        <button 
          id="guess"
          type="button"
          disabled={!turn}
          onClick={endTurn}>
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
    </section>
  )
}

export default ControlPanel