import { createContext, useContext } from 'react'

const SocketContext = createContext(null)

function useSocketContext() {
  const context = useContext(SocketContext)

  if (!context)
    throw new Error('useSocketContext must be used within SocketProvider')

  return context
}

export { SocketContext, useSocketContext }