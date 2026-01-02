import '../styles/Message.css'

function Message({ content }) {
  return (
    <li className="message">{content}</li>
  )
}

export default Message