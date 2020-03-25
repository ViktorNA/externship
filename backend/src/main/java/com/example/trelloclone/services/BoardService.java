package com.example.trelloclone.services;

import com.example.trelloclone.dao.BoardRepository;
import com.example.trelloclone.dao.ListRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.CardEntity;
import com.example.trelloclone.entities.ListEntity;
import com.example.trelloclone.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
  @Autowired BoardRepository boardRepository;
  @Autowired ListRepository listRepository;
  @Autowired UserRepository userRepository;

  public BoardEntity createBoard(BoardEntity boardEntity, Long userId) {
    BoardEntity board = boardRepository.saveAndFlush(boardEntity);
    UserEntity userEntity = userRepository.getOne(userId);
    userEntity.getBoards().add(board);
    userRepository.saveAndFlush(userEntity);
    return board;
  }

  public BoardEntity updateBoard(BoardEntity boardEntity) {
    List<ListEntity> lists = boardRepository.getOne(boardEntity.getId()).getLists();
    boardEntity.setLists(lists);
    return boardRepository.saveAndFlush(boardEntity);
  }

  public void deleteBoard(Long userId, Long boardId) {
    UserEntity userEntity = userRepository.getOne(userId);
    BoardEntity boardEntity = boardRepository.getOne(boardId);
    userEntity.getBoards().remove(boardEntity);
    boardRepository.deleteById(boardId);
    userRepository.saveAndFlush(userEntity);
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

  public List<BoardEntity> getBoardsOfUser(Long userId) {
    return userRepository.getOne(userId).getBoards();
  }
}
