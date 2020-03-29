package com.example.trelloclone.services;

import com.example.trelloclone.dao.TeamRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
  @Autowired TeamRepository teamRepository;
  @Autowired UserRepository userRepository;

  public List<TeamEntity> getAllTeams() {
    return teamRepository.findAll();
  }

  public TeamEntity createTeam(TeamEntity teamEntity) {
    return teamRepository.saveAndFlush(teamEntity);
  }

  public TeamEntity updateTeam(TeamEntity teamEntity) {
    if (teamRepository.existsById(teamEntity.getId())) {
      return teamRepository.saveAndFlush(teamEntity);
    }
    return null;
  }

  public void deleteTeamById(Long teamId) {
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    // TODO: streams
    for (UserEntity userEntity : teamEntity.getUsers()) {
      teamEntity.removeUser(userEntity);
    }
    teamRepository.delete(teamEntity);
  }

  public void addUserToTeam(Long teamId, Long userId) {
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    UserEntity userEntity = userRepository.getOne(userId);
    teamEntity.getUsers().add(userEntity);
    userEntity.getTeams().add(teamEntity);
    teamRepository.saveAndFlush(teamEntity);
  }

  public void deleteUserFromTeam(Long teamId, Long userId) {
    TeamEntity teamEntity = teamRepository.getOne(teamId);
    UserEntity userEntity = userRepository.getOne(userId);
    teamEntity.getUsers().remove(userEntity);
    userEntity.getTeams().remove(teamEntity);
    teamRepository.saveAndFlush(teamEntity);
    userRepository.saveAndFlush(userEntity);
  }

  public List<UserEntity> getUsersOfTeam(Long teamId) {
    return teamRepository.getOne(teamId).getUsers();
  }
}
