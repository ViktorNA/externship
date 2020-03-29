package com.example.trelloclone.dao;

import com.example.trelloclone.entities.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository
    extends BaseBoardRepository<BoardEntity>, JpaRepository<BoardEntity, Long> {}
