package com.example.chatApp.controller;



import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/chat")
@CrossOrigin(origins = "http://localhost:8080")
public class chatController {


    public Message sendMessage(Message message) {
        return message;
    }
}
