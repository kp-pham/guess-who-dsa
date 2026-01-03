import ChatPanel from './ChatPanel.jsx'
import Gameboard from './Gameboard.jsx'

function Game() {
  return (
    <main id="game">
      <Gameboard></Gameboard>
      <ChatPanel></ChatPanel>
    </main>
  )
}

export default Game