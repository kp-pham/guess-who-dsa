import { Gameboard, ChatPanel, Header } from './components'
import { SocketProvider } from './contexts'

function App() {
  return (
    <>
      <SocketProvider>
        <main>
          <Gameboard></Gameboard>
          <ChatPanel></ChatPanel>
        </main>
      </SocketProvider>
      
    </>
  )
}

export default App
