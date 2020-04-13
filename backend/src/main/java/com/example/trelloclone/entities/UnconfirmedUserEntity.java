package com.example.trelloclone.entities;

import com.example.trelloclone.playloads.SignUpRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@Table(name = "unconfimed_users")
public class UnconfirmedUserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String confirmToken;

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

  public UnconfirmedUserEntity(String confirmToken, SignUpRequest signUpRequest) {
    this.confirmToken = confirmToken;
    this.email = signUpRequest.getEmail();
    this.name = signUpRequest.getName();
    this.username = signUpRequest.getUsername();
    this.password = signUpRequest.getPassword();
  }
}
