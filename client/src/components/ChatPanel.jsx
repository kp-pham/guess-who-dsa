import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../contexts/hooks.js'
import Activity from './Activity.jsx'
import ChatForm from './ChatForm.jsx'
import ChatLog from './ChatLog.jsx'
import '../styles/ChatPanel.css'
  // const [activity, setActivity] = useState(false)

function ChatPanel() {
  const timerRef = useRef(null)
  const [activity, setActivity] = useState(false)
  const socket = useSocket()

  useEffect(() => {
    socket.on('activity', () => {
      console.log('hi')
      setActivity(true)

      if (timerRef.current)
        clearTimeout(timerRef.current)
      
      timerRef.current = setTimeout(() => {
        setActivity(false)
      }, 7000)
      
    })
  }, [socket])

  return (
    <div id="chat-panel">
      <ChatLog></ChatLog>
      {activity && <Activity></Activity>}
      <ChatForm></ChatForm>
    </div>
  )
}

export default ChatPanel