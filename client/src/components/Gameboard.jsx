import { useEffect, useState, useMemo } from 'react'
import { useSocketContext } from '../contexts/hooks.js'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import DisconnectModal from './DisconnectModal.jsx'
import GameOverModal from './GameOverModal.jsx'
import IncorrectGuessModal from './IncorrectGuessModal.jsx'
import '../styles/Gameboard.css'

const cards = ['Arrays', 'Stacks', 'Queues', 'Deques', 'Linked Lists', 'Binary Search Trees', 'Red-Black Trees', 'Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order Traversal', 'Skip Lists', 'Graphs', 'Dijkstra\'s Algorithm', 'Topological Sort', 'Insertion Sort', 'Selection Sort', 'Treesort', 'Heapsort', 'Quicksort', 'Merge Sort', 'Counting Sort', 'Radix Sort', 'Union-Find']

function Gameboard() {
  const [eliminated, setEliminated] = useState(new Set())
  const [disconnected, setDisconnected] = useState(false)
  const [incorrectGuess, setIncorrectGuess] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [reveal, setReveal] = useState(null)
  const [winner, setWinner] = useState(false)
  const { socket, room } = useSocketContext()

  const selectedCard = useMemo(() => {
    const index = Math.floor(Math.random() * cards.length)
    return cards[index]
  }, [])

  useEffect(() => {
    socket.emit('ready', { selected: selectedCard, room: room })
  }, [socket, selectedCard, room])

  function handleClick(card) {
    setEliminated(previous => {
      const current = new Set(previous)
      current.has(card) ? current.delete(card) : current.add(card)
      return current
    })
  }

  useEffect(() => {
    function handleGameWon(payload) {
      setReveal(payload)
      setGameOver(true)
      setWinner(true)
    }

    socket.on('game_won', handleGameWon)
    return () => socket.off('game_won', handleGameWon)
  }, [socket])

  useEffect(() => {
    function handleGameLost(payload) {
      setReveal(payload)
      setGameOver(true)
      setWinner(false)
    }

    socket.on('game_lost', handleGameLost)
    return () => socket.off('game_lost', handleGameLost)
  }, [socket])

  useEffect(() => {
    function handleIncorrectGuess(guess) {
      setEliminated(previous => {
        const current = new Set(previous)
        current.has(guess) ? current.delete(guess) : current.add(guess)
        return current
      })
      setIncorrectGuess(true)
    }
    
    socket.on('incorrect_guess', handleIncorrectGuess)
    return () => socket.off('incorrect_guess', handleIncorrectGuess)
  }, [socket])

  useEffect(() => {
    function handleDisconnect() {
      setDisconnected(true)
    }

    socket.on('opponent_disconnected', handleDisconnect)
    return () => socket.off('opponent_disconnected', handleDisconnect)
  }, [socket])

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
      <DisconnectModal
        disconnected={disconnected}
        onClose={() => setDisconnected(false)}>
      </DisconnectModal>
      <GameOverModal
        gameOver={gameOver}
        reveal={reveal}
        winner={winner}
        onClose={() => setGameOver(false)}>
      </GameOverModal>
      <IncorrectGuessModal
        incorrectGuess={incorrectGuess}
        onClose={() => setIncorrectGuess(false)}>
      </IncorrectGuessModal>
    </section>
  )
}

export default Gameboard