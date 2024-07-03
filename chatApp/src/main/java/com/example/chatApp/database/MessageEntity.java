package com.example.chatApp.database;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Entity
@Table(name="Message")
@Data
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long Id;

    // FrdsEntity Id is the userId
    @Column(name="usersId")
    Long FrdsEntityId;


    @Column(name="message")
    HashMap<String, ArrayList<String>> message;
}
