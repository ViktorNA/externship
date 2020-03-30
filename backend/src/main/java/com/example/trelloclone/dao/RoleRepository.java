package com.example.trelloclone.dao;

import com.example.trelloclone.entities.RoleEntity;
import com.example.trelloclone.entities.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
  Optional<RoleEntity> findByName(RoleName roleName);
}
