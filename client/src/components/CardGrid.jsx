import '../styles/CardGrid.css'


function CardGrid({ cards, eliminated, onCardClick}) {
  return (
    <section id="card-grid">
      {cards.map((card, index) => {
        const isEliminated = eliminated.has(index)

        return (
          <button
            key={index} 
            type="button" 
            onClick={() => onCardClick(index)}
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