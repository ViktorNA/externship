package com.example.trelloclone.services;

import com.example.trelloclone.dao.BoardRepository;
import com.example.trelloclone.dao.UserBoardRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserBoardEntity;
import com.example.trelloclone.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
  @Autowired UserRepository userRepository;
  @Autowired BoardRepository boardRepository;
  @Autowired UserBoardRepository userBoardRepository;

  public UserEntity createUser(UserEntity userEntity) {
    return userRepository.saveAndFlush(userEntity);
  }

  public List<UserEntity> getAllUsers() {
    return userRepository.findAll();
  }

  public UserEntity assignBoardToUser(Long boardId, Long userId) {
    UserEntity userEntity = userRepository.getOne(userId);
    UserBoardEntity boardEntity = userBoardRepository.getOne(boardId);
    userEntity.getBoards().add(boardEntity);
    return userRepository.saveAndFlush(userEntity);
  }
  
  public UserEntity getUserById(Long userId){
    return userRepository.getOne(userId);
  }

  public void deleteUserById(Long userId) {
    userRepository.deleteById(userId);
  }

  public List<TeamEntity> getTeamsOfUser(Long userId) {
    return userRepository.getOne(userId).getTeams();
  }
}
