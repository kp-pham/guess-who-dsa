import ChatForm from './ChatForm.jsx'
import ChatLog from './ChatLog.jsx'
import '../styles/ChatPanel.css'

function ChatPanel({ socket }) {
  return (
    <div id="chat-panel">
      <ChatLog></ChatLog>
      <ChatForm socket={socket}></ChatForm>
    </div>
  )
}

export default ChatPanel