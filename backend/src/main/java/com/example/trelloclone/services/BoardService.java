package com.example.trelloclone.services;

import com.example.trelloclone.dao.*;
import com.example.trelloclone.entities.*;
import com.example.trelloclone.exceptions.BadRequestException;
import com.example.trelloclone.exceptions.ResourceNotFoundException;
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
    if (isUserHasAccessToBoard(userId, boardId)) {
      UserEntity userEntity = userRepository.getOne(userId);
      boardRepository.deleteById(boardId);
      userEntity.deleteBoardById(boardId);
      userRepository.saveAndFlush(userEntity);
      return new ResponseEntity<>(new ApiResponse(true, "The board is deleted"), HttpStatus.OK);
    }
    return new ResponseEntity<>(
        new ApiResponse(false, "The board is not belong to you"), HttpStatus.NOT_FOUND);
  }

  public ResponseEntity<ApiResponse> renameBoard(Long boardId, String newName, UserPrincipal user) {
    if (!isUserHasAccessToBoard(user.getId(), boardId))
      new ResponseEntity<>(new ApiResponse(false, "Cannot access board"), HttpStatus.OK);
    BoardEntity boardEntity = boardRepository.getOne(boardId);
    boardEntity.setName(newName);
    return new ResponseEntity<>(new ApiResponse(true, "Renamed successfully"), HttpStatus.OK);
  }

  public ResponseEntity<BoardEntity> getBoardById(Long boardId, UserPrincipal user) {
    if (isUserHasAccessToBoard(user.getId(), boardId)) {
      return new ResponseEntity<>(boardRepository.getOne(boardId), HttpStatus.OK);
    }
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }

  private boolean isUserHasAccessToBoard(Long userId, Long boardId) {
    boolean isBoardExist = boardRepository.existsById(boardId);
    if (!isBoardExist) return false;
    boolean isUserExist = userRepository.existsById(userId);
    if (!isUserExist) return false;
    boolean isUserHasAccessToTeam = false;
    boolean isBoardBelongsToUser = false;
    boolean isBoardOfTeam = teamBoardRepository.existsById(boardId);
    if (isBoardOfTeam) {
      TeamEntity team = teamBoardRepository.getOne(boardId).getTeam();
      boolean isUserBelongsToTeam = team.isUserBelongsToTeamById(userId);
      if (isUserBelongsToTeam) {
        isUserHasAccessToTeam = true;
      }
    } else {
      UserEntity userEntity = userRepository.getOne(userId);
      isBoardBelongsToUser = userEntity.isBoardBelongsById(boardId);
    }
    return isUserHasAccessToTeam || isBoardBelongsToUser;
  };

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
