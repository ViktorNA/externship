package com.example.trelloclone.services;

import com.example.trelloclone.dao.RoleRepository;
import com.example.trelloclone.dao.UnconfirmedUserRepository;
import com.example.trelloclone.dao.UserRepository;
import com.example.trelloclone.entities.RoleEntity;
import com.example.trelloclone.entities.RoleName;
import com.example.trelloclone.entities.UnconfirmedUserEntity;
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
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

  @Autowired AuthenticationManager authenticationManager;

  @Autowired UserRepository userRepository;

  @Autowired RoleRepository roleRepository;

  @Autowired PasswordEncoder passwordEncoder;

  @Autowired JwtTokenProvider tokenProvider;

  @Autowired UnconfirmedUserRepository unconfirmedUserRepository;

  @Autowired EmailService emailService;

  public ResponseEntity<JwtAuthenticationResponse> authenticateUser(LoginRequest loginRequest) {
    String usernameOrEmail = loginRequest.getUsernameOrEmail();

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    Optional<UserEntity> user =
        userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
    String jwt = tokenProvider.generateToken(authentication);
    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, user.get()));
  }

  public ResponseEntity<ApiResponse> registerUser(SignUpRequest signUpRequest) {
    boolean isUsernameTaken =
        userRepository.existsByUsername(signUpRequest.getUsername())
            || unconfirmedUserRepository.existsByUsername(signUpRequest.getUsername());
    boolean isEmailTaken =
        userRepository.existsByEmail(signUpRequest.getEmail())
            || unconfirmedUserRepository.existsByEmail(signUpRequest.getEmail());
    if (isUsernameTaken) {
      return new ResponseEntity<>(
          new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
    }

    if (isEmailTaken) {
      return new ResponseEntity<>(
          new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
    }

    UnconfirmedUserEntity unconfirmedUser =
        new UnconfirmedUserEntity(UUID.randomUUID().toString(), signUpRequest);

    unconfirmedUserRepository.saveAndFlush(unconfirmedUser);
    String messageBody = "http://localhost:3000/confirm/" + unconfirmedUser.getConfirmToken();
    emailService.sendMail(unconfirmedUser.getEmail(), "Confirm email", messageBody);

    return ResponseEntity.ok(new ApiResponse(true, "Confirm email to finish registration"));
  }

  public ResponseEntity<ApiResponse> confirmEmail(String token) {
    Boolean isTokenExist = unconfirmedUserRepository.existsByConfirmToken(token);
    if (!isTokenExist) {
      return new ResponseEntity<>(
          new ApiResponse(false, "Token is not exist"), HttpStatus.NOT_FOUND);
    }
    UnconfirmedUserEntity unconfirmedUser = unconfirmedUserRepository.findByConfirmToken(token);

    UserEntity user =
        new UserEntity(
            unconfirmedUser.getName(),
            unconfirmedUser.getUsername(),
            unconfirmedUser.getEmail(),
            unconfirmedUser.getPassword());

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    RoleEntity userRole =
        roleRepository
            .findByName(RoleName.ROLE_USER)
            .orElseThrow(() -> new AppException("User Role not set."));

    user.setRoles(Collections.singleton(userRole));

    UserEntity result = userRepository.saveAndFlush(user);
    unconfirmedUserRepository.delete(unconfirmedUser);

    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/users/{username}")
            .buildAndExpand(result.getUsername())
            .toUri();

    return ResponseEntity.created(location)
        .body(new ApiResponse(true, "User successfully registered!"));
  }

  public ResponseEntity<ApiResponse> isExistByUsername(String username) {
    return new ResponseEntity<>(
        new ApiResponse(userRepository.existsByUsername(username), "Username checking/"),
        HttpStatus.OK);
  }

  public ResponseEntity<ApiResponse> isExistByEmail(String email) {
    return new ResponseEntity<>(
        new ApiResponse(userRepository.existsByEmail(email), "Username checking/"), HttpStatus.OK);
  }
}
