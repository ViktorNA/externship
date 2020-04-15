package com.example.trelloclone.playloads;

import com.example.trelloclone.entities.CardEntity;
import com.example.trelloclone.entities.ListEntity;
import lombok.Data;

import java.util.List;

@Data
public class ListResponse {
  private Long id;
  private Integer position;
  private String name;
  private List<CardEntity> cards;

  public ListResponse(ListEntity list) {
    id = list.getId();
    name = list.getName();
    cards = list.getCards();
    position = list.getPosition();
  }
}
