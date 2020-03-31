package com.example.trelloclone.services;

import com.example.trelloclone.dao.BoardRepository;
import com.example.trelloclone.dao.ListRepository;
import com.example.trelloclone.entities.BoardEntity;
import com.example.trelloclone.entities.CardEntity;
import com.example.trelloclone.entities.ListEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListService {
  @Autowired private ListRepository listRepository;
  @Autowired private BoardRepository boardRepository;

  public ListEntity saveList(ListEntity listEntity, Long boardId) {
    BoardEntity boardEntity = boardRepository.getOne(boardId);
    listEntity.setPosition(boardEntity.getLists().size());
    listEntity.setBoard(boardEntity);
    return listRepository.saveAndFlush(listEntity);
  }

  public ListEntity updateList(ListEntity listEntity) {
    List<CardEntity> cards = listRepository.getOne(listEntity.getId()).getCards();
    listEntity.setCards(cards);
    return listRepository.saveAndFlush(listEntity);
  }

  public void removeListFromTo(Long sourceBoardId, Long destinationBoardId, Long listId) {
    BoardEntity sourceBoardEntity = boardRepository.getOne(sourceBoardId);
    BoardEntity destinationBoardEntity = boardRepository.getOne(destinationBoardId);
    ListEntity listEntity = listRepository.getOne(listId);
    int position = listEntity.getPosition();
    reducePositions(sourceBoardEntity.getLists(), position);
    listEntity.setPosition(destinationBoardEntity.getLists().size());
    listEntity.setBoard(destinationBoardEntity);
    boardRepository.saveAndFlush(sourceBoardEntity);
    listRepository.saveAndFlush(listEntity);
  }

  public List<ListEntity> getAllLists() {
    return listRepository.findAll();
  }

  public void deleteListById(Long boardId, Long listId) {
    BoardEntity boardEntity = boardRepository.getOne(boardId);
    int position = listRepository.getOne(listId).getPosition();
    listRepository.deleteById(listId);
    reducePositions(boardEntity.getLists(), position);
    boardRepository.saveAndFlush(boardEntity);
  }

  public void changePosition(Integer sourcePosition, Integer destinationPosition, Long boardId) {
    BoardEntity boardEntity =  boardRepository.getOne(boardId);
    List<ListEntity> lists = boardEntity.getLists();
    ListEntity destinationList = null;
    for (ListEntity list : lists) {
      Integer position = list.getPosition();
      if (position > sourcePosition && position <= destinationPosition) {
        list.setPosition(position - 1);
      }
      if (position >= destinationPosition && position < sourcePosition) {
        list.setPosition(position + 1);
      }
      if (position.equals(sourcePosition)) {
        destinationList = list;
      }
    }
    if (destinationList != null) destinationList.setPosition(destinationPosition);
    boardEntity.setLists(lists);
    boardRepository.saveAndFlush(boardEntity);
  }

  public List<ListEntity> getListsOfBoard(Long boardId) {
    return boardRepository.getOne(boardId).getLists();
  }

  private void reducePositions(List<ListEntity> lists, Integer position) {
    for (ListEntity list : lists) {
      if (position < list.getPosition()) {
        list.setPosition(list.getPosition() - 1);
      }
    }
  }
}
