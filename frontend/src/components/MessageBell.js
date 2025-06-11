import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const MessageBell = ({ userId, unread, refreshUnread }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggle = () => {
    if (!open) {
      api.get(`/messages/inbox/${userId}`).then(res => setMessages(res.data)).catch(() => setMessages([]));
    }
    setOpen(!open);
  };

  const markRead = async (id) => {
    await api.put(`/messages/${id}/read`).catch(() => {});
    setMessages(prev => prev.map(m => m.id === id ? { ...m, readFlag: true } : m));
    if (refreshUnread) refreshUnread();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span onClick={toggle} style={{ cursor: "pointer", fontSize: "20px" }}>
        🔔{unread > 0 && <span style={{ color: "crimson" }}>({unread})</span>}
      </span>
      {open && (
        <div style={{ position: "absolute", right: 0, top: "28px", zIndex: 1000, background: "#fff", border: "1px solid #ccc", padding: "10px", width: "300px" }}>
          <h4 style={{ marginTop: 0 }}>Inbox</h4>
          {messages.length === 0 ? (
            <p>No messages</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, maxHeight: "200px", overflowY: "auto" }}>
              {messages.map((m) => (
                <li key={m.id} style={{ marginBottom: "8px", borderBottom: "1px solid #eee" }}>
                  <strong>{m.sender.username}</strong>: {m.content}
                  <br />
                  <small>{new Date(m.sentTime).toLocaleString()}</small>
                  {!m.readFlag && (
                    <button onClick={() => markRead(m.id)} style={{ marginLeft: 8 }}>
                      Mark read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          <Link to="/messages" onClick={() => setOpen(false)}>Open Messages</Link>
        </div>
      )}
    </div>
  );
};

export default MessageBell;
