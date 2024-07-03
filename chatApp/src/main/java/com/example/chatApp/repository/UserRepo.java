package com.example.chatApp.repository;

import com.example.chatApp.database.registerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepo extends JpaRepository<registerEntity,Long> {

    registerEntity findByUserName(String userName);

    boolean existsByUserName(String userName);
}
