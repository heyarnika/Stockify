import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm FinAdvisor. Ask me anything about stocks or SIPs!", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scrolls the chat to the bottom whenever a new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = { text: userInput, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Connection error. Is the backend running?", sender: "bot" }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="message-area">
        {messages.map((msg, i) => (
          <div key={i} className={`message-row ${msg.sender}`}>
            <span className="icon">{msg.sender === "bot" ? "🤖" : "👤"}</span>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        {loading && <div className="message-row bot"><div className="bubble">Typing...</div></div>}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-row" onSubmit={sendMessage}>
        <input 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about stocks..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;