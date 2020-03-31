package com.example.trelloclone.services;

import com.example.trelloclone.dao.*;
import com.example.trelloclone.entities.*;
import com.example.trelloclone.playloads.ApiResponse;
import com.example.trelloclone.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
  @Autowired BoardRepository boardRepository;
  @Autowired ListRepository listRepository;
  @Autowired UserRepository userRepository;
  @Autowired UserBoardRepository userBoardRepository;
  @Autowired TeamBoardRepository teamBoardRepository;
  @Autowired TeamRepository teamRepository;

  public List<UserBoardEntity> getBoardsOfUser(Long id) {
    return userRepository.getOne(id).getBoards();
  }

  public ResponseEntity<UserBoardEntity> createUserBoard(UserBoardEntity boardEntity, Long userId) {
    boardEntity.setUser(userRepository.getOne(userId));
    UserBoardEntity newBoard = userBoardRepository.saveAndFlush(boardEntity);
    return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
  }

  public ResponseEntity<ApiResponse> deleteBoard(Long userId, Long boardId) {
    UserEntity userEntity = userRepository.getOne(userId);
    if (userEntity.isBoardBelongsById(boardId)) {
      boardRepository.deleteById(boardId);
      return new ResponseEntity<>(new ApiResponse(true, "The board is deleted"), HttpStatus.OK);
    }
    return new ResponseEntity<>(
        new ApiResponse(false, "The board is not belong to you"), HttpStatus.NOT_FOUND);
  }

  //  TODO: all below
  public TeamBoardEntity createTeamBoard(TeamBoardEntity boardEntity, Long userId) {
    boardEntity.setTeam(teamRepository.getOne(userId));
    return teamBoardRepository.saveAndFlush(boardEntity);
  }

  // TODO: repair
  public BoardEntity updateBoard(BoardEntity boardEntity) {
    List<ListEntity> lists = boardRepository.getOne(boardEntity.getId()).getLists();
    boardEntity.setLists(lists);
    return boardRepository.saveAndFlush(boardEntity);
  }

  public List<BoardEntity> getAllBoards() {
    return boardRepository.findAll();
  }

  public BoardEntity getBoardById(Long id) {
    return boardRepository.getOne(id);
  }

  public BoardEntity assignListToBoard(Long boardId, Long listId) {
    BoardEntity boardEntity = boardRepository.getOne(boardId);
    ListEntity listEntity = listRepository.getOne(listId);
    boardEntity.getLists().add(listEntity);
    return boardRepository.saveAndFlush(boardEntity);
  }

  public List<TeamBoardEntity> getBoardsOfTeam(Long teamId) {
    return teamRepository.getOne(teamId).getBoards();
  }
}
