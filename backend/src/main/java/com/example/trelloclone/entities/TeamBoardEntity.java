package com.example.trelloclone.entities;

import lombok.Data;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Data
@DiscriminatorValue(value = "TB")
public class TeamBoardEntity extends BoardEntity{
    @ManyToOne
    private TeamEntity team;
}
