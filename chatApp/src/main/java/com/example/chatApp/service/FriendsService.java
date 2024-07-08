package com.example.chatApp.service;

import com.example.chatApp.database.FrdsEntity;
import com.example.chatApp.database.RegisterEntity;
import com.example.chatApp.model.FriendModel;
import com.example.chatApp.repository.FriendRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FriendsService {


    private final LRService loginService;
    private final MessageService messageService;
    private final FriendRepo friendRepo;

    @Autowired
    public FriendsService(LRService loginService, MessageService messageService, FriendRepo friendRepo) {
        this.loginService = loginService;
        this.messageService = messageService;
        this.friendRepo = friendRepo;
    }

    // Methods is used to add the new friends to Chat
    public ResponseEntity<?> addFriends(FriendModel friendModel ){
        FrdsEntity first=isPresentInFriendEnttity(friendModel.getUserId(),friendModel.getFrdId());
        FrdsEntity second=isPresentInFriendEnttity(friendModel.getFrdId(),friendModel.getUserId());

        if(first!=null || second!=null){
            return new ResponseEntity<>("You Two are Already Friend ",HttpStatus.BAD_REQUEST);
        }
        else if(isPresent(friendModel.getFrdId())){
            friendRepo.save(new FrdsEntity(friendModel.getUserId(),friendModel.getFrdId()));
            FrdsEntity frd=findUserById(friendModel.getUserId(),friendModel.getFrdId());
             messageService.addNewMessageList(frd);// This line is used to create new chat for the users
            return new ResponseEntity<>("Add SuccessFully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Friend Id is Wrong",HttpStatus.UNAUTHORIZED);
    }

    // Mehtod is used to find the user from the database(FrdsEntity DB)
    public FrdsEntity findUserById(String userName, String friendName){
       return  friendRepo.findByUserIdAndFrdId(userName,friendName);
    }

    // Method used to Find the user is  present in the Database or Not
    // This check with DB(RegisterEntity)
    public boolean isPresent(String friendId){
        RegisterEntity user=loginService.findUserById(friendId);
        return (user!=null);

    }


    public List<FrdsEntity> findByUserId(String userId){
        return friendRepo.findAllByUserId(userId);
    }

    public List<FrdsEntity> findByFriendId(String friendId){
        return friendRepo.findAllByFrdId(friendId);
    }


    public FrdsEntity isPresentInFriendEnttity(String userId,String frdId){
        return friendRepo.findByUserIdAndFrdId(userId,frdId);
    }
}
