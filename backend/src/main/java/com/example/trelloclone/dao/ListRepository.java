package com.example.trelloclone.dao;

import com.example.trelloclone.entities.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepository extends JpaRepository<ListEntity, Long> {
    ListEntity findByIndex(Integer index);
}
