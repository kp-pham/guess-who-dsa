import ChatPanel from './ChatPanel.jsx'
import Gameboard from './Gameboard.jsx'
import '../styles/Game.css'

function Game() {
  return (
    <main id="game">
      <Gameboard></Gameboard>
      <ChatPanel></ChatPanel>
    </main>
  )
}

export default Game