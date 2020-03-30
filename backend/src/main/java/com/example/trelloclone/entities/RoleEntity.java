package com.example.trelloclone.entities;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;

@Entity
@Data
public class RoleEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @NaturalId
  @Column(length = 60)
  private RoleName name;
}
