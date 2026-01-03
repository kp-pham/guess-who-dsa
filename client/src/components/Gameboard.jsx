import { useEffect, useState, useMemo } from 'react'
import { useSocket } from '../contexts/hooks.js'
import CardGrid from './CardGrid.jsx'
import ControlPanel from './ControlPanel.jsx'
import GameOverModal from './GameOverModal.jsx'
import IncorrectGuessModal from './IncorrectGuessModal.jsx'
import '../styles/Gameboard.css'

const cards = ['Arrays', 'Stacks', 'Queues', 'Deques', 'Linked Lists', 'Binary Search Trees', 'Red-Black Trees', 'Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order Traversal', 'Skip Lists', 'Graphs', 'Dijkstra\'s Algorithm', 'Topological Sort', 'Insertion Sort', 'Selection Sort', 'Treesort', 'Heapsort', 'Quicksort', 'Merge Sort', 'Counting Sort', 'Radix Sort', 'Union-Find']

function Gameboard() {
  const [eliminated, setEliminated] = useState(new Set())
  const [incorrectGuess, setIncorrectGuess] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(false)
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
      if (guess == selectedCard) {
        console.log("Display modal for loser")
        socket.emit('correct_guess')
      }
      else {
        socket.emit('incorrect_guess')
      }
    }

    socket.on('guess', handleGuess)
    return () => socket.off('guess', handleGuess)
  }, [socket, selectedCard])

  useEffect(() => {
    function handleCorrectGuess() {
      console.log("Display modal for winner")
    }

    socket.on('correct_guess', handleCorrectGuess)
    return () => socket.off('correct_guess', handleCorrectGuess)
  })

  useEffect(() => {
    function handleIncorrectGuess() {
      setIncorrectGuess(true)
    }
    
    socket.on('incorrect_guess', handleIncorrectGuess)
    return () => socket.off('incorrect_guess', handleIncorrectGuess)
  })

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
        open={gameOver}
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