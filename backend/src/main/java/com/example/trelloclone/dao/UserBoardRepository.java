package com.example.trelloclone.dao;

import com.example.trelloclone.entities.UserBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBoardRepository
    extends BaseBoardRepository<UserBoardEntity>, JpaRepository<UserBoardEntity, Long> {}
