package com.supermercado.backend.controller;

import com.supermercado.backend.entity.Product;
import com.supermercado.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products") // 1. Esta es la base
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. Esta ruta se convierte en /api/products/search
    @GetMapping("/search") // <--- Esto suma: /api/products/search
    public List<Product> searchProducts(@RequestParam("name") String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
}
