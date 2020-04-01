package com.example.trelloclone.services;

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
import com.example.trelloclone.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@Service
public class AuthService {

  @Autowired AuthenticationManager authenticationManager;

  @Autowired UserRepository userRepository;

  @Autowired RoleRepository roleRepository;

  @Autowired PasswordEncoder passwordEncoder;

  @Autowired JwtTokenProvider tokenProvider;

  public ResponseEntity<JwtAuthenticationResponse> authenticateUser(LoginRequest loginRequest) {

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);
    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
  }

  public ResponseEntity<ApiResponse> registerUser(SignUpRequest signUpRequest) {
    Boolean isUsernameTaken = userRepository.existsByUsername(signUpRequest.getUsername());
    Boolean isEmailTaken = userRepository.existsByEmail(signUpRequest.getEmail());
    if (isUsernameTaken) {
      return new ResponseEntity<>(
          new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
    }

    if (isEmailTaken) {
      return new ResponseEntity<>(
          new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
    }

    // Creating user's account
    UserEntity user =
        new UserEntity(
            signUpRequest.getName(),
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            signUpRequest.getPassword());

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    RoleEntity userRole =
        roleRepository
            .findByName(RoleName.ROLE_USER)
            .orElseThrow(() -> new AppException("User Role not set."));

    user.setRoles(Collections.singleton(userRole));

    UserEntity result = userRepository.save(user);

    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/users/{username}")
            .buildAndExpand(result.getUsername())
            .toUri();

    return ResponseEntity.created(location)
        .body(new ApiResponse(true, "User registered successfully"));
  }
}
