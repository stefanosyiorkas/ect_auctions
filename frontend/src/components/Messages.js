import React, { useEffect, useState } from "react";
import api from "../api";
import "./Register.css";

const Messages = ({ refreshUnread }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [activeTab, setActiveTab] = useState("inbox");
  const [form, setForm] = useState({ receiverId: "", content: "" });
  const unreadCount = inbox.filter((m) => !m.readFlag).length;

  const fetchInbox = async () => {
    try {
      const res = await api.get(`/messages/inbox/${user.id}`);
      setInbox(res.data);
    } catch {
      setInbox([]);
    }
  };

  const fetchSent = async () => {
    try {
      const res = await api.get(`/messages/sent/${user.id}`);
      setSent(res.data);
    } catch {
      setSent([]);
    }
  };

  useEffect(() => {
    fetchInbox();
    fetchSent();
    if (refreshUnread) refreshUnread();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await api.post("/messages", {
      sender: { id: user.id },
      receiver: { id: form.receiverId },
      content: form.content,
    });
    setForm({ receiverId: "", content: "" });
    fetchSent();
  };

  const markRead = async (id) => {
    await api.put(`/messages/${id}/read`);
    fetchInbox();
    if (refreshUnread) refreshUnread();
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await api.delete(`/messages/${id}`);
    fetchInbox();
    fetchSent();
    if (refreshUnread) refreshUnread();
  };

  const MessageList = ({ items }) => (
    <ul>
      {items.map((m) => (
        <li key={m.id} style={{ marginBottom: "12px" }}>
          <div>
            <strong>From:</strong> {m.sender.username} <br />
            <strong>To:</strong> {m.receiver.username} <br />
            <span>{m.content}</span>
            <br />
            <small>{new Date(m.sentTime).toLocaleString()}</small>
          </div>
          {activeTab === "inbox" && !m.readFlag && (
            <button onClick={() => markRead(m.id)} style={{ marginRight: 8 }}>
              Mark Read
            </button>
          )}
          <button onClick={() => deleteMessage(m.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="register-container">
      <h2>Messages</h2>
      <form onSubmit={sendMessage} style={{ marginBottom: 20 }}>
        <input
          placeholder="Receiver ID"
          value={form.receiverId}
          onChange={(e) => setForm({ ...form, receiverId: e.target.value })}
          required
        />
        <input
          placeholder="Message"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <button type="submit">Send</button>
      </form>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("inbox")}
          style={{ marginRight: 10 }}
        >
          Inbox {unreadCount > 0 && `(${unreadCount})`}
        </button>
        <button onClick={() => setActiveTab("sent")}>Sent</button>
      </div>
      {activeTab === "inbox" ? <MessageList items={inbox} /> : <MessageList items={sent} />}
    </div>
  );
};

export default Messages;
