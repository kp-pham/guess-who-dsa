import '../styles/ChatForm.css'

function ChatForm() {
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey)
      document.querySelector('textarea').value = ''
  }

  return (
    <form id="chat-form">
      <textarea onKeyDown={handleKeyDown} placeholder="Enter your message here..."></textarea>
    </form>
  )
}

export default ChatForm