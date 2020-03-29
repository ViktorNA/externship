package com.example.trelloclone.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@Inheritance
@DiscriminatorColumn
public class BoardEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Card name can not ne blank")
  private String name;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "board", orphanRemoval = true)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private List<ListEntity> lists;

}
