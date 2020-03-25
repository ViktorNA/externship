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
    CardEntity card = cardRepository.saveAndFlush(cardEntity);
    listEntity.getCards().add(card);
    listRepository.saveAndFlush(listEntity);
    return card;
  }

  public CardEntity updateCard(CardEntity cardEntity) {
    if (listRepository.existsById(cardEntity.getId()))
      return cardRepository.saveAndFlush(cardEntity);
    return null;
  }

  public void deleteCard(Long listId, Long cardId) {
    ListEntity listEntity = listRepository.getOne(listId);
    CardEntity cardEntity = cardRepository.getOne(cardId);
    Integer position = cardEntity.getPosition();
    listEntity.getCards().remove(cardEntity);
    reducePositions(listEntity.getCards(), position);
    cardRepository.deleteById(cardId);
    listRepository.saveAndFlush(listEntity);
  }

  public void removeCardFromTo(Long sourceListId, Long destinationListId, Long cardId) {
    ListEntity sourceListEntity = listRepository.getOne(sourceListId);
    ListEntity destinationListEntity = listRepository.getOne(destinationListId);
    CardEntity cardEntity = cardRepository.getOne(cardId);
    sourceListEntity.getCards().remove(cardEntity);
    reducePositions(sourceListEntity.getCards(), cardEntity.getPosition());
    cardEntity.setPosition(destinationListEntity.getCards().size());
    destinationListEntity.getCards().add(cardEntity);
    listRepository.saveAndFlush(sourceListEntity);
    listRepository.saveAndFlush(destinationListEntity);
    cardRepository.saveAndFlush(cardEntity);
  }

  private void reducePositions(List<CardEntity> cards, Integer position) {
    for (CardEntity card : cards) {
      if (position < card.getPosition()) {
        card.setPosition(card.getPosition() - 1);
        cardRepository.saveAndFlush(card);
      }
    }
  }
}
