🛒 Full-Stack E-Commerce: Supermarket System
Este sistema es una aplicación de comercio electrónico robusta que conecta una interfaz de usuario dinámica con un backend de alto rendimiento. El proyecto demuestra la integración de una API REST para la gestión de productos y una lógica de cliente compleja para el flujo de compra.

🚀 Funcionalidades Principales
Arquitectura RESTful: El backend expone endpoints para la gestión integral de productos y búsquedas optimizadas.

Motor de Búsqueda Inteligente: Implementación de búsquedas por nombre ignorando mayúsculas y minúsculas mediante JPA.

Gestión de Carrito Proactiva: Lógica en JavaScript que maneja el estado del carrito, persistencia en localStorage y actualizaciones dinámicas del DOM.

Validación de Checkout: Control estricto de datos en el proceso de pago, incluyendo validación de códigos postales específicos y formatos de teléfono.

Categorización Dinámica: Filtrado de productos por categorías como "Frutas", "Verduras" o "Ensaladas" sin recargar la página.

🛠️ Stack Tecnológico
Backend

Java 21: Uso de la última versión LTS para mayor eficiencia y modernidad en el lenguaje.

Spring Boot 3.x: Framework para la creación de la aplicación y exposición de servicios REST.

Spring Data JPA: Abstracción de la capa de datos para comunicación con MySQL/MariaDB.

Lombok: Para reducir el código repetitivo en las entidades de datos.

Frontend

JavaScript (Vanilla ES6+): Gestión de la lógica del carrito (cart-logic.js) y navegación de categorías.

HTML5 & CSS3: Interfaz de usuario diseñada para una experiencia de supermercado limpia y funcional.

📂 Estructura del Proyecto
Product.java: Entidad que mapea la tabla products en la base de datos, incluyendo código, nombre, descripción y precio.

ProductController.java: Controlador REST que gestiona las peticiones a /api/products.

checkout-logic.js: Gestiona el resumen del pedido y la lógica de pago (tarjeta o efectivo).

index.html: Punto de entrada principal con buscador integrado y acceso al carrito.

🔧 Configuración para Desarrollo
Backend:

Asegúrate de tener instalado el JDK 21.

Configura tu base de datos en el archivo application.properties de Spring.

Ejecuta BackendApplication.java.

Frontend:

Sirve los archivos estáticos. Al abrir index.html, el sistema consumirá automáticamente la API en localhost:8080/api/products.
