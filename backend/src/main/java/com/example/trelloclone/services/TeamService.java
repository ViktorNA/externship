package com.example.trelloclone.services;

import com.example.trelloclone.dao.TeamRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import com.example.trelloclone.playloads.ApiResponse;
import com.example.trelloclone.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {
  @Autowired TeamRepository teamRepository;
  @Autowired UserRepository userRepository;

  public List<TeamEntity> getAllTeams() {
    return teamRepository.findAll();
  }

  public List<TeamEntity> getTeamsOfUser(UserPrincipal user)  {
    return userRepository.getOne(user.getId()).getTeams();
  }

  public TeamEntity createTeam(TeamEntity teamEntity, UserPrincipal user) {
    UserEntity creator = userRepository.getOne(user.getId());
    teamEntity.setCreator(creator);
    teamEntity.setUsers(new ArrayList<>());
    teamEntity.getUsers().add(creator);
    creator.getTeams().add(teamEntity);
    userRepository.saveAndFlush(creator);
    return teamRepository.saveAndFlush(teamEntity);
  }

  public ResponseEntity<ApiResponse> updateTeam(TeamEntity teamEntity) {
    boolean isTeamExist = teamRepository.existsById(teamEntity.getId());
    if (isTeamExist) {
      teamRepository.saveAndFlush(teamEntity);
      return new ResponseEntity<>(new ApiResponse(true, "The team is updated"), HttpStatus.OK);
    }
    return new ResponseEntity<>(
        new ApiResponse(false, "The team is not exist"), HttpStatus.NOT_FOUND);
  }

  public ResponseEntity<ApiResponse> deleteTeamById(Long teamId) {
    boolean isTeamExist = teamRepository.existsById(teamId);
    if (!isTeamExist)
      return new ResponseEntity<>(
          new ApiResponse(false, "Team is not exist"), HttpStatus.NOT_FOUND);
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    List<UserEntity> usersOfTeam = teamEntity.getUsers();
    usersOfTeam.parallelStream().forEach(teamEntity::removeUser);
    teamRepository.delete(teamEntity);
    return new ResponseEntity<>(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
  }

  public ResponseEntity<ApiResponse> addUserToTeam(Long teamId, Long userId) {
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isTeamExist = teamRepository.existsById(teamId);
    if (!isTeamExist)
      return new ResponseEntity<>(
              new ApiResponse(false, "Team is not exist"), HttpStatus.NOT_FOUND);
    boolean isUserExist = teamRepository.existsById(teamId);
    if (!isUserExist)
      return new ResponseEntity<>(
              new ApiResponse(false, "User is not exist"), HttpStatus.NOT_FOUND);
    if (!teamEntity.isUserBelongsToTeamById(userId))
      return new ResponseEntity<>(
              new ApiResponse(false, "The user is already member of this team"),
              HttpStatus.BAD_REQUEST);
    UserEntity userEntity = userRepository.getOne(userId);
    teamEntity.getUsers().add(userEntity);
    userEntity.getTeams().add(teamEntity);
    teamRepository.saveAndFlush(teamEntity);
    return new ResponseEntity<>(
        new ApiResponse(true, "User added to team successfully"), HttpStatus.OK);
  }

  public ResponseEntity<ApiResponse> deleteUserFromTeam(Long teamId, Long userId) {
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isTeamExist = teamRepository.existsById(teamId);
    if (!isTeamExist)
      return new ResponseEntity<>(
              new ApiResponse(false, "Team is not exist"), HttpStatus.NOT_FOUND);
    boolean isUserExist = teamRepository.existsById(teamId);
    if (!isUserExist)
      return new ResponseEntity<>(
              new ApiResponse(false, "User is not exist"), HttpStatus.NOT_FOUND);
    if (!teamEntity.isUserBelongsToTeamById(userId))
      return new ResponseEntity<>(
              new ApiResponse(false, "The user is already member of this team"),
              HttpStatus.BAD_REQUEST);
    UserEntity userEntity = userRepository.getOne(userId);
    teamEntity.getUsers().remove(userEntity);
    userEntity.getTeams().remove(teamEntity);
    teamRepository.saveAndFlush(teamEntity);
    userRepository.saveAndFlush(userEntity);
    return new ResponseEntity<>(
            new ApiResponse(true, "User deleted from team successfully"), HttpStatus.OK);
  }

  public ResponseEntity<List<UserEntity>> getUsersOfTeam(Long teamId) {
    boolean isTeamExist = teamRepository.existsById(teamId);
    if (isTeamExist)
      return new ResponseEntity<>(teamRepository.getOne(teamId).getUsers(), HttpStatus.OK);
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }
}
