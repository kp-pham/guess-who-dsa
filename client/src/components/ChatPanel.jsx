import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import Activity from './Activity.jsx'
import ChatForm from './ChatForm.jsx'
import ChatLog from './ChatLog.jsx'
import '../styles/ChatPanel.css'

function ChatPanel() {
  const timerRef = useRef(null)
  const [activity, setActivity] = useState(false)
  const socket = useSocket()

  useEffect(() => {
    function handleActivity() {
      setActivity(true)

      if (timerRef.current)
          clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        setActivity(false)
      }, 7000)
    }

    socket.on('activity', handleActivity)  
      
    return () => {
      socket.off('activity', handleActivity)

      if (timerRef.current)
        clearTimeout(timerRef.current)
    }
  }, [socket])

  useEffect(() => {
    function handleMessage() {
      setActivity(false)
    }

    socket.on('message', handleMessage)

    return () => socket.off('message', handleMessage)
  })

  return (
    <div id="chat-panel">
      <ChatLog></ChatLog>
      <Activity activity={activity}></Activity>
      <ChatForm></ChatForm>
    </div>
  )
}

export default ChatPanel