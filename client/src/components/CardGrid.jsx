import { useGameStateContext } from '../contexts/hooks.js'
import '../styles/CardGrid.css'

function CardGrid() {
  const { cards, eliminated, dispatch } = useGameStateContext() 

  return (
    <section id="card-grid">
      {cards.map((card, index) => {
        const isEliminated = eliminated.has(card)

        return (
          <button
            className="card"
            key={index} 
            type="button" 
            onClick={() => dispatch({ type: 'TOGGLE_ELIMINATION', payload: card })}
            style={{
              opacity: isEliminated ? 0.4 : 1,
              filter: isEliminated ? "grayscale(100%)" : "none"
            }}>
              {card}
          </button>
        )
      })}
    </section>
  )
}

export default CardGrid