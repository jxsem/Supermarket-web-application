package com.supermercado.backend.repository;

import com.supermercado.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Este metodo es el que usa el buscador
    List<Product> findByNameContainingIgnoreCase(String name);
}
