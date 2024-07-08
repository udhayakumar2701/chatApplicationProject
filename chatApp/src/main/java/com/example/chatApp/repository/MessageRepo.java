package com.example.chatApp.repository;

import com.example.chatApp.database.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepo extends JpaRepository<MessageEntity,Long> {

    Optional<MessageEntity> findByFrdsEntityId(Long frdsEntityId);
}
