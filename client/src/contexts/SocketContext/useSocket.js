import { createContext, useContext } from 'react'

const SocketContext = createContext(null)

function useSocket() {
  const socket = useContext(SocketContext)

  if (!socket)
    throw new Error('useSocket must be used within SocketProvider')

  return socket
}

export { SocketContext, useSocket }