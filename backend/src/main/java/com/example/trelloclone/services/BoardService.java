package com.example.trelloclone.services;

import com.example.trelloclone.dao.*;
import com.example.trelloclone.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
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

  public UserBoardEntity createUserBoard(UserBoardEntity boardEntity, Long userId) {
    boardEntity.setUser(userRepository.getOne(userId));
    return userBoardRepository.saveAndFlush(boardEntity);
  }

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

  public void deleteBoard(Long userId, Long boardId) {
    boardRepository.deleteById(boardId);
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

  public List<UserBoardEntity> getBoardsOfUser(Long userId) {
    return userRepository.getOne(userId).getBoards();
  }

  public List<TeamBoardEntity> getBoardsOfTeam(Long teamId) {
    return teamRepository.getOne(teamId).getBoards();
  }
}
