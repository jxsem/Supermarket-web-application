package com.supermercado.backend.service;

import com.supermercado.backend.entity.Product;
import com.supermercado.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // IMPORTANTE

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // 3. Lógica con control de concurrencia
    @Transactional // Esto asegura que el bloqueo se mantenga hasta que termine el metodo
    public Product purchaseProduct(Long id, int quantity) {
        // Usaremos findByIdForUpdate (que crearemos ahora en el Repository)
        Product product = productRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Stock insuficiente para: " + product.getName());
        }

        product.setStock(product.getStock() - quantity);
        return productRepository.save(product);
    }
}
