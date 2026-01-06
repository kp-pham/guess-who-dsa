import { useEffect, useMemo, useReducer } from 'react'
import { GameStateContext } from './useGameState.js'
import { useSocket } from '../hooks.js'

const cards = ['Quicksort', 'Directed Acyclic Graph', 'Arrays', 'Postorder Traversal', 'Preorder Traversal', 'Selection Sort', 
               'Hash Tables', 'Inorder Traversal', 'Heap', 'Union-Find', 'Topological Sort', 'Merge Sort', 'Red-Black Trees', 
               'Priority Queue', 'Queues', "Dijkstra's Algorithm", 'Heapsort', 'Deques', 'Stacks', 'Insertion Sort', 
               'Binary Search Trees', 'Linked Lists', 'Level Order Traversal', 'Graphs']

const initialState = {
  matched: false,
  turn: false,
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

    case 'START_GAME':
      return { ...state, turn: action.payload }

    case 'START_TURN':
      return { ...state, turn: true }

    case 'END_TURN':
      return { ...state, turn: false }

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
  const { socket, room, setRoom } = useSocket()
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
    function handleStartGame(startingPlayer) {
      console.log("here")
      dispatch({ type: 'START_GAME', payload: (socket.id === startingPlayer) })  
    }

    socket.on('start_game', handleStartGame)
    return () => socket.off('start_game', handleStartGame)
  }, [socket])

  useEffect(() => {
    function startTurn() {
      dispatch({ type: 'START_TURN' })
    }
  
    socket.on('end_turn', startTurn)
    return () => socket.off('end_turn', startTurn)
  }, [socket])

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