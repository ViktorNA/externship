package com.example.trelloclone.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "cards")
public class CardEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Card name can not ne blank")
  private String name;

  @NotNull
  private Integer position;

  @ManyToOne
  private ListEntity list;
}
