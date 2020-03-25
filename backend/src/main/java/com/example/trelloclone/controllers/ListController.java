package com.example.trelloclone.controllers;

import com.example.trelloclone.entities.ListEntity;
import com.example.trelloclone.services.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/lists")
@CrossOrigin
public class ListController {

  @Autowired ListService listService;

  @PostMapping
  public ResponseEntity<?> addList(@RequestBody ListEntity listEntity) {

    ListEntity responseEntity = listService.saveList(listEntity);
    return new ResponseEntity<>(responseEntity, HttpStatus.CREATED);
  }

  @GetMapping
  public Iterable<ListEntity> getAllLists() {
    return listService.getAllLists();
  }

  @DeleteMapping("{id}")
  public void deleteListById(@PathVariable Long id) {
    listService.deleteListById(id);
  }

  @PostMapping("swapIndexes")
  public void swapIndexes(@RequestParam Integer index1, @RequestParam Integer index2){
    listService.swapIndexes(index1, index2);
  }
}
