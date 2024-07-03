package com.example.chatApp.service;

import com.example.chatApp.database.MessageEntity;
import com.example.chatApp.database.FrdsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class MessageService {

    @Autowired
    MessageRepo messageRepo;


   //  Method is used to create the chat between the user and userFrds
    public void addNewMessageList(FrdsEntity usersData){
        MessageEntity newChat=new MessageEntity();
        HashMap<String, ArrayList<String>>message=new HashMap<>();
        message.put(usersData.getUserId(),new ArrayList<>());
        message.put(usersData.getFrdId(), new ArrayList<>());
    // The below line are used to find the value in the database
        newChat.setFrdsEntityId(newChat.getId());
        newChat.setMessage(message);
      // This line are used to save the value in the DB
        messageRepo.save(newChat);
    }


}
