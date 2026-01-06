import { createContext, useContext } from 'react'

const SocketContext = createContext(null)

function useSocket() {
  const context = useContext(SocketContext)

  if (!context)
    throw new Error('useSocket must be used within SocketProvider')

  return context
}

export { SocketContext, useSocket }