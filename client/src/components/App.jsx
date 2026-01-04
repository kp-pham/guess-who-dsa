import Game from './Game.jsx'
import Lobby from './Lobby.jsx'
import { useSocketContext } from '../contexts/hooks.js'

function App() {
  const { matched } = useSocketContext()
  
  return (
    <>
      {matched ? <Game></Game> : <Lobby></Lobby> }      
    </>
  )
}

export default App
