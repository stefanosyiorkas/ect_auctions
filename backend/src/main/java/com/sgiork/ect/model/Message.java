package com.sgiork.ect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(length = 2000)
    private String content;

    private LocalDateTime sentTime;

    private boolean readFlag = false;

    public Long getId() { return id; }
    public User getSender() { return sender; }
    public User getReceiver() { return receiver; }
    public String getContent() { return content; }
    public LocalDateTime getSentTime() { return sentTime; }
    public boolean isReadFlag() { return readFlag; }

    public void setId(Long id) { this.id = id; }
    public void setSender(User sender) { this.sender = sender; }
    public void setReceiver(User receiver) { this.receiver = receiver; }
    public void setContent(String content) { this.content = content; }
    public void setSentTime(LocalDateTime sentTime) { this.sentTime = sentTime; }
    public void setReadFlag(boolean readFlag) { this.readFlag = readFlag; }
}
