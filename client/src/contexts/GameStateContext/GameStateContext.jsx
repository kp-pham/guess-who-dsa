import { useEffect, useMemo, useReducer } from 'react'
import { GameStateContext } from './useGameStateContext.js'
import { useSocketContext } from '../hooks.js'

const cards = ['Quicksort', 'Directed Acyclic Graph', 'Arrays', 'Postorder Traversal', 'Preorder Traversal', 'Selection Sort', 
               'Hash Tables', 'Inorder Traversal', 'Heap', 'Union-Find', 'Topological Sort', 'Merge Sort', 'Red-Black Trees', 
               'Priority Queue', 'Queues', "Dijkstra's Algorithm", 'Heapsort', 'Deques', 'Stacks', 'Insertion Sort', 
               'Binary Search Trees', 'Linked Lists', 'Level Order Traversal', 'Graphs']

const initialState = {
    eliminated: new Set(),
    incorrectGuess: false,
    disconnected: false,
    gameOver: false,
    reveal: null,
    winner: false,
}

function gameReducer(state, action) {
  switch(action.type) {
    case 'OPPONENT_DISCONNECTED':
      return { ...state, disconnected: true }

    case 'TOGGLE_ELIMINATION':
      return
    
    case 'INCORRECT_GUESS': {
      const current = new Set(state.eliminated)
      current.add(action.guess)

      return { ...state, eliminated: current, incorrectGuess: true }
    }

    case 'ACK_INCORRECT_GUESS':
      return { ...state, incorrectGuess: false }

    case 'GAME_WON':
      return { ...state, gameOver: true, reveal: action.payload, winner: true }

    case 'GAME_LOST':
      return { ...state, gameOver: true, reveal: action.payload, winner: false }

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

  useEffect(() => {
    function handleIncorrectGuess(guess) {
      dispatch({ type: 'INCORRECT_GUESS', guess: guess })
    }
    
    socket.on('incorrect_guess', handleIncorrectGuess)
    return () => socket.off('incorrect_guess', handleIncorrectGuess)
  }, [socket])

  useEffect(() => {
    function handleGameWon(payload) {
      dispatch({ type: 'GAME_WON', payload: payload })
    }

    socket.on('game_won', handleGameWon)
    return () => socket.off('game_won', handleGameWon)
  }, [socket])

  useEffect(() => {
    function handleGameLost(payload) {
      dispatch({ type: 'GAME_LOST', payload: payload })
    }

    socket.on('game_lost', handleGameLost)
    return () => socket.off('game_lost', handleGameLost)
  }, [socket])

  
  return (
    <GameStateContext.Provider value={{ selectedCard, ...state, dispatch }}>
        {children}
    </GameStateContext.Provider>
  )
}


export default GameStateProvider