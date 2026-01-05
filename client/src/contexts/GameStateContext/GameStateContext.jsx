import { useEffect, useState, useMemo } from 'react'
import { GameStateContext } from './useGameStateContext.js'
import { useSocketContext } from './contexts.hooks.js'

const cards = ['Quicksort', 'Directed Acyclic Graph', 'Arrays', 'Postorder Traversal', 'Preorder Traversal', 'Selection Sort', 
               'Hash Tables', 'Inorder Traversal', 'Heap', 'Union-Find', 'Topological Sort', 'Merge Sort', 'Red-Black Trees', 
               'Priority Queue', 'Queues', "Dijkstra's Algorithm", 'Heapsort', 'Deques', 'Stacks', 'Insertion Sort', 
               'Binary Search Trees', 'Linked Lists', 'Level Order Traversal', 'Graphs']

function GameStateProvider({ children }) {
  const { socket, room } = useSocketContext()

  const selectedCard = useMemo(() => {
    const index = Math.floor(Math.random() * cards.length)
    return cards[index]
  }, [])

  useEffect(() => {
    socket.emit('ready', { selected: selectedCard, room: room })
  }, [socket, selectedCard, room])
  
  return (
    <GameStateContext.Provider value={{ selectedCard }}>
        {children}
    </GameStateContext.Provider>
  )
}

export default GameStateProvider