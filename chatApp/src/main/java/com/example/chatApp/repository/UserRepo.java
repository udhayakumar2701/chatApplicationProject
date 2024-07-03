package com.example.chatApp.repository;

import com.example.chatApp.database.RegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<RegisterEntity,Long> {

    RegisterEntity findByUserName(String userName);

    boolean existsByUserName(String userName);
}
