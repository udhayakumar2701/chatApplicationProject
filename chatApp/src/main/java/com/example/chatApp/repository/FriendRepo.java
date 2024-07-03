package com.example.chatApp.repository;

import com.example.chatApp.database.FrdsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepo extends JpaRepository<FrdsEntity,Long> {

    FrdsEntity findByUserIdAndFrdId(String UserId, String frdId);


    List<FrdsEntity> findAllByUserId(String userId);

    List<FrdsEntity> findAllByFrdId(String frdId);
}
