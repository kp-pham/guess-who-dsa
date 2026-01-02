import '../styles/Activity.css'

function Activity({ activity }) {
  return (
    <div 
      style={{ visibility: activity ? "visible" : "hidden" }}
      className="activity"
    >
      Opponent is typing...
    </div>
  )
}

export default Activity