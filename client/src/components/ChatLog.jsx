import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import '../styles/ChatLog.css'

function ChatLog() {
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const socket = useSocket()

  useEffect(() => {
    function handleMessage(data) {
      setMessages(current => [...current, data])
    }
    
    socket.on('message', handleMessage)
    return () => socket.off('message', handleMessage)
  }, [socket])

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <ul id="chat-log">
      {messages.map((message, index) => {
        const {id, text} = message
        return (
          <li 
            key={index} 
            className={(id === socket.id) ? "message--right" : "message--left"}>
            {text}
          </li>
        )
      })}
      {/* {messages.map((message, index) => <Message key={index} content={message}></Message>)} */}
      <li ref={messagesEndRef}></li>
    </ul>
  )
}

export default ChatLog