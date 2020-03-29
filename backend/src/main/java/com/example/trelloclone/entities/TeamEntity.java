package com.example.trelloclone.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.catalina.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
public class TeamEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank private String name;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "team", orphanRemoval = true)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private List<TeamBoardEntity> boards;

  @ManyToMany(
      mappedBy = "teams",
      cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private List<UserEntity> users;

  public void removeUser(UserEntity userEntity) {
    users.remove(userEntity);
    userEntity.getTeams().remove(this);
  }
}
