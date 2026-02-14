import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput;

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user" },
    ]);

    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: data.reply || "No response received.", sender: "bot" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Server connection error.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble bot typing">
            Typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask about stocks, SIPs, trading..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;