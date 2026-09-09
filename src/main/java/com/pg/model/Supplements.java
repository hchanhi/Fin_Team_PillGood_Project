package com.pg.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Supplements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String supplementsName;

    private int quantity;

    private int quantityLeft;

    private int singleDose;

    private String slot;

    @CreationTimestamp
    private Timestamp supplementsCreated;

    @ManyToOne
    User user;
}
