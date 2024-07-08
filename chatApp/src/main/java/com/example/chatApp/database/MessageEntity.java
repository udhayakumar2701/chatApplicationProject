package com.example.chatApp.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Entity
@Table(name="Message")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long Id;

    // FrdsEntity Id is the userId
    @Column(name="usersId")
    Long frdsEntityId;


    @Column(name="message")
    HashMap<String, ArrayList<String>> message;
}
