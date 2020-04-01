package com.example.trelloclone;

import com.example.trelloclone.dao.RoleRepository;
import com.example.trelloclone.entities.RoleEntity;
import com.example.trelloclone.entities.RoleName;
import org.aspectj.weaver.Iterators;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Stream;

@SpringBootApplication
public class TrelloCloneApplication {

  @PostConstruct
  void init() {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
  }

  @Bean
  public ApplicationRunner defaultDataInit(RoleRepository roleRepository) {
    return args -> {
      List<RoleEntity> roles = new ArrayList<>();
      Arrays.stream(RoleName.values())
          .forEach(
              roleName -> {
                boolean isRoleInDb = roleRepository.findByName(roleName).isPresent();
                if (!isRoleInDb) roles.add(new RoleEntity(roleName));
              });
      roleRepository.saveAll(roles);
    };
  }

  public static void main(String[] args) {
    SpringApplication.run(TrelloCloneApplication.class, args);
  }
}
