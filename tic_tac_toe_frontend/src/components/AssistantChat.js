import React, { useState, useRef } from "react";
import "./AssistantChat.css";

/*
  AssistantChat - Floating AI Assistant Chat Widget

  This widget allows users to chat with an OpenAI-powered assistant.
  SECURITY: Never expose the API key to the frontend!

  How to enable:
    - The UI here is a stub. All OpenAI API requests should be routed
      through a backend or proxy server, which uses the OPENAI_API_KEY
      securely from the environment.
    - See the comments in sendMessageToAssistantStub() for where
      backend code should be plugged in if/when available.
    - If no backend is set up yet, the assistant just echoes your question.

  UI Features:
    - Floating chat button (bottom-right)
    - Pop-up chat window with message history
    - Input area for user messages
*/

function AssistantChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hi! I'm your AI assistant. Ask me about Tic Tac Toe or anything else.",
    },
  ]);
  const [sending, setSending] = useState(false);
  const inputRef = useRef();

  // PUBLIC_INTERFACE
  const handleToggle = () => setOpen((prev) => !prev);

  // PUBLIC_INTERFACE
  const handleInputChange = (e) => setInput(e.target.value);

  // PUBLIC_INTERFACE
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();

    setMessages((msgs) => [...msgs, { sender: "user", text: userMsg }]);
    setInput("");
    setSending(true);

    // Replace this with a real backend call
    const assistantReply = await sendMessageToAssistantStub(userMsg);

    setMessages((msgs) => [...msgs, { sender: "assistant", text: assistantReply }]);
    setSending(false);

    // refocus input
    inputRef.current && inputRef.current.focus();
  };

  // PUBLIC_INTERFACE
  async function sendMessageToAssistantStub(userMessage) {
    // --- IMPORTANT: This is a stub! ---
    // In production, send fetch() to your backend endpoint, e.g.:
    //   POST /api/assistant { "message": userMessage }
    // Backend should read the OpenAI API key from secure env, NOT from frontend.
    // Example response: { reply: "...OpenAI answer..." }
    //
    // (See README or comments: see instructions above.)

    // Demo: simple echo and canned answer.
    if (
      userMessage.match(/tictactoe|tic tac toe|game|how|rule|win|lose|draw/i)
    ) {
      return (
        "Tic Tac Toe is a game for 2 players who take turns marking spaces in a 3×3 grid. " +
        "The player who places three of their marks in a row (vertically, horizontally, or diagonally) wins!"
      );
    }
    return `Echo: "${userMessage}"\n\n(This is a demo. Backend/API integration needed to connect with OpenAI.)`;
  }

  return (
    <>
      <button className="assistant-fab" onClick={handleToggle} aria-label="Open AI Assistant">
        💬
      </button>
      {open && (
        <div className="assistant-chat-widget">
          <header className="assistant-header">
            <span role="img" aria-label="Robot">
              🤖
            </span>{" "}
            Ask Assistant
            <button className="assistant-close-btn" onClick={handleToggle} title="Close chat">
              &times;
            </button>
          </header>
          <div className="assistant-messages" aria-live="polite">
            {messages.map((msg, idx) => (
              <div key={idx} className={`assistant-msg assistant-msg--${msg.sender}`}>
                <div className="assistant-msg-inner">{msg.text}</div>
              </div>
            ))}
            {sending && (
              <div className="assistant-msg assistant-msg--assistant assistant-msg--typing">
                <span className="assistant-typing">Assistant is typing...</span>
              </div>
            )}
          </div>
          <form
            className="assistant-input-area"
            onSubmit={handleSend}
            autoComplete="off"
          >
            <input
              ref={inputRef}
              type="text"
              className="assistant-input"
              placeholder="Type a message..."
              value={input}
              onChange={handleInputChange}
              disabled={sending}
              minLength={1}
              maxLength={500}
              aria-label="Your message"
            />
            <button
              className="assistant-send-btn"
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send"
            >
              ➤
            </button>
          </form>
          <footer className="assistant-footer">
            <small>Powered by OpenAI • API key is never exposed</small>
          </footer>
        </div>
      )}
    </>
  );
}

export default AssistantChat;
