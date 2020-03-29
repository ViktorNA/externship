package com.example.trelloclone.dao;

import com.example.trelloclone.entities.TeamBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamBoardRepository
    extends BaseBoardRepository<TeamBoardEntity>, JpaRepository<TeamBoardEntity, Long> {}
