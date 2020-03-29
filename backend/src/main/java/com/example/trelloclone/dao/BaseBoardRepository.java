package com.example.trelloclone.dao;

import com.example.trelloclone.entities.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseBoardRepository<EntityType extends BoardEntity>
    extends JpaRepository<EntityType, Long> {}
