package com.example.chatApp.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="USER")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="userId")
    Long userId;

    @Column(name="userName")
    String userName;

    @Column(name="password")
    String password;

   public RegisterEntity(String userName, String password){
        this.userName=userName;
        this.password=password;
    }

}
