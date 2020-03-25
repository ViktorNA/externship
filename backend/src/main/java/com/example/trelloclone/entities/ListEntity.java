package com.example.trelloclone.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "list")
public class ListEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @NotBlank(message = "Name can not be blank")
  @Column(name = "name")
  private String name;

  @NotNull
  @Column(name = "position")
  private Integer index;
}
