import { useState } from 'react'
import { Game, Lobby } from './components'
import { SocketProvider } from './contexts'

function App() {
  const [matched, setMatched] = useState(false)

  return (
    <>
      <SocketProvider>
        {matched ? <Game></Game> : <Lobby></Lobby> }
      </SocketProvider>
      
    </>
  )
}

export default App
