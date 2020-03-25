package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.ListEntity;
import com.example.trelloclone.services.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/lists")
@CrossOrigin
public class ListController {

  @Autowired ListService listService;

  @PostMapping
  public ListEntity saveList(@RequestBody ListEntity listEntity, @RequestParam Long boardId) {
    return listService.saveList(listEntity, boardId);
  }

  @PutMapping
  public ListEntity updateList(@RequestBody ListEntity listEntity) {
    return listService.updateList(listEntity);
  }

  @DeleteMapping
  public void deleteList(@RequestParam Long boardId, Long listId) {
    listService.deleteList(boardId, listId);
  }

  @PutMapping("removeFromTo")
  public void removeCardFromTo(
      @RequestParam Long sourceBoardId,
      @RequestParam Long destinationBoardId,
      @RequestParam Long listId) {
    listService.removeListFromTo(sourceBoardId, destinationBoardId, listId);
  }

  @GetMapping
  public List<ListEntity> getAllLists() {
    return listService.getAllLists();
  }

  @DeleteMapping("{id}")
  public void deleteListById(@PathVariable Long id) {
    listService.deleteListById(id);
  }

  @PostMapping("swapIndexes")
  public void swapIndexes(@RequestParam Integer index1, @RequestParam Integer index2) {
    listService.swapIndexes(index1, index2);
  }
}
