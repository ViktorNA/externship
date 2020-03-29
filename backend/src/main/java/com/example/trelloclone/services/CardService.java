package com.example.trelloclone.services;

import com.example.trelloclone.dao.CardRepository;
import com.example.trelloclone.dao.ListRepository;
import com.example.trelloclone.entities.CardEntity;
import com.example.trelloclone.entities.ListEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
  @Autowired CardRepository cardRepository;
  @Autowired ListRepository listRepository;

  public CardEntity createCard(CardEntity cardEntity, Long listId) {
    ListEntity listEntity = listRepository.getOne(listId);
    cardEntity.setPosition(listEntity.getCards().size());
    cardEntity.setList(listEntity);
    return cardRepository.saveAndFlush(cardEntity);
  }

  public CardEntity updateCard(CardEntity cardEntity) {
    if (listRepository.existsById(cardEntity.getId()))
      return cardRepository.saveAndFlush(cardEntity);
    return null;
  }

  public void deleteCardById(Long cardId, long listId) {
    Integer position = cardRepository.getOne(cardId).getPosition();
    cardRepository.deleteById(cardId);
    reducePositions(listRepository.getOne(listId).getCards(), position);
  }

  public void removeCardFromTo(Long sourceListId, Long destinationListId, Long cardId) {
    ListEntity sourceListEntity = listRepository.getOne(sourceListId);
    ListEntity destinationListEntity = listRepository.getOne(destinationListId);
    CardEntity cardEntity = cardRepository.getOne(cardId);
    int position = cardEntity.getPosition();
    reducePositions(sourceListEntity.getCards(), position);
    cardEntity.setPosition(destinationListEntity.getCards().size());
    cardEntity.setList(destinationListEntity);
    listRepository.saveAndFlush(sourceListEntity);
    cardRepository.saveAndFlush(cardEntity);
  }

  public void changePosition(Integer sourcePosition, Integer destinationPosition, Long listId) {
    ListEntity listEntity =  listRepository.getOne(listId);
    List<CardEntity> cards = listEntity.getCards();
    CardEntity destinationCard = null;
    for (CardEntity card : cards) {
      Integer position = card.getPosition();
      if (position > sourcePosition && position <= destinationPosition) {
        card.setPosition(position - 1);
      }
      if (position >= destinationPosition && position < sourcePosition) {
        card.setPosition(position + 1);
      }
      if (position.equals(sourcePosition)) {
        destinationCard = card;
      }
    }
    if (destinationCard != null) destinationCard.setPosition(destinationPosition);
    listEntity.setCards(cards);
    listRepository.saveAndFlush(listEntity);
  }

  public List<CardEntity> getCardsOfList(Long listId) {
    return listRepository.getOne(listId).getCards();
  }

  private void reducePositions(List<CardEntity> cards, Integer position) {
    for (CardEntity card : cards) {
      if (position < card.getPosition()) {
        card.setPosition(card.getPosition() - 1);
      }
    }
  }
}
