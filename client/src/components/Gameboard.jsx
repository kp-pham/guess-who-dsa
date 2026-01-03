import { useEffect, useState, useMemo } from 'react'
import { useSocket } from '../contexts/hooks.js'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import GameOverModal from './GameOverModal.jsx'
import '../styles/Gameboard.css'

const cards = ['Arrays', 'Stacks', 'Queues', 'Deques', 'Linked Lists', 'Binary Search Trees', 'Red-Black Trees', 'Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order Traversal', 'Skip Lists', 'Graphs', 'Dijkstra\'s Algorithm', 'Topological Sort', 'Insertion Sort', 'Selection Sort', 'Treesort', 'Heapsort', 'Quicksort', 'Merge Sort', 'Counting Sort', 'Radix Sort', 'Union-Find']

function Gameboard() {
  const [eliminated, setEliminated] = useState(new Set())
  const [open, setOpen] = useState(false)
  const socket = useSocket()

  const selectedCard = useMemo(() => {
    const index = Math.floor(Math.random() * cards.length)
    return cards[index]
  }, [])

  function handleClick(card) {
    setEliminated(previous => {
      const current = new Set(previous)
      current.has(card) ? current.delete(card) : current.add(card)
      return current
    })
  }

  useEffect(() => {
    function handleGuess(guess) {
      if (guess == selectedCard)
        console.log("Winner Winner Chicken Dinner")
    }

    socket.on('guess', handleGuess)
    return () => socket.off('guess', handleGuess)
  }, [socket, selectedCard])

  return (
    <section id="gameboard">
      <CardGrid 
        cards={cards} 
        eliminated={eliminated} 
        onCardClick={handleClick}>
      </CardGrid>
      <ControlPanel
        selected={selectedCard}
        remaining={cards.filter(card => !eliminated.has(card))}>
      </ControlPanel>
      <GameOverModal
        open={open}
        onClose={() => setOpen(false)}>
      </GameOverModal>
    </section>
  )
}

export default Gameboard