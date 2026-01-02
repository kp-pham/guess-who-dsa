import '../styles/ControlPanel.css'

function ControlPanel() {
  return (
    <section id="control-panel">
      <div id="selected">Dijkstra's Algorithm</div>
      <div>
        <button id="guess" type="button">Guess</button>
        <button id="end-turn" type="button">End Turn</button>
      </div>
    </section>
  )
}

export default ControlPanel