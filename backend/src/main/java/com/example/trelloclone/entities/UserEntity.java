package com.example.trelloclone.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank private String username;

  @OneToMany
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnoreProperties({"hibernateLazyInitializer"})
  private List<BoardEntity> boards;
}
