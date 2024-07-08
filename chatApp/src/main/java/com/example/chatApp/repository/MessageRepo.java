package com.example.chatApp.service;

import com.example.chatApp.database.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<MessageEntity,Long> {
}
