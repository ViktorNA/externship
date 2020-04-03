package com.example.trelloclone.playloads;

import com.example.trelloclone.entities.UserEntity;
import lombok.Data;

import java.util.Optional;

@Data
public class JwtAuthenticationResponse {
  private String accessToken;
  private String tokenType = "Bearer";
  private UserEntity user;

  public JwtAuthenticationResponse(String accessToken, UserEntity user) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
