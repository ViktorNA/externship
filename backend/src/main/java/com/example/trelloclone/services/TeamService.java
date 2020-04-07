package com.example.trelloclone.services;

import com.example.trelloclone.dao.BoardRepository;
import com.example.trelloclone.dao.TeamBoardRepository;
import com.example.trelloclone.dao.TeamRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.TeamBoardEntity;
import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import com.example.trelloclone.exceptions.BadRequestException;
import com.example.trelloclone.exceptions.ResourceNotFoundException;
import com.example.trelloclone.playloads.ApiResponse;
import com.example.trelloclone.playloads.TeamResponse;
import com.example.trelloclone.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {
  @Autowired TeamRepository teamRepository;
  @Autowired UserRepository userRepository;
  @Autowired TeamBoardRepository boardRepository;

  public List<TeamEntity> getAllTeams() {
    return teamRepository.findAll();
  }

  public List<TeamResponse> getTeamsOfUser(UserPrincipal user) {
    List<TeamEntity> teams = userRepository.getOne(user.getId()).getTeams();
    return teams.parallelStream().map(TeamResponse::new).collect(Collectors.toList());
  }

  public ResponseEntity<TeamResponse> getTeamById(Long teamId, UserPrincipal user) {
    validateTeamAndUser(teamId, user.getId());
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    return new ResponseEntity<>(new TeamResponse(teamEntity), HttpStatus.OK);
  }

  public ResponseEntity<List<UserEntity>> getUsersOfTeam(Long teamId, UserPrincipal user) {
    validateTeamAndUser(teamId, user.getId());
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isUserBelongsToTeam = teamEntity.isUserBelongsToTeamById(user.getId());
    if (!isUserBelongsToTeam) throw new BadRequestException("User is not belong to team");
    List<UserEntity> usersOfTeam = teamEntity.getUsers();
    return new ResponseEntity<>(usersOfTeam, HttpStatus.OK);
  }

  public ResponseEntity<List<TeamBoardEntity>> getBoardsOfTeam(Long teamId, UserPrincipal user) {
    validateTeamAndUser(teamId, user.getId());
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isUserBelongsToTeam = teamEntity.isUserBelongsToTeamById(user.getId());
    if (!isUserBelongsToTeam) throw new BadRequestException("User is not belong to team");
    List<TeamBoardEntity> boardsOfTeam = teamEntity.getBoards();
    return new ResponseEntity<>(boardsOfTeam, HttpStatus.OK);
  }

  public ResponseEntity<TeamResponse> createTeam(TeamEntity teamEntity, UserPrincipal user) {
    boolean isUserExist = userRepository.existsById(user.getId());
    if (!isUserExist) throw new BadRequestException("User is not exist");
    UserEntity creator = userRepository.getOne(user.getId());
    teamEntity.setCreator(creator);
    teamEntity.setUsers(new ArrayList<>());
    teamEntity.getUsers().add(creator);
    creator.getTeams().add(teamEntity);
    TeamEntity team = teamRepository.saveAndFlush(teamEntity);
    userRepository.saveAndFlush(creator);
    return new ResponseEntity<>(new TeamResponse(team), HttpStatus.CREATED);
  }

  public ResponseEntity<ApiResponse> addUserToTeam(Long teamId, Long userId, UserPrincipal user) {
    UserEntity userEntity = userRepository.getOne(userId);
    validateTeamAndUser(teamId, userId);
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isUserCreatorOfTeam = teamEntity.getCreator().getId().equals(user.getId());
    if (!isUserCreatorOfTeam) throw new BadRequestException("Only creator can add users to team");
    if (teamEntity.isUserBelongsToTeamById(userId))
      throw new BadRequestException("User already belongs to team");
    teamEntity.getUsers().add(userEntity);
    userEntity.getTeams().add(teamEntity);
    teamRepository.saveAndFlush(teamEntity);
    return new ResponseEntity<>(
        new ApiResponse(true, "User added to team successfully"), HttpStatus.OK);
  }

  public ResponseEntity<ApiResponse> deleteUserFromTeam(Long teamId, Long userId, UserPrincipal user) {
    validateTeamAndUser(teamId, userId);
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isUserCreatorOfTeam = teamEntity.getCreator().getId().equals(user.getId());
    if (!isUserCreatorOfTeam) throw new BadRequestException("Only creator can delete users from team");
    if (!teamEntity.isUserBelongsToTeamById(userId))
      throw new BadRequestException("The user is not belong to the team");

    UserEntity userEntity = userRepository.getOne(userId);
    teamEntity.getUsers().remove(userEntity);
    userEntity.getTeams().remove(teamEntity);
    teamRepository.saveAndFlush(teamEntity);
    userRepository.saveAndFlush(userEntity);
    return new ResponseEntity<>(
        new ApiResponse(true, "User deleted from team successfully"), HttpStatus.OK);
  }

  public ResponseEntity<ApiResponse> deleteTeamById(Long teamId, UserPrincipal user) {
    validateTeamAndUser(teamId, user.getId());
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isUserCreatorOfTeam = teamId.equals(user.getId());
    if (isUserCreatorOfTeam) throw new BadRequestException("Delete team can only creator");
    List<UserEntity> usersOfTeam = teamEntity.getUsers();
    usersOfTeam.parallelStream().forEach(userEntity -> {
      userEntity.deleteTeamById(teamId);
      userRepository.saveAndFlush(userEntity);
    });
    return new ResponseEntity<>(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
  }

  public ResponseEntity<ApiResponse> updateTeam(Long teamId, TeamEntity newTeam, UserPrincipal user) {
    validateTeamAndUser(teamId, user.getId());
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    boolean isUserCreatorOfTeam = teamId.equals(user.getId());
    if (isUserCreatorOfTeam) throw new BadRequestException("Update team can only creator");
    teamEntity.setName(newTeam.getName());
    teamEntity.setDescription(newTeam.getDescription());
    teamRepository.saveAndFlush(teamEntity);
    return new ResponseEntity<>(new ApiResponse(true, "Renamed successfully"), HttpStatus.OK);
  }

  public ResponseEntity<TeamBoardEntity> createBoardOfTeam(
      UserPrincipal user, Long teamId, TeamBoardEntity board) {
    validateTeamAndUser(teamId, user.getId());
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    if (!teamEntity.isUserBelongsToTeamById(user.getId()))
      throw new BadRequestException("You is not belong to team");
    teamEntity.getBoards().add(board);
    board.setTeam(teamEntity);
    return new ResponseEntity<>(boardRepository.saveAndFlush(board), HttpStatus.CREATED);
  }

  public ResponseEntity<ApiResponse> deleteBoardFromTeam(
      UserPrincipal user, Long teamId, Long boardId) {
    validateTeamAndUser(teamId, user.getId());
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    if (teamEntity.isUserBelongsToTeamById(user.getId()))
      throw new BadRequestException("You is not belong to team");
    if (teamEntity.isBoardBelongsToTeamById(boardId))
      throw new BadRequestException("The board is not belong to the team");
    teamEntity.deleteBoardFromTeamById(boardId);
    return new ResponseEntity<>(
        new ApiResponse(true, "Board deleted from team"), HttpStatus.CREATED);
  }

  private void validateTeamAndUser(Long teamId, Long userId) {
    boolean isTeamExist = teamRepository.existsById(teamId);
    if (!isTeamExist) throw new ResourceNotFoundException("Team", "id " + teamId, new Object());
    boolean isUserExist = userRepository.existsById(userId);
    if (!isUserExist) throw new ResourceNotFoundException("User", "id " + userId, new Object());
  }
}
