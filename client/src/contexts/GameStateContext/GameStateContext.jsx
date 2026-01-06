import { useEffect, useState, useMemo, useReducer } from 'react'
import { GameStateContext } from './useGameStateContext.js'
import { useSocketContext } from '../hooks.js'

const cards = ['Quicksort', 'Directed Acyclic Graph', 'Arrays', 'Postorder Traversal', 'Preorder Traversal', 'Selection Sort', 
               'Hash Tables', 'Inorder Traversal', 'Heap', 'Union-Find', 'Topological Sort', 'Merge Sort', 'Red-Black Trees', 
               'Priority Queue', 'Queues', "Dijkstra's Algorithm", 'Heapsort', 'Deques', 'Stacks', 'Insertion Sort', 
               'Binary Search Trees', 'Linked Lists', 'Level Order Traversal', 'Graphs']

const initialState = {
    disconnected: false,
    gameOver: false
}

function gameReducer(state, action) {
  switch(action.type) {
    case 'OPPONENT_DISCONNECTED':
      return { ...state, disconnected: true }

    case 'GAME_OVER':
      return { ...state, gameOver: true }

    case 'RESET_GAME_STATE':
      return { ...initialState }
       
    default:
      return state
  }
}

function GameStateProvider({ children }) {
  const { socket, room } = useSocketContext()
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const selectedCard = useMemo(() => {
    const index = Math.floor(Math.random() * cards.length)
    return cards[index]
  }, [])

  useEffect(() => {
    socket.emit('ready', { selected: selectedCard, room: room })
  }, [socket, selectedCard, room])

  useEffect(() => {
    function handleDisconnect() {
      dispatch({ type: 'OPPONENT_DISCONNECTED' })
    }

    socket.on('opponent_disconnected', handleDisconnect)
    return () => socket.off('opponent_disconnected', handleDisconnect)
  }, [socket])
  
  return (
    <GameStateContext.Provider value={{ selectedCard, ...state, dispatch }}>
        {children}
    </GameStateContext.Provider>
  )
}


export default GameStateProvider