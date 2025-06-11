package com.sgiork.ect.controller;

import com.sgiork.ect.model.Message;
import com.sgiork.ect.model.User;
import com.sgiork.ect.repository.MessageRepository;
import com.sgiork.ect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
        Optional<User> senderOpt = userRepository.findById(message.getSender().getId());
        Optional<User> receiverOpt = userRepository.findById(message.getReceiver().getId());
        if (senderOpt.isEmpty() || receiverOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid sender or receiver");
        }
        message.setSender(senderOpt.get());
        message.setReceiver(receiverOpt.get());
        message.setSentTime(LocalDateTime.now());
        Message saved = messageRepository.save(message);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/inbox/{userId}")
    public List<Message> getInbox(@PathVariable Long userId) {
        return messageRepository.findByReceiverId(userId);
    }

    @GetMapping("/sent/{userId}")
    public List<Message> getSent(@PathVariable Long userId) {
        return messageRepository.findBySenderId(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        if (!messageRepository.existsById(id)) return ResponseEntity.notFound().build();
        messageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable Long id) {
        Optional<Message> opt = messageRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Message msg = opt.get();
        msg.setReadFlag(true);
        messageRepository.save(msg);
        return ResponseEntity.ok().build();
    }
}
