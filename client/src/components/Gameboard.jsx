import { useGameState } from '../contexts/hooks.js'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import DisconnectModal from './DisconnectModal.jsx'
import GameOverModal from './GameOverModal.jsx'
import IncorrectGuessModal from './IncorrectGuessModal.jsx'
import '../styles/Gameboard.css'

function Gameboard() {
  const { dispatch } = useGameState()

  return (
    <section id="gameboard">
      <CardGrid></CardGrid>
      <ControlPanel></ControlPanel>
      <DisconnectModal
        onClose={() => dispatch({ type: 'RESET_GAME_STATE' })}>
      </DisconnectModal>
      <GameOverModal
        onClose={() => dispatch({ type: 'RESET_GAME_STATE' })}>
      </GameOverModal>
      <IncorrectGuessModal
        onClose={() => dispatch({ type: 'ACK_INCORRECT_GUESS'})}>
      </IncorrectGuessModal>
    </section>
  )
}

export default Gameboard