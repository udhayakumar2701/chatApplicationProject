package com.example.chatApp.service;

import com.example.chatApp.database.registerEntity;
import com.example.chatApp.model.loginModel;
import com.example.chatApp.model.registerModel;
import com.example.chatApp.repository.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class LRService {

    @Autowired
    userRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public LRService(userRepo userRepo){
        this.userRepo=userRepo;
    }

    // method used to add the new user
    public ResponseEntity<?> addNewUser(registerModel newUserData) {

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
                userRepo.save(new registerEntity(newUserData.getUsername(), passwordEncoder.encode(newUserData.getPassword())));
                return new ResponseEntity<>("User Add successfully", HttpStatus.OK);
            }

        }

    }


    public registerEntity findUserById(String userName){

        return userRepo.findByUserName(userName);

    }

    public ResponseEntity<?> loginAuth(loginModel userLoginData) {
        if(userLoginData.getPassword()!=null && userLoginData.getUsername()!=null && !userLoginData.getUsername().equals("") && !userLoginData.getPassword().equals("")){
            registerEntity RegisterEntity = findUserById(userLoginData.getUsername());

            if(RegisterEntity==null){
                return  new ResponseEntity<>("user doesn't exist",HttpStatus.BAD_REQUEST);
            }
            if (RegisterEntity.getPassword().matches(passwordEncoder.encode(userLoginData.getPassword())) ) {
                return new ResponseEntity<>("Login in successfully", HttpStatus.OK);
            }
            else{
                return  new ResponseEntity<>("Password Wrong",HttpStatus.BAD_REQUEST );
            }
        }
        return new ResponseEntity<>("Plz enter the Value in field",HttpStatus.BAD_REQUEST);

    }
}
