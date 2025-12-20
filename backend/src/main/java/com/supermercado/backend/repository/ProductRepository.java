package com.supermercado.backend.repository;

import com.supermercado.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Aquí no escribes código. JpaRepository ya sabe hacer SELECT, INSERT y DELETE.
    List<Product> findByNameContainingIgnoreCase(String name);
}
