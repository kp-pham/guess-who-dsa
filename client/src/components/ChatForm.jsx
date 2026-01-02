import { useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import '../styles/ChatForm.css'

function ChatForm() {
  const socket = useSocket()
  const [text, setText] = useState("")

  function handleKeyDown(e) {
    if (pressedDownEnter(e) && !pressedDownShift(e)) {
      e.preventDefault()

      if (!isWhitespace(e.target.value)) {
        setText("")
        socket.emit("message", { id: socket.id, text: text })
      }
    }
  }

  function handleChange(e) {
    socket.emit('activity')
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

function pressedDownEnter(e) {
  return e.key === "Enter"
}

function pressedDownShift(e) {
  return e.shiftKey
}

function isWhitespace(text) {
  return text.trim() === ""
}

export default ChatForm