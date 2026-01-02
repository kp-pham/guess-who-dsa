import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import '../styles/Gameboard.css'

function Gameboard() {
  return (
    <section id="gameboard">
      <CardGrid></CardGrid>
      <ControlPanel></ControlPanel>
    </section>
  )
}

export default Gameboard