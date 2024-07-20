package com.example.chatApp.service;

import com.example.chatApp.database.Message;
import com.example.chatApp.database.MessageEntity;
import com.example.chatApp.database.FrdsEntity;
import com.example.chatApp.model.SendModel;
import com.example.chatApp.repository.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageService {

    @Autowired
    MessageRepo messageRepo;


   //  Method is used to create the chat between the user and userFrds
    public void addNewMessageList(FrdsEntity usersData){
        MessageEntity newChat=new MessageEntity();
        List<Message>message=new ArrayList<>();
        message.add(new Message(usersData.getUserId(),"Helloo"));
        message.add(new Message(usersData.getFrdId(),"Helloo"));
    // The below line are used to find the value in the database
        newChat.setFrdsEntityId(usersData.getId());
        System.out.println("In message server "+message.toString());
        newChat.setMessage(message);
      // This line are used to save the value in the DB
        messageRepo.save(newChat);
    }


    public Optional<MessageEntity> findByUserID(Long frdsEntityId) {
        return messageRepo.findByFrdsEntityId(frdsEntityId);
    }

    public ResponseEntity<?> saveMessage(SendModel sendModel) {

        Optional<MessageEntity> messageEntityOptional=messageRepo.findByFrdsEntityId(sendModel.getChatId());
        System.out.println(messageEntityOptional.toString());


        if (messageEntityOptional.isPresent()) {
            MessageEntity messageEntity = messageEntityOptional.get();


             List<Message> messageMap = messageEntity.getMessage();
              messageMap.add(new Message(sendModel.getSenderId(), sendModel.getSenderMessage()));
             messageRepo.save(messageEntity);
            return new ResponseEntity<>(messageEntity, HttpStatus.OK);
            }


            return new ResponseEntity<>("Sorry Server Went Down", HttpStatus.BAD_REQUEST);



    }
}
