package com.example.trelloclone.controllers;

import com.example.trelloclone.dao.RoleRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.RoleEntity;
import com.example.trelloclone.entities.RoleName;
import com.example.trelloclone.entities.UserEntity;
import com.example.trelloclone.exceptions.AppException;
import com.example.trelloclone.playloads.ApiResponse;
import com.example.trelloclone.playloads.JwtAuthenticationResponse;
import com.example.trelloclone.playloads.LoginRequest;
import com.example.trelloclone.playloads.SignUpRequest;
import com.example.trelloclone.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired AuthService authService;

  @PostMapping("/signin")
  public ResponseEntity<JwtAuthenticationResponse> authenticateUser(
      @Valid @RequestBody LoginRequest loginRequest) {
    return authService.authenticateUser(loginRequest);
  }

  @PostMapping("/signup")
  public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    return authService.registerUser(signUpRequest);
  }
}
