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
  const { socket, room } = useSocketContext()
  const { eliminated, disconnected, gameOver, incorrectGuess, dispatch } = useGameStateContext()

  function handleClick(card) {
    setEliminated(previous => {
      const current = new Set(previous)
      current.has(card) ? current.delete(card) : current.add(card)
      return current
    })
  }

  return (
    <section id="gameboard">
      {/* <CardGrid></CardGrid> */}
      <ControlPanel
        remaining={cards.filter(card => !eliminated.has(card))}>
      </ControlPanel>
      <DisconnectModal
        disconnected={disconnected}
        onClose={() => dispatch({ type: 'RESET_GAME_STATE' })}>
      </DisconnectModal>
      <GameOverModal
        gameOver={gameOver}
        onClose={() => dispatch({ type: 'RESET_GAME_STATE' })}>
      </GameOverModal>
      <IncorrectGuessModal
        onClose={() => dispatch({ type: 'ACK_INCORRECT_GUESS'})}>
      </IncorrectGuessModal>
    </section>
  )
}

export default Gameboard