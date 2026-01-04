import { isMobile } from 'react-device-detect'
import { SocketProvider } from './contexts/index.jsx'
import App from './App.jsx'
import './index.css'

function Root() {
  if (isMobile)
    return (
      <div></div>
    )
  
  return (
    <SocketProvider>
      <App/>
    </SocketProvider>
  )
}

export default Root