package com.example.chatApp.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="FriendEntity")
@AllArgsConstructor
@NoArgsConstructor
public class FrdsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long Id;

    @Column(name="UserId")
    String userId;

    @Column(name="frdId")
    String frdId;

    public FrdsEntity(String userId, String frdId){
        this.userId=userId;
        this.frdId=frdId;
    }
}
