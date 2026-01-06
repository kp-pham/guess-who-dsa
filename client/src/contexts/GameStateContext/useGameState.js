import { createContext, useContext } from 'react'

const GameStateContext = createContext(null)

function useGameState() {
  const context = useContext(GameStateContext)

  if (!context)
    throw new Error("useGameState must be used within GameStateProvider")

  return context
}

export { GameStateContext, useGameState }