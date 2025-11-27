document.addEventListener('DOMContentLoaded', function() {
    const filterMenu = document.querySelector('.filter-menu-nested');
    const productContentArea = document.getElementById('product-content-area');
    
    if (!filterMenu || !productContentArea) return;

    // CONTENIDO HTML COMPLETO Y ESTÁTICO DE LOS 16 PRODUCTOS ---
    const allProductsHtml = `
        <h2>Frutas y Verduras (Venta por Piezas)</h2>
        <div class="product-category-group">
            <h4>Productos Frescos</h4>
            <div class="category-grid">
            
                <article class="product-card-category" data-category="fruta" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/manzana-golden.png" alt="Manzana Golden" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Manzana&nbsp;Golden</h5>
                    <p class="description">Pieza de manzana fresca.</p>
                    <span class="price">€0.45 / pieza</span>
                    <button class="add-to-cart-btn" data-id="FR_MANZ01" data-name="Manzana Golden" data-price="0.45">Añadir</button>
                </article>

                <article class="product-card-category" data-category="fruta" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/platano-canarias.jpg" alt="Plátano de Canarias" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Plátano&nbsp;de&nbsp;Canarias</h5>
                    <p class="description">Pieza de plátano.</p>
                    <span class="price">€0.35 / pieza</span>
                    <button class="add-to-cart-btn" data-id="FR_PLT07" data-name="Plátano de Canarias" data-price="0.35">Añadir</button>
                </article>
                
                <article class="product-card-category" data-category="fruta" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/naranja-mesa.png" alt="Naranja de Mesa" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Naranja&nbsp;de&nbsp;Mesa</h5>
                    <p class="description">Pieza de naranja.</p>
                    <span class="price">€0.25 / pieza</span>
                    <button class="add-to-cart-btn" data-id="FR_NARAN02" data-name="Naranja de Mesa" data-price="0.25">Añadir</button>
                </article>

                <article class="product-card-category" data-category="fruta" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/aguacates-hass.jpg" alt="Aguacate Hass" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Aguacate&nbsp;Hass</h5>
                    <p class="description">Pieza madura.</p>
                    <span class="price">€1.20 / pieza</span>
                    <button class="add-to-cart-btn" data-id="FR_AGUA08" data-name="Aguacate Hass" data-price="1.20">Añadir</button>
                </article>

                <article class="product-card-category" data-category="fruta" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/limon.jpg" alt="Limón" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Limón</h5>
                    <p class="description">Pieza de limón.</p>
                    <span class="price">€0.10 / pieza</span>
                    <button class="add-to-cart-btn" data-id="FR_LIMON09" data-name="Limón" data-price="0.10">Añadir</button>
                </article>

                <article class="product-card-category" data-category="fruta" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/melocoton.jpg" alt="Melocotón" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Melocotón</h5>
                    <p class="description">Pieza de melocotón.</p>
                    <span class="price">€0.60 / pieza</span>
                    <button class="add-to-cart-btn" data-id="FR_MELO10" data-name="Melocotón" data-price="0.60">Añadir</button>
                </article>
                
                <article class="product-card-category" data-category="verdura" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/pimiento-rojo.jpg" alt="Pimiento Rojo" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Pimiento&nbsp;Rojo</h5>
                    <p class="description">Pieza de pimiento.</p>
                    <span class="price">€1.50 / pieza</span>
                    <button class="add-to-cart-btn" data-id="VE_PIM04" data-name="Pimiento Rojo" data-price="1.50">Añadir</button>
                </article>

                <article class="product-card-category" data-category="verdura" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/pepino.jpg" alt="Pepino" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Pepino</h5>
                    <p class="description">Pieza de pepino.</p>
                    <span class="price">€0.75 / pieza</span>
                    <button class="add-to-cart-btn" data-id="VE_PEP11" data-name="Pepino" data-price="0.75">Añadir</button>
                </article>
                
                <article class="product-card-category" data-category="verdura" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/calabacin.jpg" alt="Calabacín" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Calabacín</h5>
                    <p class="description">Pieza de calabacín.</p>
                    <span class="price">€0.85 / pieza</span>
                    <button class="add-to-cart-btn" data-id="VE_CALAB12" data-name="Calabacín" data-price="0.85">Añadir</button>
                </article>

                <article class="product-card-category" data-category="verdura" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/berenjena.jpg" alt="Berenjena" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Berenjena</h5>
                    <p class="description">Pieza de berenjena.</p>
                    <span class="price">€0.90 / pieza</span>
                    <button class="add-to-cart-btn" data-id="VE_BEREN13" data-name="Berenjena" data-price="0.90">Añadir</button>
                </article>

                <article class="product-card-category" data-category="verdura" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/cebolla-blanca.jpg" alt="Cebolla Blanca" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Cebolla&nbsp;Blanca</h5>
                    <p class="description">Pieza de cebolla.</p>
                    <span class="price">€0.20 / pieza</span>
                    <button class="add-to-cart-btn" data-id="VE_CEBO14" data-name="Cebolla Blanca" data-price="0.20">Añadir</button>
                </article>

                <article class="product-card-category" data-category="verdura" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/lechuga-iceberg.jpg" alt="Lechuga Iceberg" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Lechuga&nbsp;Iceberg</h5>
                    <p class="description">Unidad de lechuga.</p>
                    <span class="price">€1.10 / pieza</span>
                    <button class="add-to-cart-btn" data-id="VE_LECH15" data-name="Lechuga Iceberg" data-price="1.10">Añadir</button>
                </article>

                <article class="product-card-category" data-category="verdura" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/alcachofa.jpg" alt="Alcachofa" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Alcachofa</h5>
                    <p class="description">Pieza de alcachofa.</p>
                    <span class="price">€0.70 / pieza</span>
                    <button class="add-to-cart-btn" data-id="VE_ALCA16" data-name="Alcachofa" data-price="0.70">Añadir</button>
                </article>

                <article class="product-card-category" data-category="ensalada" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/ensalada-mixta.jpg" alt="Ensalada Mixta" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Ensalada&nbsp;Mixta</h5>
                    <p class="description">Tarrina de ensalada.</p>
                    <span class="price">€2.99 / ud</span>
                    <button class="add-to-cart-btn" data-id="EN_MIX05" data-name="Ensalada Mixta" data-price="2.99">Añadir</button>
                </article>

                <article class="product-card-category" data-category="ensalada" style="display: block;">
                    <div class="product-image-small">
                        <img src="/imgProductos/ensalada-cesar.jpg" alt="Ensalada César" loading="lazy" width="150" height="150">
                    </div>
                    <h5>Ensalada&nbsp;César</h5>
                    <p class="description">Ensalada preparada.</p>
                    <span class="price">€3.50 / ud</span>
                    <button class="add-to-cart-btn" data-id="EN_CESAR06" data-name="Ensalada César" data-price="3.50">Añadir</button>
                </article>
                
            </div>
        </div>
    `;

    // --- FUNCIÓN DE MANEJO DE CARRITO ---
    function handleAddToCart(event) {
        if (typeof addToCart === 'function') {
            const button = event.currentTarget;
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price'))
            };
            addToCart(product);
        } else {
            console.error("Función 'addToCart' no encontrada. Asegúrate de que cart-logic.js está cargado.");
        }
    }
    // Función global para que pueda ser llamada desde checkout.js 
    window.handleAddToCart = handleAddToCart; 

    // --- FUNCIÓN PARA ADJUNTAR LISTENERS ---
    function attachCartListeners() {
        const cartButtons = productContentArea.querySelectorAll('.add-to-cart-btn');

        cartButtons.forEach(button => {
            button.removeEventListener('click', handleAddToCart); 
            button.addEventListener('click', handleAddToCart);
        });
    }

    // --- FUNCIÓN DE FILTRADO (Muestra/Oculta) ---
    function filterProducts(filterType) {
        const allProducts = productContentArea.querySelectorAll('.product-card-category');
        
        if (allProducts.length > 0) {
            allProducts.forEach(product => {
                const productCategory = product.getAttribute('data-category');

                if (filterType === 'all' || productCategory === filterType) {
                    product.style.display = 'block'; 
                } else {
                    product.style.display = 'none';
                }
            });
        }
        
        // Actualizar título
        const titleElement = productContentArea.querySelector('h2');
        if (titleElement) {
             switch (filterType) {
                case 'fruta':
                    titleElement.textContent = 'Fruta de Temporada (Por Piezas)';
                    break;
                case 'verdura':
                    titleElement.textContent = 'Verdura Fresca (Por Piezas)';
                    break;
                case 'ensalada':
                    titleElement.textContent = 'Ensaladas Preparadas (Por Unidad)';
                    break;
                default:
                    titleElement.textContent = 'Frutas y Verduras (Venta por Piezas)';
                    break;
            }
        }
    }

    // --- 2. INICIALIZACIÓN ---
    // Cargar el contenido estático completo en la página
    productContentArea.innerHTML = allProductsHtml;
    attachCartListeners();
    filterProducts('all'); // Asegura que se muestre todo al inicio

    // --- 3. LISTENER DE EVENTOS PARA EL MENÚ ---
    filterMenu.addEventListener('click', function(event) {
        const target = event.target.closest('a');
        if (!target) return;
        
        event.preventDefault(); 
        
        const parentLi = target.parentElement;
        const linkText = target.textContent.trim();
        
        // Lógica para categorías principales
        if (parentLi.classList.contains('main-category')) {
            const subList = parentLi.querySelector('.sub-category-list');
            if (subList) {
                document.querySelectorAll('.main-category').forEach(li => li.classList.remove('open'));
                parentLi.classList.toggle('open');
            }
            document.querySelectorAll('.main-category').forEach(li => li.classList.remove('active'));
            document.querySelectorAll('.sub-category-item').forEach(li => li.classList.remove('active'));
            parentLi.classList.add('active');


            if (linkText !== 'Fruta y verdura') {
                 // Si es otra categoría principal, limpiamos y mostramos mensaje
                 productContentArea.innerHTML = `
                    <h2>${linkText}</h2>
                    <div class="product-category-group">
                        <p>Productos para esta categoría no disponibles en este momento. Por favor, revisa las subcategorías.</p>
                    </div>
                 `;
            } else {
                 // Si volvemos a "Fruta y verdura", recargamos el HTML completo y filtramos todo
                 productContentArea.innerHTML = allProductsHtml;
                 attachCartListeners(); 
                 filterProducts('all');
            }
            
        }
        // Lógica de Filtrado (Subcategorías)
        else if (parentLi.classList.contains('sub-category-item')) {
            let filterKey = '';
            
            document.querySelectorAll('.sub-category-item').forEach(li => li.classList.remove('active'));
            parentLi.classList.add('active');

            // Aseguramos que el HTML completo esté en el DOM antes de filtrar
            if (!productContentArea.querySelector('.category-grid')) {
                productContentArea.innerHTML = allProductsHtml;
                attachCartListeners();
            }

            switch (linkText) {
                case 'Fruta de temporada':
                    filterKey = 'fruta';
                    filterProducts(filterKey);
                    break;
                case 'Verdura fresca':
                    filterKey = 'verdura';
                    filterProducts(filterKey);
                    break;
                case 'Ensaladas preparadas':
                    filterKey = 'ensalada';
                    filterProducts(filterKey);
                    break;
                default:
                     const mainCategoryText = parentLi.closest('.main-category').querySelector('a').textContent.trim();
                     productContentArea.innerHTML = `
                        <h2>${mainCategoryText} / ${linkText}</h2>
                        <div class="product-category-group">
                            <p>No hay productos disponibles para esta subcategoría aún.</p>
                        </div>
                     `;
                     return; 
            }
        }
    });
});