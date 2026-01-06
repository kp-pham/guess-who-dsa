import { useEffect, useState } from 'react'
import { useSocketContext, useGameStateContext } from '../contexts/hooks.js'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import DisconnectModal from './DisconnectModal.jsx'
import GameOverModal from './GameOverModal.jsx'
import IncorrectGuessModal from './IncorrectGuessModal.jsx'
import '../styles/Gameboard.css'

const cards = ['Quicksort', 'Directed Acyclic Graph', 'Arrays', 'Postorder Traversal', 'Preorder Traversal', 'Selection Sort', 
               'Hash Tables', 'Inorder Traversal', 'Heap', 'Union-Find', 'Topological Sort', 'Merge Sort', 'Red-Black Trees', 
               'Priority Queue', 'Queues', "Dijkstra's Algorithm", 'Heapsort', 'Deques', 'Stacks', 'Insertion Sort', 
               'Binary Search Trees', 'Linked Lists', 'Level Order Traversal', 'Graphs']

function Gameboard() {
  const [eliminated, setEliminated] = useState(new Set())
  const [incorrectGuess, setIncorrectGuess] = useState(false)
  const [reveal, setReveal] = useState(null)
  const [winner, setWinner] = useState(false)
  const { socket, room } = useSocketContext()
  const { disconnected, gameOver, dispatch } = useGameStateContext()

  function handleClick(card) {
    setEliminated(previous => {
      const current = new Set(previous)
      current.has(card) ? current.delete(card) : current.add(card)
      return current
    })
  }

  useEffect(() => {
    function handleGameWon(payload) {
      setReveal(payload)
      setGameOver(true)
      setWinner(true)
    }

    socket.on('game_won', handleGameWon)
    return () => socket.off('game_won', handleGameWon)
  }, [socket])

  

  useEffect(() => {
    function handleIncorrectGuess(guess) {
      setEliminated(previous => {
        const current = new Set(previous)
        current.has(guess) ? current.delete(guess) : current.add(guess)
        return current
      })
      setIncorrectGuess(true)
    }
    
    socket.on('incorrect_guess', handleIncorrectGuess)
    return () => socket.off('incorrect_guess', handleIncorrectGuess)
  }, [socket])

  return (
    <section id="gameboard">
      <CardGrid 
        cards={cards} 
        eliminated={eliminated} 
        onCardClick={handleClick}>
      </CardGrid>
      <ControlPanel
        remaining={cards.filter(card => !eliminated.has(card))}>
      </ControlPanel>
      <DisconnectModal
        disconnected={disconnected}
        onClose={() => dispatch({ type: 'RESET_GAME_STATE' })}>
      </DisconnectModal>
      <GameOverModal
        gameOver={gameOver}
        reveal={reveal}
        winner={winner}
        onClose={() => dispatch({ type: 'RESET_GAME_STATE' })}>
      </GameOverModal>
      <IncorrectGuessModal
        incorrectGuess={incorrectGuess}
        onClose={() => setIncorrectGuess(false)}>
      </IncorrectGuessModal>
    </section>
  )
}

export default Gameboard