import { useEffect, useState, useRef} from 'react'
import { useSocketContext } from '../contexts/hooks.js'
import '../styles/Activity.css'

function Activity() {
  const timerRef = useRef(null)
  const [activity, setActivity] = useState(false)
  const { socket } = useSocketContext()

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
    <div 
      style={{ visibility: activity ? "visible" : "hidden" }}
      id="activity"
    >
      Opponent is typing...
    </div>
  )
}

export default Activity