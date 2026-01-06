import { useEffect, useMemo, useReducer } from 'react'
import { GameStateContext } from './useGameStateContext.js'
import { useSocketContext } from '../hooks.js'

const cards = ['Quicksort', 'Directed Acyclic Graph', 'Arrays', 'Postorder Traversal', 'Preorder Traversal', 'Selection Sort', 
               'Hash Tables', 'Inorder Traversal', 'Heap', 'Union-Find', 'Topological Sort', 'Merge Sort', 'Red-Black Trees', 
               'Priority Queue', 'Queues', "Dijkstra's Algorithm", 'Heapsort', 'Deques', 'Stacks', 'Insertion Sort', 
               'Binary Search Trees', 'Linked Lists', 'Level Order Traversal', 'Graphs']

const initialState = {
  matched: false,
  eliminated: new Set(),
  incorrectGuess: false,
  disconnected: false,
  gameOver: false,
  reveal: null,
  winner: false,
}

function gameReducer(state, action) {
  switch(action.type) {
    case 'MATCHED':
      return { ...state, matched: true }

    case 'REJOIN':
      return { ...state, matched: false }

    case 'OPPONENT_DISCONNECTED':
      return { ...state, disconnected: true }

    case 'TOGGLE_ELIMINATION': {
      const current = new Set(state.eliminated)
      current.has(action.payload) ? current.delete(action.payload) : current.add(action.payload)

      return { ...state, eliminated: current }
    }
    
    case 'INCORRECT_GUESS': {
      const current = new Set(state.eliminated)
      current.add(action.payload)

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
  const { socket, room, setRoom } = useSocketContext()
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const selectedCard = useMemo(() => {
    const index = Math.floor(Math.random() * cards.length)
    return cards[index]
  }, [])

  useEffect(() => {
    function handleMatched(room) {
      setRoom(room)
      dispatch({ type: 'MATCHED' })
    }
  
    socket.on('matched', handleMatched)
    return () => socket.off('matched', handleMatched)
  }, [socket, room, setRoom])
  
  useEffect(() => {
    function handleRejoin() {
      setRoom(null)
      dispatch({ type: 'REJOIN' })
    }
  
    socket.on('leave_game', handleRejoin)
    return () => socket.off('leave_game', handleRejoin)
  }, [socket, room, setRoom])

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
      dispatch({ type: 'INCORRECT_GUESS', payload: guess })
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
    <GameStateContext.Provider value={{ cards, selectedCard, ...state, dispatch }}>
        {children}
    </GameStateContext.Provider>
  )
}


export default GameStateProvider