/**
 * ARCHIVO: cart-logic.js
 * Lógica principal para gestionar el carrito de compras (modal, contador, y almacenamiento local).
 */


// 1. GESTIÓN DE DATOS (localStorage)


// Inicializa el carrito leyendo el localStorage, o usa un array vacío si no existe.
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
const cartCounterElement = document.getElementById('contador-carrito');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');


// 2. FUNCIONES DE LÓGICA DEL CARRITO

/**
 * Función GLOBAL para añadir un producto al carrito.
 * Es accesible desde categorias.js
 * @param {Object} product - Objeto con { id, name, price }.
 */
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // Si el producto ya existe, solo incrementa la cantidad
        existingItem.qty += 1;
    } else {
        // Si es nuevo, lo añade con cantidad 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1
        });
    }

    // Actualiza la interfaz y el almacenamiento
    updateCartDisplay();
    // Opcional: muestra el modal cuando se añade algo
    openCartModal();
}

/**
 * Elimina un producto completamente del carrito.
 * @param {string} productId - ID único del producto.
 */
function removeItemFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

/**
 * Modifica la cantidad de un producto.
 * @param {string} productId - ID único del producto.
 * @param {number} change - +1 para incrementar, -1 para decrementar.
 */
function changeQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);

    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            // Si la cantidad llega a 0 o menos, elimina el artículo
            removeItemFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}


// 3. FUNCIONES DE ACTUALIZACIÓN DE LA INTERFAZ (DOM)

/**
 * Actualiza el contador del carrito, el listado de productos, el total y el localStorage.
 */
function updateCartDisplay() {
    // 1. Actualizar localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    // 2. Actualizar Contador
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCounterElement.textContent = totalItems;

    // 3. Renderizar Productos en el Modal
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="padding: 1rem; text-align: center;">El carrito está vacío.</p>';
        cartTotalElement.textContent = 'Subtotal: €0.00';
        return;
    }

    let total = 0;
    let html = '';

    cart.forEach(item => {
        const itemSubtotal = item.price * item.qty;
        total += itemSubtotal;

        html += `
            <div class="cart-item-row" data-id="${item.id}">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-info">
                    <span>(€${item.price.toFixed(2)})</span>
                    <div class="quantity-controls">
                        <button class="qty-btn decrease-qty-btn" data-id="${item.id}">-</button>
                        <span class="qty">${item.qty}</span>
                        <button class="qty-btn increase-qty-btn" data-id="${item.id}">+</button>
                    </div>
                    <span class="subtotal">€${itemSubtotal.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${item.id}">✖</button>
                </div>
            </div>
        `;
    });

    cartItemsList.innerHTML = html;

    // 4. Actualizar Total
    cartTotalElement.textContent = `Subtotal: €${total.toFixed(2)}`;
    
    // 5. Re-adjuntar Event Listeners para los botones dentro del carrito
    attachModalButtonListeners();
}

/**
 * Adjunta listeners a los botones de cantidad y eliminar dentro del modal del carrito.
 */
function attachModalButtonListeners() {
    // Escucha para botones de Aumentar Cantidad
    cartItemsList.querySelectorAll('.increase-qty-btn').forEach(button => {
        button.addEventListener('click', () => {
            changeQuantity(button.getAttribute('data-id'), 1);
        });
    });

    // Escucha para botones de Disminuir Cantidad
    cartItemsList.querySelectorAll('.decrease-qty-btn').forEach(button => {
        button.addEventListener('click', () => {
            changeQuantity(button.getAttribute('data-id'), -1);
        });
    });

    // Escucha para botones de Eliminar
    cartItemsList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            removeItemFromCart(button.getAttribute('data-id'));
        });
    });
}

// 4. FUNCIONES DE CONTROL DEL MODAL
/**
 * Muestra el modal del carrito.
 */
function openCartModal() {
    cartModal.classList.add('visible');
    // Actualiza el contenido justo antes de abrirlo
    updateCartDisplay(); 
}

/**
 * Oculta el modal del carrito.
 */
function closeCartModal() {
    cartModal.classList.remove('visible');
}

// 5. INICIALIZACIÓN (Al cargar el DOM)

document.addEventListener('DOMContentLoaded', function() {
    const btnMostrarCarrito = document.getElementById('btn-mostrar-carrito');
    
    if (btnMostrarCarrito) {
        // Listener para abrir el modal desde el encabezado
        btnMostrarCarrito.addEventListener('click', function(e) {
            e.preventDefault();
            openCartModal();
        });
    }

    // Asegura que la función closeCartModal esté disponible globalmente (para el botón X)
    window.closeCartModal = closeCartModal;

    // Inicializa el estado del carrito al cargar la página
    updateCartDisplay();
});