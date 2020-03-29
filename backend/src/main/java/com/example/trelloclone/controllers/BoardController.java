package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.TeamBoardEntity;
import com.example.trelloclone.entities.UserBoardEntity;
import com.example.trelloclone.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/boards")
@CrossOrigin
public class BoardController {
  @Autowired BoardService boardService;

  @GetMapping("")
  public List<BoardEntity> getAllBoards() {
    return boardService.getAllBoards();
  }

  @PostMapping("teamBoard")
  public BoardEntity createBoard(@RequestBody TeamBoardEntity boardEntity, @RequestParam Long userId) {
    return boardService.createTeamBoard(boardEntity, userId);
  }

  @PostMapping("userBoard")
  public BoardEntity createBoard(@RequestBody UserBoardEntity boardEntity, @RequestParam Long userId) {
    return boardService.createUserBoard(boardEntity, userId);
  }

  @PutMapping("")
  public BoardEntity updateBoard(@RequestBody BoardEntity boardEntity) {
    return boardService.updateBoard(boardEntity);
  }

  @DeleteMapping("")
  public void deleteBoard(@RequestParam Long userId, @RequestParam Long boardId) {
    boardService.deleteBoard(userId, boardId);
  }

  @PostMapping("assignListToBoard")
  public BoardEntity assignListToBoard(@RequestParam Long boardId, @RequestParam Long listId) {
    return boardService.assignListToBoard(boardId, listId);
  }

  @GetMapping("boardsOfUser/{id}")
  public List<UserBoardEntity> getBoardsOfUser(@PathVariable Long id) {
    return boardService.getBoardsOfUser(id);
  }

  @GetMapping("boardsOfTeam/{id}")
  public List<TeamBoardEntity> getBoardsOfTeam(@PathVariable Long id) {
    return boardService.getBoardsOfTeam(id);
  }

  @GetMapping("/{id}")
  public BoardEntity getBoardById(@PathVariable Long id) {
    return boardService.getBoardById(id);
  }
}
