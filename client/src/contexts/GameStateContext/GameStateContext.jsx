import { GameStateContext } from './useGameStateContext.js'
import { useSocketContext } from './contexts.hooks.js'

function GameStateProvider({ children }) {
  
  
  return (
    <GameStateContext.provider>
        {children}
    </GameStateContext.provider>
  )
}

export default GameStateProvider