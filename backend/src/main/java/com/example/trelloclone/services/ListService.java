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
    ListEntity list = listRepository.saveAndFlush(listEntity);
    boardEntity.getLists().add(list);
    boardRepository.saveAndFlush(boardEntity);
    return list;
  }

  public ListEntity updateList(ListEntity listEntity) {
    List<CardEntity> cards = listRepository.getOne(listEntity.getId()).getCards();
    listEntity.setCards(cards);
    return listRepository.saveAndFlush(listEntity);
  }

  public void deleteList(Long boardId, Long listId) {
    BoardEntity boardEntity = boardRepository.getOne(boardId);
    ListEntity listEntity = listRepository.getOne(listId);
    Integer position = listEntity.getPosition();
    boardEntity.getLists().remove(listEntity);
    reducePositions(boardEntity.getLists(), position);
    listRepository.deleteById(listId);
    boardRepository.saveAndFlush(boardEntity);
  }

  public void removeListFromTo(Long sourceBoardId, Long destinationBoardId, Long listId) {
    BoardEntity sourceBoardEntity = boardRepository.getOne(sourceBoardId);
    BoardEntity destinationBoardEntity = boardRepository.getOne(destinationBoardId);
    ListEntity listEntity = listRepository.getOne(listId);
    sourceBoardEntity.getLists().remove(listEntity);
    reducePositions(sourceBoardEntity.getLists(), listEntity.getPosition());
    listEntity.setPosition(destinationBoardEntity.getLists().size());
    destinationBoardEntity.getLists().add(listEntity);
    boardRepository.saveAndFlush(sourceBoardEntity);
    boardRepository.saveAndFlush(destinationBoardEntity);
    listRepository.saveAndFlush(listEntity);
  }

  public List<ListEntity> getAllLists() {
    return listRepository.findAll();
  }

  public void deleteListById(Long id) {
    Integer position = listRepository.getOne(id).getPosition();
    listRepository.deleteById(id);
    for (ListEntity list : listRepository.findAll()) {
      if (list.getPosition() > position) {
        list.setPosition(list.getPosition() - 1);
        listRepository.saveAndFlush(list);
      }
    }
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

  private void reducePositions(List<ListEntity> lists, Integer position) {
    for (ListEntity list : lists) {
      if (position < list.getPosition()) {
        list.setPosition(list.getPosition() - 1);
        listRepository.saveAndFlush(list);
      }
    }
  }

  private void increasePositions(List<ListEntity> lists, Integer position) {
    for (ListEntity list : lists) {
      if (position < list.getPosition()) {
        list.setPosition(list.getPosition() + 1);
        listRepository.saveAndFlush(list);
      }
    }
  }
}
