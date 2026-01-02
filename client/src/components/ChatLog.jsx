import { useEffect, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import Message from './Message.jsx'
import '../styles/ChatLog.css'

function ChatLog() {
  const [messages, setMessages] = useState([])
  const socket = useSocket()

  useEffect(() => {
    function handleMessage(data) {
      setMessages(current => [...current, data])
    }
    
    socket.on('message', handleMessage)
    return () => socket.off('message', handleMessage)
  }, [socket])

  return (
    <div id="chat-log">
      {messages.map((message, index) => <Message key={index} content={message}></Message>)}
    </div>
  )
}

export default ChatLog