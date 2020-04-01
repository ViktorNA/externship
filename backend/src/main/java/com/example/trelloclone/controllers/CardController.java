package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.CardEntity;
import com.example.trelloclone.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cards")
@CrossOrigin
public class CardController {
  @Autowired CardService cardService;

  @GetMapping("")
  public ResponseEntity<List<CardEntity>> getCardsOfList(@RequestParam Long listId) {
    return cardService.getCardsOfList(listId);
  }

  @PostMapping("")
  public CardEntity createCard(@RequestBody CardEntity cardEntity, @RequestParam Long listId) {
    return cardService.createCard(cardEntity, listId);
  }

  @PutMapping("")
  public CardEntity updateCard(@RequestBody CardEntity cardEntity) {
    return cardService.updateCard(cardEntity);
  }

  @DeleteMapping("")
  public void deleteCard(@RequestParam Long listId, @RequestParam Long cardId) {
    cardService.deleteCardById(listId, cardId);
  }

  @PutMapping("removeFromTo")
  public void removeCardFromTo(
      @RequestParam Long sourceListId,
      @RequestParam Long destinationListId,
      @RequestParam Long cardId) {
    cardService.removeCardFromTo(sourceListId, destinationListId, cardId);
  }

  @PutMapping("changePosition")
  public void changePosition(
          @RequestParam Integer sourcePosition,
          @RequestParam Integer destinationPosition,
          @RequestParam Long listId) {
    cardService.changePosition(sourcePosition, destinationPosition, listId);
  }
}
