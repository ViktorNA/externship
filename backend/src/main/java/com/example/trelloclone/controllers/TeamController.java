package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.TeamBoardEntity;
import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import com.example.trelloclone.playloads.ApiResponse;
import com.example.trelloclone.playloads.TeamResponse;
import com.example.trelloclone.security.CurrentUser;
import com.example.trelloclone.security.UserPrincipal;
import com.example.trelloclone.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/teams")
@CrossOrigin
public class TeamController {
  @Autowired TeamService teamService;

  @GetMapping("")
  public List<TeamResponse> getTeamsOfUser(@CurrentUser UserPrincipal user) {
    return teamService.getTeamsOfUser(user);
  }

  @GetMapping("{id}")
  public ResponseEntity<TeamResponse> getTeamById(
      @CurrentUser UserPrincipal user, @PathVariable Long id) {
    return teamService.getTeamById(id, user);
  }

  @PostMapping("")
  public ResponseEntity<TeamEntity> createTeam(
      @CurrentUser UserPrincipal user, @RequestBody TeamEntity teamEntity) {
    return teamService.createTeam(teamEntity, user);
  }

  @PutMapping("rename")
  public ResponseEntity<ApiResponse> renameTeam(
      @CurrentUser UserPrincipal user, @RequestBody TeamEntity teamEntity) {
    return teamService.renameTeam(teamEntity.getId(), teamEntity.getName(), user);
  }

  @DeleteMapping("")
  public ResponseEntity<ApiResponse> deleteTeamById(
      @CurrentUser UserPrincipal user, @RequestParam Long teamId) {
    return teamService.deleteTeamById(teamId, user);
  }

  @PutMapping("addUserToTeam")
  public ResponseEntity<ApiResponse> addUserToTeam(
      @RequestParam Long teamId, @RequestParam Long userId) {
    return teamService.addUserToTeam(teamId, userId);
  }

  @PutMapping("deleteUserFromTeam")
  public ResponseEntity<ApiResponse> deleteUserFromTeam(
      @RequestParam Long teamId, @RequestParam Long userId) {
    return teamService.deleteUserFromTeam(teamId, userId);
  }

  @GetMapping("usersOfTeam/{teamId}")
  public ResponseEntity<List<UserEntity>> getUsersOfTeam(
      @CurrentUser UserPrincipal user, @PathVariable Long teamId) {
    return teamService.getUsersOfTeam(teamId, user);
  }

  @GetMapping("boardsOfTeam/{boardId}")
  public ResponseEntity<List<TeamBoardEntity>> getBoardsOfTeam(
      @CurrentUser UserPrincipal user, @PathVariable Long boardId) {
    return teamService.getBoardsOfTeam(boardId, user);
  }

  @PostMapping("createBoard")
  public ResponseEntity<TeamBoardEntity> createBoard(
      @CurrentUser UserPrincipal user,
      @RequestBody TeamBoardEntity teamBoardEntity,
      @RequestParam Long teamId) {
    return teamService.createBoardOfTeam(user, teamId, teamBoardEntity);
  }

  @DeleteMapping("deleteBoard")
  public ResponseEntity<ApiResponse> deleteBoard(
      @CurrentUser UserPrincipal user, @RequestParam Long teamId, @RequestParam Long boardId) {
    return teamService.deleteBoardFromTeam(user, teamId, boardId);
  }
}
