import { useEffect, useState, useMemo } from 'react'
import { useSocket } from '../contexts/hooks.js'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import '../styles/Gameboard.css'

const cards = ['Arrays', 'Stacks', 'Queues', 'Deques', 'Linked Lists', 'Binary Search Trees', 'Red-Black Trees', 'Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order Traversal', 'Skip Lists', 'Graphs', 'Dijkstra\'s Algorithm', 'Topological Sort', 'Insertion Sort', 'Selection Sort', 'Treesort', 'Heapsort', 'Quicksort', 'Merge Sort', 'Counting Sort', 'Radix Sort', 'Union-Find']

function Gameboard() {
  const [eliminated, setEliminated] = useState(new Set())
  const [turn, setTurn] = useState(true)
  const socket = useSocket()

  const selectedCard = useMemo(() => {
    const index = Math.floor(Math.random() * cards.length)
    return cards[index]
  }, [])

  useEffect(() => {
    function startTurn() {
      setTurn(true)
    }

    socket.on('end_turn', startTurn)
    return () => socket.off('end_turn', startTurn)
  }, [socket])

  function endTurn() {
    setTurn(false)
    socket.emit('end_turn')
  }

  function handleClick(card) {
    setEliminated(previous => {
      const current = new Set(previous)
      current.has(card) ? current.delete(card) : current.add(card)
      return current
    })
  }

  return (
    <section id="gameboard">
      <CardGrid 
        cards={cards} 
        eliminated={eliminated} 
        onCardClick={handleClick}>
      </CardGrid>
      <ControlPanel
        turn={turn}
        endTurn={endTurn}
        selected={selectedCard}
        remaining={cards.filter(card => !eliminated.has(card))}>
      </ControlPanel>
    </section>
  )
}

export default Gameboard