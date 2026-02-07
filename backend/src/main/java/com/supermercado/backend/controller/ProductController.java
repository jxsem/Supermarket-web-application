package com.supermercado.backend.controller;

import com.supermercado.backend.entity.Product;
import com.supermercado.backend.service.ProductService; // Importamos el servicio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService; // Inyectamos lógica, no solo datos

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.findAll(); // El servicio ahora maneja esto
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam("name") String name) {
        return productService.searchByName(name);
    }

    /**
     * Este es el endpoint para pruebas de Postman.
     * Aquí validaremos la "Defensive Programming".
     */
    @PostMapping("/{id}/purchase")
    public ResponseEntity<?> purchaseProduct(@PathVariable Long id, @RequestParam int quantity) {
        try {
            Product updatedProduct = productService.purchaseProduct(id, quantity);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            // Captura el error de stock insuficiente o ID no encontrado
            // y devuelve un 400 Bad Request con el mensaje de error.
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
