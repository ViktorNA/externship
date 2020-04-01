package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import com.example.trelloclone.playloads.ApiResponse;
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
  public List<TeamEntity> getTeamsOfUser(@CurrentUser UserPrincipal user) {
    return teamService.getTeamsOfUser(user);
  }

  @PostMapping("")
  public TeamEntity createTeam(@CurrentUser UserPrincipal user, @RequestBody TeamEntity teamEntity) {
    return teamService.createTeam(teamEntity, user);
  }

  @PutMapping("")
  public ResponseEntity<ApiResponse> updateTeam(@RequestBody TeamEntity teamEntity) {
    return teamService.updateTeam(teamEntity);
  }

  @DeleteMapping("")
  public ResponseEntity<ApiResponse> deleteTeamById(@RequestParam Long teamId) {
    return teamService.deleteTeamById(teamId);
  }

  @PutMapping("addUserToTeam")
  public ResponseEntity<ApiResponse> addUserToTeam(@RequestParam Long teamId, @RequestParam Long userId) {
    return teamService.addUserToTeam(teamId, userId);
  }

  @PutMapping("deleteUserFromTeam")
  public ResponseEntity<ApiResponse> deleteUserFromTeam(@RequestParam Long teamId, @RequestParam Long userId) {
    return teamService.deleteUserFromTeam(teamId, userId);
  }

  @GetMapping("usersOfTeam/{teamId}")
  public ResponseEntity<List<UserEntity>> getUsersOfTeam(@PathVariable Long teamId) {
    return teamService.getUsersOfTeam(teamId);
  }
}
