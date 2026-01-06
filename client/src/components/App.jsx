import Game from './Game.jsx'
import Lobby from './Lobby.jsx'
import { useGameStateContext } from '../contexts/hooks.js'

function App() {
  const { matched } = useGameStateContext()
  
  return (
    <>
      {matched ? <Game></Game> : <Lobby></Lobby> }      
    </>
  )
}

export default App
