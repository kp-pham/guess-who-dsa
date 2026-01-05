import { createContext, useContext } from 'react'

const GameStateContext = createContext(null)

function useGameStateContext() {
  const context = useContext(GameStateContext)

  if (!context)
    throw new Error("useGameStateContext must be used within GameStateProvider")

  return context
}

export { GameStateContext, useGameStateContext }