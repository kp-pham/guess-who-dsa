import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { isMobile } from 'react-device-detect'
import { SocketProvider } from './contexts/index.jsx'
import App from './App.jsx'
import './index.css'

function Root() {
  if (isMobile)
    return (
      <StrictMode>
        <div></div>
      </StrictMode>
    )
  
  return (
    <StrictMode>
      <SocketProvider>
        <App/>
      </SocketProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root></Root>)
