package com.example.trelloclone.services;

import com.example.trelloclone.dao.BoardRepository;
import com.example.trelloclone.dao.UserBoardRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.TeamEntity;
import com.example.trelloclone.entities.UserBoardEntity;
import com.example.trelloclone.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

  public ResponseEntity<UserEntity> getUserByUsername(String username) {
    Optional<UserEntity> user = userRepository.findByUsername(username);
    if(user.isPresent()) {
      return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }
}
