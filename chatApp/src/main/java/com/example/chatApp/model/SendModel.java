package com.example.chatApp.model;


import lombok.Data;

@Data
public class SendModel {
    Long chatId;
    String senderId;
    String senderMessage;
}
