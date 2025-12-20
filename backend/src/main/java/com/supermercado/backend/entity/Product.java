package com.supermercado.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity // 1. Le dice a Java: "Esta clase es una tabla de la base de datos"
@Table(name = "products") // 2. Le dice el nombre exacto de la tabla en MySQL
@Data // 3. ¡Magia de Lombok! Crea los getters y setters en memoria para que no los veas
public class Product {

    @Id // 4. Define la llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 5. Hace que el ID sea autoincremental
    private Long id;

    @Column(unique = true, nullable = false)
    private String code; // Tu "FR_MANZ01"

    private String name;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;
}
