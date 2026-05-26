import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [name, setName] = useState("Atharv");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      name,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", data);

    setMessages((prev) => [
      ...prev,
      {
        ...data,
        self: true,
      },
    ]);

    setMessage("");
  };

  return (
    <div className="app">

      <div className="sidebar">
        <div className="logo">
          Community Chat
        </div>

        <div className="room active">
          💬 General Chat
        </div>

        <div className="room">
          ⚛️ React Discussion
        </div>

        <div className="room">
          🚀 MERN Stack
        </div>

        <div className="room">
          📚 Exam Discussion
        </div>
      </div>

      <div className="chat-section">

        <div className="chat-header">
          <div>
            <h2>General Chat</h2>
            <p>Online</p>
          </div>

          <div className="online-dot"></div>
        </div>

        <div className="chat-box">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.self
                  ? "message own"
                  : "message"
              }
            >
              <span className="sender">
                {msg.name}
              </span>

              <p>{msg.text}</p>

              <small>{msg.time}</small>
            </div>
          ))}

          <div ref={messagesEndRef}></div>
        </div>

        <div className="input-box">

          <input
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="message-input"
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;