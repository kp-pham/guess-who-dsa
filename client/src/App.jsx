import { Gameboard, ChatPanel, Header } from './components'
import io from 'socket.io-client'

const socket = io('http://localhost:3500')

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Gameboard></Gameboard>
        <ChatPanel socket={socket}></ChatPanel>
      </main>
    </>
  )
}

export default App
