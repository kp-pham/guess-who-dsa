import { useEffect, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import '../styles/Gameboard.css'

const cards = ['Arrays', 'Stacks', 'Queues', 'Deques', 'Linked Lists', 'Binary Search Trees', 'Red-Black Trees', 'Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order Traversal', 'Skip Lists', 'Graphs', 'Dijkstra\'s Algorithm', 'Topological Sort', 'Insertion Sort', 'Selection Sort', 'Treesort', 'Heapsort', 'Quicksort', 'Merge Sort', 'Counting Sort', 'Radix Sort', 'Union-Find']

function Gameboard() {
  const [eliminated, setEliminated] = useState(new Set())
  const [turn, setTurn] = useState(true)
  const socket = useSocket()

  useEffect(() => {
    function startTurn() {
      setTurn(true)
    }

    socket.on('end_turn', startTurn)
    return () => socket.off('end_turn', startTurn)
  }, [socket])

  function handleClick(id) {
    setEliminated(previous => {
      const current = new Set(previous)
      current.has(id) ? current.delete(id) : current.add(id)
      return current
    })
  }

  function endTurn() {
    setTurn(false)
    socket.emit('end_turn')
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
        endTurn={endTurn}>
      </ControlPanel>
    </section>
  )
}

export default Gameboard