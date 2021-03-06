package com.example.trelloclone.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Data
@AllArgsConstructor
@Table(name = "users")
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 40)
  private String name;

  @NotBlank
  @Size(max = 15)
  private String username;

  @NaturalId
  @NotBlank
  @Size(max = 40)
  @Email
  private String email;

  @NotBlank
  @Size(max = 100)
  @JsonIgnore
  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  private Set<RoleEntity> roles = new HashSet<>();

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private List<UserBoardEntity> boards;

  @ManyToMany
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private List<TeamEntity> teams;

  public UserEntity() {}

  public UserEntity(String name, String username, String email, String password) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public Boolean isBoardBelongsById(Long boardId) {
    return boards.parallelStream().anyMatch(board -> board.getId().equals(boardId));
  }

  public void deleteBoardById(Long boardId) {
    List<UserBoardEntity> newBoards =
        boards
            .parallelStream()
            .filter(board -> !board.getId().equals(boardId))
            .collect(Collectors.toList());
    boards.clear();
    boards.addAll(newBoards);
  }

  public void deleteTeamById(Long teamId) {
    List<TeamEntity> newTeams =
        teams
            .parallelStream()
            .filter(team -> !team.getId().equals(teamId))
            .collect(Collectors.toList());
    teams.clear();
    teams.addAll(newTeams);
  }
}
