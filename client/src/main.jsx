import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './components'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root></Root>
  </StrictMode>
)