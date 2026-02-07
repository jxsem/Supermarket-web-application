/**
 * Lógica para manejar el resumen del pedido y la validación de pago/código postal/teléfono.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const summaryItems = document.getElementById('summary-items');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const shippingAmount = document.getElementById('shipping-amount');
    const totalAmount = document.getElementById('total-amount');
    
    const paymentOptions = document.querySelector('.payment-options');
    const cardDetailsSection = document.getElementById('card-details-section');
    const cashOnDeliveryInput = document.getElementById('cash_on_delivery');
    const cardInput = document.getElementById('card');
    
    const zipInput = document.getElementById('zip');
    const phoneInput = document.getElementById('tel'); // Nuevo input de teléfono
    const checkoutForm = document.getElementById('checkout-form');
    
    // Constantes de Costos y Códigos Postales
    const SHIPPING_COST = 0; 
    const COD_DEPOSIT_COST = 10.00; // Depósito fijo a pagar con tarjeta
    
    const VALID_ZIP_CODES = {
        '18198': 'Huétor Vega',
        '18199': 'Cájar',
        '18140': 'La Zubia',
        '18193': 'Monachil'
    };

    let currentDepositCost = 0;


    // 1. GESTIÓN DE DATOS Y RESUMEN DEL PEDIDO
    // (Funciones loadOrderSummary y updateTotalDisplay sin cambios)


    function loadOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        let subtotal = 0;
        let htmlContent = '';

        if (cart.length === 0) {
            htmlContent = `
                <div class="empty-cart-message">
                    <p>Tu carrito está vacío. Por favor, <a href="categorias.html">vuelve a categorías</a> para empezar tu pedido.</p>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.qty;
                subtotal += itemTotal;

                htmlContent += `
                    <div class="summary-item">
                        <span class="item-name">${item.name}</span>
                        <span class="item-qty">${item.qty} ud.</span>
                        <span class="item-price">€${itemTotal.toFixed(2)}</span>
                    </div>
                `;
            });
        }
        
        summaryItems.innerHTML = htmlContent;
        subtotalAmount.textContent = `€${subtotal.toFixed(2)}`;
        shippingAmount.textContent = SHIPPING_COST === 0 ? 'Gratis' : `€${SHIPPING_COST.toFixed(2)}`;
        
        updateTotalDisplay(subtotal);
    }
    
    function updateTotalDisplay(subtotal) {
        const totalTarjeta = currentDepositCost;
        const totalEfectivo = subtotal + SHIPPING_COST - currentDepositCost;

        let depositLine = document.getElementById('deposit-line');
        
        if (currentDepositCost > 0) {
            if (!depositLine) {
                const summaryTotals = document.querySelector('.summary-totals');
                depositLine = document.createElement('div');
                depositLine.className = 'summary-line deposit-cost';
                depositLine.id = 'deposit-line';
                depositLine.innerHTML = `<span>Depósito Tarjeta (a pagar ahora)</span><span id="deposit-amount">€${COD_DEPOSIT_COST.toFixed(2)}</span>`;
                
                const totalLine = summaryTotals.querySelector('.summary-line.total');
                summaryTotals.insertBefore(depositLine, totalLine);
            }
            document.getElementById('deposit-amount').textContent = `€${currentDepositCost.toFixed(2)}`;
            
            totalAmount.textContent = `€${totalTarjeta.toFixed(2)}`;

            let cashDueLine = document.getElementById('cash-due-line');
            if (!cashDueLine) {
                const summaryTotals = document.querySelector('.summary-totals');
                cashDueLine = document.createElement('div');
                cashDueLine.className = 'summary-line cash-due';
                cashDueLine.id = 'cash-due-line';
                cashDueLine.innerHTML = `<span><strong style="color: var(--color-darker);">Restante a pagar en efectivo</strong></span><span id="cash-due-amount" style="font-size: 1.1rem; color: var(--color-darker);">€${totalEfectivo.toFixed(2)}</span>`;
                summaryTotals.appendChild(cashDueLine);
            }
            document.getElementById('cash-due-amount').textContent = `€${totalEfectivo.toFixed(2)}`;

        } else {
            if (depositLine) depositLine.remove();
            let cashDueLine = document.getElementById('cash-due-line');
            if (cashDueLine) cashDueLine.remove();

            totalAmount.textContent = `€${(subtotal + SHIPPING_COST).toFixed(2)}`;
        }
    }

    // 2. LÓGICA DE FORMAS DE PAGO (Contrareembolso)
    // (Función handlePaymentChange sin cambios)


    function handlePaymentChange() {
        const isCashOnDelivery = cashOnDeliveryInput.checked;
        const subtotalText = subtotalAmount.textContent.replace('€', '');
        const currentSubtotal = parseFloat(subtotalText) || 0;

        cardDetailsSection.style.maxHeight = '500px'; 
        cardDetailsSection.style.padding = '1rem';
        cardDetailsSection.style.opacity = '1';

        if (isCashOnDelivery) {
            const cashAmount = (currentSubtotal + SHIPPING_COST - COD_DEPOSIT_COST).toFixed(2);
            
            const message = `
                <p style="color: var(--color-primary); font-weight: bold; margin-top: 1rem;">
                    ¡Atención! Para seleccionar Contrareembolso, se requiere un depósito de 
                    <span style="color: var(--color-accent);">€${COD_DEPOSIT_COST.toFixed(2)}</span> 
                    que se cargará a la tarjeta ahora.
                </p>
                <p style="font-size: 0.9rem; margin-bottom: 1rem;">
                    El saldo restante de <strong style="color: var(--color-darker);">€${cashAmount}</strong> se pagará en efectivo a la entrega.
                    <br><span style="font-size: 0.8rem; color: #777;">(No se aceptan billetes de 100€, 200€ ni 500€ en efectivo.)</span>
                </p>
            `;
            
            let codMessageDiv = document.getElementById('cod-message');
            if (!codMessageDiv) {
                codMessageDiv = document.createElement('div');
                codMessageDiv.id = 'cod-message';
                paymentOptions.insertAdjacentElement('afterend', codMessageDiv); 
            }
            codMessageDiv.innerHTML = message;

            currentDepositCost = COD_DEPOSIT_COST;
        } else {
            const codMessageDiv = document.getElementById('cod-message');
            if (codMessageDiv) {
                codMessageDiv.remove();
            }

            currentDepositCost = 0;
        }
        
        updateTotalDisplay(currentSubtotal);
    }
    
    if (paymentOptions) {
        paymentOptions.addEventListener('change', handlePaymentChange);
    }

    // 3. LÓGICA DE VALIDACIÓN DE CÓDIGO POSTAL Y TELÉFONO

    function validateZipCode() {
        const zipCode = zipInput.value.trim();
        const isValid = VALID_ZIP_CODES.hasOwnProperty(zipCode);
        
        zipInput.setCustomValidity(''); 
        zipInput.style.borderColor = '#ccc';
        
        if (zipCode && !isValid) {
            const validZipsList = Object.keys(VALID_ZIP_CODES).map(zip => `${zip} (${VALID_ZIP_CODES[zip]})`).join(', ');
            
            zipInput.setCustomValidity(`Lo sentimos, el código postal ${zipCode} no está dentro de nuestra área de reparto. Las zonas válidas son: ${validZipsList}.`);
            zipInput.style.borderColor = '#D32F2F'; 
        }
        
        zipInput.reportValidity(); 
        return isValid;
    }
    
    /**
     * Valida que el teléfono tenga 9 dígitos y empiece por 6, 7 o 9.
     * @returns {boolean} True si el formato es correcto.
     */
    function validatePhoneNumber() {
        const phone = phoneInput.value.trim().replace(/\s/g, ''); // Quita espacios para la validación
        
        // Regex: ^[679] -> debe empezar por 6, 7 o 9
        // \d{8} -> debe tener 8 dígitos más (para un total de 9)
        // $ -> debe terminar ahí
        const phoneRegex = /^[679]\d{8}$/;
        const isValid = phoneRegex.test(phone);

        phoneInput.setCustomValidity('');
        phoneInput.style.borderColor = '#ccc';

        if (!isValid) {
            let errorMessage = "Por favor, introduce un número de teléfono válido (9 dígitos).";
            if (phone.length === 9 && !phoneRegex.test(phone)) {
                 errorMessage = "El número de teléfono debe empezar por 6, 7 o 9.";
            } else if (phone.length !== 9) {
                 errorMessage = "El número debe tener exactamente 9 dígitos.";
            }
            
            phoneInput.setCustomValidity(errorMessage);
            phoneInput.style.borderColor = '#D32F2F'; // Rojo para error
        }
        
        phoneInput.reportValidity();
        return isValid;
    }


    // Añadir listeners de validación
    if (zipInput) {
        zipInput.addEventListener('blur', validateZipCode);
    }
    
    if (phoneInput) {
        // Ejecuta la validación al perder el foco y al escribir (input)
        phoneInput.addEventListener('blur', validatePhoneNumber);
        phoneInput.addEventListener('input', function() {
            // Solo valida al escribir si el campo tiene datos
            if (this.value.trim().length > 0) {
                 validatePhoneNumber();
            }
        });
    }

    // 4. INICIALIZACIÓN Y ENVÍO

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            // Validar ambos campos antes de enviar
            const isZipValid = validateZipCode();
            const isPhoneValid = validatePhoneNumber();
            
            if (!isZipValid || !isPhoneValid) {
                e.preventDefault(); // Detener el envío si alguna validación falla
            }
        });
    }

    loadOrderSummary();
    handlePaymentChange(); 
});