package com.example.trelloclone.playloads;

import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class TeamResponse {
    private Long id;
    private String name;
    private Integer memberCount;
    private Integer boardCount;
    private UserEntity creator;
    public TeamResponse(TeamEntity team) {
        this.id = team.getId();
        this.name = team.getName();
        this.memberCount = team.getUsers().size();
        this.boardCount = team.getBoards().size();
        this.creator = team.getCreator();
    }
}
