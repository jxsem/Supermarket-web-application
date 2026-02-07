package com.supermercado.backend.service;

import com.supermercado.backend.entity.Product;
import com.supermercado.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 1. Esto arregla el rojo de findAll()
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    // 2. Esto arregla el rojo de searchByName()
    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // 3. Tu lógica de compra (la que probaremos en Postman)
    public Product purchaseProduct(Long id, int quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Stock insuficiente para: " + product.getName());
        }

        product.setStock(product.getStock() - quantity);
        return productRepository.save(product);
    }
}
