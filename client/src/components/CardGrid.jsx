import '../styles/CardGrid.css'


function CardGrid({ cards, eliminated, onCardClick}) {
  return (
    <section id="card-grid">
      {cards.map((card, index) => {
        return (
          <button 
            key={index} 
            type="button" 
            onClick={() => onCardClick(index)}
            disabled={eliminated.has(index)}>
              {card}
          </button>
        )
      })}
    </section>
  )
}

export default CardGrid