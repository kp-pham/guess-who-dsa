import { isMobile } from 'react-device-detect'
import { SocketProvider, GameStateProvider } from '../contexts'
import  MobileRedirect from './MobileRedirect.jsx'
import App from './App.jsx'
import '../styles/index.css'

function Root() {
  if (isMobile)
    return (
      <MobileRedirect></MobileRedirect>
    )
  
  return (
    <SocketProvider>
      <GameStateProvider>
        <App/>
      </GameStateProvider>
    </SocketProvider>
  )
}

export default Root