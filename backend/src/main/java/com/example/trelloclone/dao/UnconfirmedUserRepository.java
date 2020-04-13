package com.example.trelloclone.dao;

import com.example.trelloclone.entities.UnconfirmedUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnconfirmedUserRepository extends JpaRepository<UnconfirmedUserEntity, Long> {
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByConfirmToken(String confirmToken);

    UnconfirmedUserEntity findByConfirmToken(String confirmToken);
}
