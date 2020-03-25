package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.UserEntity;
import com.example.trelloclone.services.BoardService;
import com.example.trelloclone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UserController {
  @Autowired UserService userService;
  
  @GetMapping("{id}")
  public UserEntity getUserById(@PathVariable Long id){
    return userService.getUserById(id);
}

  @GetMapping
  public List<UserEntity> getAllUsers() {
    return userService.getAllUsers();
  }

  @PostMapping
  public UserEntity createUser(@RequestBody UserEntity userEntity) {
    return userService.createUser(userEntity);
  }

  @PostMapping("assignBoardToUser")
  public UserEntity assignBoardToUser(@RequestParam Long userId, @RequestParam Long boardId) {
    return userService.assignBoardToUser(userId, boardId);
  }
}