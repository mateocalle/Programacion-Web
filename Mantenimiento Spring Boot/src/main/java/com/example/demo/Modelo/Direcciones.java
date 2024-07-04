package com.example.demo.Modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;

@Entity
@Table(name = "direccionesEnvio")
@Data
public class Direcciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellido", nullable = false)
    private String apellido;

    @Column(name = "lugar", nullable = false)
    private String lugar;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "pais", nullable = false)
    private String pais;

    @Column(name = "ciudad", nullable = false)
    private String ciudad;

    @Column(name = "zip", nullable = false)
    private String zip;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "prefijoCelular", nullable = false)
    private String prefijoCelular;

    @Column(name = "celular", nullable = false)
    private String celular;
}