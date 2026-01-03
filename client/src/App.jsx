import { Game, Lobby } from './components'
import { useSocket } from './contexts/hooks.js'

function App() {
  const { matched } = useSocket()
  console.log(matched)
  return (
    <>
      {matched ? <Game></Game> : <Lobby></Lobby> }      
    </>
  )
}

export default App
