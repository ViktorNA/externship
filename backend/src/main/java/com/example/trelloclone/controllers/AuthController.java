package com.example.trelloclone.controllers;

import com.example.trelloclone.playloads.ApiResponse;
import com.example.trelloclone.playloads.JwtAuthenticationResponse;
import com.example.trelloclone.playloads.LoginRequest;
import com.example.trelloclone.playloads.SignUpRequest;
import com.example.trelloclone.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

  @GetMapping("isExistByUsername/{username}")
  public ResponseEntity<ApiResponse> isExistByUsername(@PathVariable String username) {
    return authService.isExistByUsername(username);
  }

  @GetMapping("isExistByEmail/{email}")
  public ResponseEntity<ApiResponse> isExistByEmail(@PathVariable String email) {
    return authService.isExistByEmail(email);
  }
}
