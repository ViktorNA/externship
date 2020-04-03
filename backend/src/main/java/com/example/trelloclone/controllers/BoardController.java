package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.TeamBoardEntity;
import com.example.trelloclone.entities.UserBoardEntity;
import com.example.trelloclone.playloads.ApiResponse;
import com.example.trelloclone.security.CurrentUser;
import com.example.trelloclone.security.UserPrincipal;
import com.example.trelloclone.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/boards")
@CrossOrigin
public class BoardController {
  @Autowired BoardService boardService;

  @GetMapping("")
  public List<UserBoardEntity> getAllBoardsOfUser(@CurrentUser UserPrincipal user) {
    return boardService.getBoardsOfUser(user.getId());
  }

  @PostMapping("")
  public ResponseEntity<UserBoardEntity> createBoard(
      @RequestBody UserBoardEntity boardEntity, @CurrentUser UserPrincipal user) {
    return boardService.createUserBoard(boardEntity, user.getId());
  }

  @DeleteMapping("")
  public ResponseEntity<ApiResponse> deleteBoard(
      @CurrentUser UserPrincipal user, @RequestParam Long boardId) {
    return boardService.deleteBoard(user.getId(), boardId);
  }

  // TODO: All below

  @PutMapping("")
  public BoardEntity updateBoard(@RequestBody BoardEntity boardEntity) {
    return boardService.updateBoard(boardEntity);
  }

  @PostMapping("assignListToBoard")
  public BoardEntity assignListToBoard(@RequestParam Long boardId, @RequestParam Long listId) {
    return boardService.assignListToBoard(boardId, listId);
  }

  @GetMapping("/{id}")
  public BoardEntity getBoardById(@PathVariable Long id) {
    return boardService.getBoardById(id);
  }
}
