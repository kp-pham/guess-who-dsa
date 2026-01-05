function GameStateProvider({ children }) {
  return (
    <GameStateContext.provider>
        {children}
    </GameStateContext.provider>
  )
}

export default GameStateProvider