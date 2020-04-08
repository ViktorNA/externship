package com.example.trelloclone.playloads;

import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import lombok.Data;

@Data
public class TeamResponse {
    private Long id;
    private String name;
    private String description;
    private Integer memberCount;
    private Integer boardCount;
    private UserEntity creator;
    public TeamResponse(TeamEntity team) {
        this.id = team.getId();
        this.name = team.getName();
        this.description = team.getDescription();
        this.memberCount = team.getUsers().size();
        this.boardCount = team.getBoards() == null ? 0 : team.getBoards().size();
        this.creator = team.getCreator();
    }
}
