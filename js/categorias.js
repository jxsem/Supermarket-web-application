document.addEventListener('DOMContentLoaded', async function() {
    // 1. SELECTORES GLOBALES
    const productContentArea = document.getElementById('product-content-area'); // Para categorias.html
    const searchInput = document.getElementById('buscador-principal');
    const searchForm = document.querySelector('.header-search form');
    
    // SELECTORES ESPECÍFICOS PARA EL INDEX (Los que añadimos antes)
    const contenedorBusqueda = document.getElementById('contenedor-resultados-busqueda');
    const contenidoEstatico = document.getElementById('contenido-estatico-index');

    let globalProducts = []; 

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
    }

    // 2. FUNCIÓN DE RENDERIZADO MEJORADA
    // Ahora acepta un contenedor como parámetro para saber dónde pintar
    function renderizarEn(contenedor, productos, titulo) {
        if (!contenedor) return;

        contenedor.innerHTML = `
            <section class="featured-products">
                <h3>${titulo}</h3>
                <div class="product-section-group">
                    <div class="category-grid">
                        ${productos.length > 0 ? productos.map(p => `
                            <article class="product-card-category">
                                <div class="product-image-small">
                                    <img src="${p.imageUrl}" alt="${p.name}" loading="lazy" width="150" height="150">
                                </div>
                                <h5>${p.name}</h5>
                                <p class="description">${p.description}</p>
                                <span class="price">€${p.price.toFixed(2)} / pieza</span>
                                <button class="add-to-cart-btn" 
                                        data-id="${p.code}" 
                                        data-name="${p.name}" 
                                        data-price="${p.price}">Añadir</button>
                            </article>
                        `).join('') : '<p style="padding: 20px;">No se encontraron productos.</p>'}
                    </div>
                </div>
            </section>
        `;
        // Intentar vincular el carrito si la función existe
        if (typeof attachCartListeners === 'function') attachCartListeners();
        else if (window.attachCartListeners) window.attachCartListeners();
    }

    // 3. LÓGICA DE BÚSQUEDA SIN RECARGAS MOLESTAS
    if (searchInput) {
        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value.trim();

            if (query.length >= 2) {
                try {
                    const response = await fetch(`http://127.0.0.1:8080/api/products/search?name=${query}`);
                    const results = await response.json();
                    
                    // Si estamos en el INDEX
                    if (contenidoEstatico && contenedorBusqueda) {
                        contenidoEstatico.style.display = 'none'; // Escondemos tus destacados
                        contenedorBusqueda.style.display = 'block';
                        renderizarEn(contenedorBusqueda, results, `Resultados para: "${query}"`);
                        contenedorBusqueda.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } 
                    // Si estamos en CATEGORÍAS
                    else if (productContentArea) {
                        renderizarEn(productContentArea, results, `Resultados para: "${query}"`);
                    }
                } catch (error) {
                    console.error("Error en búsqueda:", error);
                }
            } else if (query.length === 0) {
                // RESTAURACIÓN SIN RELOAD
                if (contenidoEstatico && contenedorBusqueda) {
                    contenedorBusqueda.style.display = 'none';
                    contenedorBusqueda.innerHTML = '';
                    contenidoEstatico.style.display = 'block'; // Vuelven tus destacados originales
                } else if (productContentArea && window.location.pathname.includes('categorias.html')) {
                    renderizarEn(productContentArea, globalProducts, 'Frutas y Verduras');
                }
            }
        });
    }

    // 4. CARGA INICIAL (Solo Categorías)
    if (window.location.pathname.includes('categorias.html') && productContentArea) {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/products');
            globalProducts = await response.json();
            renderizarEn(productContentArea, globalProducts, 'Frutas y Verduras');
        } catch (error) {
            console.error("Error inicial:", error);
        }
    }
});