import { createPortal } from 'react-dom'

function GuessModal({ open, remaining, onClose }) {
  if (!open) return null

  return createPortal(
    <>
    <div></div>
      <div>
        <select>
          <option value="" disabled>Select data structure or algorithm...</option>
          {remaining.map((card, index) => {
            return (
              <option key={index} value={card}>
                {card}
              </option>
            )
          })}
        </select>
        <button onClick={onClose} type="button">Cancel</button>
        <button type="submit">Guess</button>
     </div>
    </>,
    document.getElementById('portal') 
  )
}

export default GuessModal