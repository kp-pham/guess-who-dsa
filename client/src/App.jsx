import { Game } from './components'
import { SocketProvider } from './contexts'

function App() {
  return (
    <>
      <SocketProvider>
        <Game></Game>
      </SocketProvider>
      
    </>
  )
}

export default App
