import { useState } from 'react'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import '../styles/Gameboard.css'

const cards = ['Arrays', 'Stacks', 'Queues', 'Deques', 'Linked Lists', 'Binary Search Trees', 'Red-Black Trees', 'Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order Traversal', 'Skip Lists', 'Graphs', 'Dijkstra\'s Algorithm', 'Topological Sort', 'Insertion Sort', 'Selection Sort', 'Treesort', 'Heapsort', 'Quicksort', 'Merge Sort', 'Counting Sort', 'Radix Sort', 'Union-Find']

function Gameboard() {
  const [eliminated, setEliminated] = useState(new Set())

  function handleClick(id) {
    setEliminated(previous => {
      const current = new Set(previous)
      current.has(id) ? current.delete(id) : current.add(id)
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
      <ControlPanel></ControlPanel>
    </section>
  )
}

export default Gameboard