import { isMobile } from 'react-device-detect'
import { SocketProvider } from './contexts/index.jsx'
import { MobileRedirect } from './components'
import App from './App.jsx'
import './index.css'

function Root() {
  if (isMobile)
    return (
      <MobileRedirect></MobileRedirect>
    )
  
  return (
    <SocketProvider>
      <App/>
    </SocketProvider>
  )
}

export default Root