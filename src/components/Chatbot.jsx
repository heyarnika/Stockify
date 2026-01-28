import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Fin Advisor. How can I help you today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");

  const send = (e) => {
    e.preventDefault(); 
    if (userInput.trim() !== "") {
      const userMessage = { text: userInput, sender: "user" };
      setMessages([...messages, userMessage]); 
      setUserInput(""); 
    }
  };

  return (
    <div className="chat-box">
      <div className="message-area">
        {messages.map((msg, i) => (
          /* Wrap everything in a message-row to handle the layout */
          <div key={i} className={`message-row ${msg.sender}`}>
            <span className="icon">{msg.sender === "bot" ? "🤖" : "👤"}</span>
            <div className="bubble">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="input-row">
        <input 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;