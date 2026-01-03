import { Game, Lobby } from './components'
import { useSocketContext } from './contexts/hooks.js'

function App() {
  const { matched } = useSocketContext()
  
  return (
    <>
      {matched ? <Game></Game> : <Lobby></Lobby> }      
    </>
  )
}

export default App
