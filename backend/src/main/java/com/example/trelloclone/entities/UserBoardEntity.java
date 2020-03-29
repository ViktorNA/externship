package com.example.trelloclone.entities;

import lombok.Data;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Data
@DiscriminatorValue(value = "UB")
public class UserBoardEntity extends BoardEntity {
    @ManyToOne
    private UserEntity user;
}
