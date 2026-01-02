import { useState } from 'react'
import { useSocket } from '../contexts/SocketContext/useSocket.js'
import '../styles/ChatForm.css'

function ChatForm() {
  const socket = useSocket()
  const [text, setText] = useState("")

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      setText("")
      socket.emit("send_message", text)
    }
  }

  function handleChange(e) {
    setText(e.target.value)
  }

  return (
    <form id="chat-form">
      <textarea 
        value={text} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown} 
        placeholder="Enter your message here...">
      </textarea>
    </form>
  )
}

export default ChatForm