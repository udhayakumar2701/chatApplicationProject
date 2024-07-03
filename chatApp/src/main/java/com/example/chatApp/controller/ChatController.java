package com.example.chatApp.controller;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @GetMapping("/specificUser")
    public ResponseEntity<?> specificChat(@RequestParam("userId") String userId){
        System.out.println(userId);
        return new ResponseEntity<>("User", HttpStatus.OK);

    }
}
