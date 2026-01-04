import { isMobile } from 'react-device-detect'
import { SocketProvider } from '../contexts'
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
      <App/>
    </SocketProvider>
  )
}

export default Root