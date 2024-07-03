package com.example.chatApp.controller;


import com.example.chatApp.model.LoginModel;
import com.example.chatApp.model.RegisterModel;
import com.example.chatApp.service.LRService;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class LoginRegisterController {

    @Autowired
    LRService userService;



    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody LoginModel userLoginData) {
        System.out.println(userLoginData.toString());
        return userService.loginAuth(userLoginData);
    }

    @PostMapping("/register")
    ResponseEntity<?> register(@RequestBody RegisterModel newUserData){
        return userService.addNewUser(newUserData);
    }

}
