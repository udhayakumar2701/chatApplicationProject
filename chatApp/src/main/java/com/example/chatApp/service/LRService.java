package com.example.chatApp.service;

import com.example.chatApp.database.FrdsEntity;
import com.example.chatApp.database.RegisterEntity;
import com.example.chatApp.model.LoginModel;
import com.example.chatApp.model.RegisterModel;
import com.example.chatApp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LRService {

    private final UserRepo userRepo;
    private final FriendsService friendsService;
    private final MessageService messageService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LRService(UserRepo userRepo, @Lazy  FriendsService friendsService, MessageService messageService, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.friendsService = friendsService;
        this.messageService = messageService;
        this.passwordEncoder = passwordEncoder;
    }

    // method used to add the new user
    public ResponseEntity<?> addNewUser(RegisterModel newUserData) {

        if(userRepo.existsByUserName(newUserData.getUsername())){

         return new ResponseEntity<>("User already exists",HttpStatus.BAD_REQUEST);

        }
        else{
            System.out.println(newUserData.toString());

            if(!newUserData.getPassword().equals(newUserData.getRetryPassword())) {
                return new ResponseEntity<>("Password Word Does Not Match",HttpStatus.BAD_REQUEST);
            }
            else if( newUserData.getPassword().length()<7) {
                return new ResponseEntity<>("Password Word length Must contains 7 letters", HttpStatus.BAD_REQUEST);
            }
            else{
                userRepo.save(new RegisterEntity(newUserData.getUsername(), passwordEncoder.encode(newUserData.getPassword())));
                return new ResponseEntity<>("User Add successfully", HttpStatus.OK);
            }

        }

    }


    public RegisterEntity findUserById(String userName){

        return userRepo.findByUserName(userName);

    }

    public ResponseEntity<?> loginAuth(LoginModel userLoginData) {
        if(userLoginData.getPassword()!=null && userLoginData.getUsername()!=null && !userLoginData.getUsername().equals("") && !userLoginData.getPassword().equals("")){
            RegisterEntity registerEntity = findUserById(userLoginData.getUsername());

            if(registerEntity==null){
                return  new ResponseEntity<>("user doesn't exist",HttpStatus.BAD_REQUEST);
            }
            if (passwordEncoder.matches(userLoginData.getPassword(), registerEntity.getPassword()) ) {


                return new ResponseEntity<>(fetchAndMerge(userLoginData.getUsername()), HttpStatus.OK);
            }
            else{
                System.out.println(registerEntity.getPassword()+" "+(passwordEncoder.encode(userLoginData.getPassword())));
                return  new ResponseEntity<>("Password Wrong",HttpStatus.BAD_REQUEST );
            }
        }
        return new ResponseEntity<>("Plz enter the Value in field",HttpStatus.BAD_REQUEST);

    }


    public List<FrdsEntity> fetchAndMerge(String userName){
      List<FrdsEntity> first= friendsService.findByUserId(userName);
      List<FrdsEntity> second=friendsService.findByFriendId(userName);
      if (!first.isEmpty() && !second.isEmpty()){
        first.addAll(second);
          return first;
      }
        return (first.isEmpty())?second:first;


    }
}
