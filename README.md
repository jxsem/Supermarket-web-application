# 🛒 Full-Stack E-Commerce: Supermarket System

Este sistema es una aplicación de comercio electrónico robusta que conecta una interfaz de usuario dinámica con un backend de alto rendimiento. El proyecto demuestra la integración de una API REST para la gestión de productos y una lógica de negocio defensiva diseñada para entornos concurrentes.

## 🚀 Funcionalidades Principales

* **Arquitectura RESTful:** Backend optimizado con endpoints para gestión de stock y búsquedas dinámicas.
* **Integridad de Datos (Concurrency Control):** Implementación de **Pessimistic Locking** para prevenir *Race Conditions* en el proceso de compra.
* **Motor de Búsqueda:** Búsquedas por nombre con normalización de caracteres mediante JPA.
* **Gestión de Carrito Proactiva:** Lógica en JavaScript con persistencia en `localStorage` y actualizaciones reactivas del DOM.
* **Validación de Checkout:** Control estricto de datos en el proceso de pago (Regex para CP y teléfonos).
* **Categorización Dinámica:** Filtrado de productos por categorías sin recarga de página (*Single Page Experience*).

## 🛠️ Stack Tecnológico

**Backend:**
* **Java 21:** Uso de la última versión LTS.
* **Spring Boot 3.x:** Framework core para servicios REST.
* **Spring Data JPA:** Abstracción de capa de datos y control de transacciones.
* **MySQL/MariaDB:** Almacenamiento persistente.
* **Lombok:** Optimización de código boilerplate.

**Frontend:**
* **JavaScript (Vanilla ES6+):** Lógica de negocio en cliente (`cart-logic.js`).
* **HTML5 & CSS3:** Interfaz de usuario limpia y funcional.

## 📂 Arquitectura Destacada

* **`ProductController.java`:** Gestiona el flujo de peticiones. Incluye manejo de excepciones global para errores de stock.
* **`ProductService.java`:** Contiene la lógica transaccional y el bloqueo de escritura en base de datos.
* **Defensive Programming:** El sistema valida la disponibilidad de stock en tiempo real antes de confirmar cualquier transacción.

---

## ⚡ Pruebas de Concurrencia (Stress Testing)

Para verificar la integridad del stock ante condiciones de carrera, se ha documentado este script de Bash que lanza 10 peticiones `POST` en paralelo:

```bash
for i in {1..10}; do curl -X POST "http://localhost:8080/api/products/1/purchase?quantity=1" & done; wait
