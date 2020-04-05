package com.example.trelloclone.dao;

import com.example.trelloclone.entities.TeamBoardEntity;
import com.example.trelloclone.entities.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<TeamEntity, Long> {}
