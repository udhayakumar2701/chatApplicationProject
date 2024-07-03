package com.example.chatApp.service;

import com.example.chatApp.database.FrdsEntity;
import com.example.chatApp.database.RegisterEntity;
import com.example.chatApp.model.FriendModel;
import com.example.chatApp.repository.FriendRepo;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void addFriends(FriendModel friendModel ){
        if(isPresent(friendModel.getFrdId())){
            friendRepo.save(new FrdsEntity(friendModel.getUserId(),friendModel.getFrdId()));
            FrdsEntity frd=findUserById(friendModel.getUserId(),friendModel.getFrdId());
             messageService.addNewMessageList(frd);// This line is used to create new chat for the users
        }
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
}
