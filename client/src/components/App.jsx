import Game from './Game.jsx'
import Lobby from './Lobby.jsx'
import { useGameState } from '../contexts/hooks.js'

function App() {
  const { matched } = useGameState()
  
  return (
    <>
      {matched ? <Game></Game> : <Lobby></Lobby> }      
    </>
  )
}

export default App
