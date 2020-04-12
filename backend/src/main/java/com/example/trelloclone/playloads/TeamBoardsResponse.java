package com.example.trelloclone.playloads;

import com.example.trelloclone.entities.TeamBoardEntity;
import com.example.trelloclone.entities.TeamEntity;
import lombok.Data;

import java.util.List;
import java.util.List;

@Data
public class TeamBoardsResponse {
  private Long id;
  private String name;
  private List<TeamBoardEntity> boards;

  public TeamBoardsResponse(TeamEntity team) {
    id = team.getId();
    name = team.getName();
    boards = team.getBoards();
  }
}
