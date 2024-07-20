package com.example.chatApp.controller;



import com.example.chatApp.database.FrdsEntity;
import com.example.chatApp.model.FriendModel;
import com.example.chatApp.model.SendModel;
import com.example.chatApp.repository.MessageRepo;
import com.example.chatApp.service.FriendsService;
import com.example.chatApp.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

   private final  MessageService messageService;
   private final FriendsService friendsService;

    @Autowired
    public ChatController(MessageService messageService,FriendsService friendsService) {
        this.messageService = messageService;
        this.friendsService=friendsService;
    }


    @GetMapping("/specificUser")
    public ResponseEntity<?> specificChat(@RequestParam("chatId") String chatId){

        System.out.println(chatId);
        return new ResponseEntity<>(messageService.findByUserID(Long.valueOf(chatId)), HttpStatus.OK);

    }

    @PostMapping("/addNewFriend")
    public ResponseEntity<?> addNewFriend(@RequestBody FriendModel friendModel){
        System.out.println(friendModel.toString());
        return   friendsService.addFriends(friendModel);

    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody SendModel sendModel){
        System.out.println(sendModel.toString());

       return  messageService.saveMessage(sendModel);


    }

}
