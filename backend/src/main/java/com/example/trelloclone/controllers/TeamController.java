package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import com.example.trelloclone.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/teams")
@CrossOrigin
public class TeamController {
  @Autowired TeamService teamService;

  @GetMapping("")
  public List<TeamEntity> getAllTeams() {
    return teamService.getAllTeams();
  }

  @PostMapping("")
  public TeamEntity createTeam(@RequestBody TeamEntity teamEntity) {
    return teamService.createTeam(teamEntity);
  }

  @PutMapping("")
  public TeamEntity updateTeam(@RequestBody TeamEntity teamEntity) {
    return teamService.updateTeam(teamEntity);
  }

  @DeleteMapping("")
  public void deleteTeamById(@RequestParam Long teamId) {
    teamService.deleteTeamById(teamId);
  }

  @PutMapping("addUserToTeam")
  public void addUserToTeam(@RequestParam Long teamId, @RequestParam Long userId) {
    teamService.addUserToTeam(teamId, userId);
  }

  @PutMapping("deleteUserFromTeam")
  public void deleteUserFromTeam(@RequestParam Long teamId, @RequestParam Long userId) {
    teamService.deleteUserFromTeam(teamId, userId);
  }

  @GetMapping("usersOfTeam/{teamId}")
  public List<UserEntity> getUsersOfTeam(@PathVariable Long teamId) {
    return teamService.getUsersOfTeam(teamId);
  }
}
