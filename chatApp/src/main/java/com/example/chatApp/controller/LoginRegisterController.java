package com.example.chatApp.controller;


import com.example.chatApp.model.loginModel;
import com.example.chatApp.model.registerModel;
import com.example.chatApp.service.LRService;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class loginRegisterController {

    @Autowired
    LRService userService;

    public loginRegisterController(LRService userService){
        this.userService=userService;
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody loginModel userLoginData) {

        System.out.println(userLoginData.toString());
        return userService.loginAuth(userLoginData);
    }

    @PostMapping("/register")
    ResponseEntity<?> register(@RequestBody registerModel newUserData){
        return userService.addNewUser(newUserData);
    }

}
