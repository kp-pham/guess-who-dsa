import Activity from './Activity.jsx'
import ChatForm from './ChatForm.jsx'
import ChatLog from './ChatLog.jsx'
import '../styles/ChatPanel.css'

function ChatPanel() {
  return (
    <div id="chat-panel">
      <ChatLog></ChatLog>
      <Activity></Activity>
      <ChatForm></ChatForm>
    </div>
  )
}

export default ChatPanel