/**
 * shoppingCart.js

 * Funciones para mostrar productos y carrito en el DOM
 * Maneja los eventos de los botones (clic, agregar, eliminar)
 */
// REFERENCIAS A ELEMENTOS DEL DOM

const productsContainer = document.querySelector('.productos');        // Contenedor de tarjetas de productos
const cartContainer = document.querySelector('.items-carrito-lista'); // Contenedor de items del carrito
const totalElement = document.querySelector('.total p');              // Elemento donde se muestra el total
const cartCounter = document.querySelector('.cart-count');            // Contador de items del carrito
const clearCartBtn = document.querySelector('.btn-vaciar');           // Botón para vaciar el carrito

// FUNCIÓN: renderizar productos
function renderProducts() {
    // Verificar que el contenedor exista
    if (!productsContainer) return;
    
    // Limpiar el contenedor antes de agregar nuevos productos
    productsContainer.innerHTML = '';
    
    // Recorrer cada producto del arreglo
    products.forEach(product => {
        // Crear la tarjeta del producto usando template strings
        const card = `
            <article class="card-producto" data-id="${product.id}">
                <div class="imagen-producto">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="info-producto">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="footer-card">
                        <span class="precio">$${product.price.toLocaleString()}</span>
                        <button class="btn-agregar" data-id="${product.id}">
                            + Agregar
                        </button>
                    </div>
                </div>
            </article>
        `;
        
        // Insertar la tarjeta en el contenedor de productos
        productsContainer.innerHTML += card;
    });
    
    // Después de crear las tarjetas, agregar eventos a los botones "Agregar"
    addAddToCartEvents();
}


// FUNCIÓN: agregar eventos a botones "Agregar"
function addAddToCartEvents() {
    // Seleccionar todos los botones de agregar
    const addButtons = document.querySelectorAll('.btn-agregar');
    
    // Recorrer cada botón y agregarle un evento click
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener el ID del producto desde el atributo data-id
            const productId = parseInt(button.dataset.id);
            // Llamar a la función para agregar al carrito
            addToCart(productId);
        });
    });
}

// FUNCIÓN: renderizar carrito
function renderCart() {
    // Verificar que el contenedor exista
    if (!cartContainer) return;
    
    // Limpiar el contenedor del carrito
    cartContainer.innerHTML = '';
    
    // Verificar si el carrito está vacío
    if (cart.length === 0) {
        // Mostrar mensaje de carrito vacío
        cartContainer.innerHTML = `
            <div class="carrito-vacio">
                <p>🛒 El carrito está vacío</p>
                <p class="texto-small">Agrega productos para comenzar</p>
            </div>
        `;
        return;
    }
    
    // Recorrer el carrito y mostrar cada producto
    cart.forEach(item => {
        // Calcular el subtotal (precio × cantidad)
        const subtotal = item.price * item.quantity;
        
        // Crear el HTML del item del carrito
        const itemHTML = `
            <div class="item-carrito" data-id="${item.id}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <div class="controles-cantidad">
                        <button class="btn-disminuir" data-id="${item.id}">-</button>
                        <span class="cantidad">${item.quantity}</span>
                        <button class="btn-aumentar" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="item-acciones">
                    <span class="subtotal">$${subtotal.toLocaleString()}</span>
                    <button class="btn-eliminar" data-id="${item.id}">🗑️</button>
                </div>
            </div>
        `;
        
        // Insertar el item en el contenedor del carrito
        cartContainer.innerHTML += itemHTML;
    });
    
    // Agregar eventos a los botones del carrito (+ , - , eliminar)
    addCartEvents();
}

// FUNCIÓN: agregar eventos al carrito
function addCartEvents() {
    // Eventos para botones AUMENTAR (+)
    const increaseButtons = document.querySelectorAll('.btn-aumentar');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            increaseQuantity(id);  // Llamar a función de cart.js
        });
    });
    
    // Eventos para botones DISMINUIR (-)
    const decreaseButtons = document.querySelectorAll('.btn-disminuir');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            decreaseQuantity(id);  // Llamar a función de cart.js
        });
    });
    
    // Eventos para botones ELIMINAR (🗑️)
    const removeButtons = document.querySelectorAll('.btn-eliminar');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            removeFromCart(id);    // Llamar a función de cart.js
        });
    });
}


// FUNCIÓN: actualizar total y contador
function updateTotal() {
    // Actualizar el total de la compra
    if (totalElement) {
        const total = calculateTotal();  // Llamar a función de cart.js
        totalElement.textContent = `$${total.toLocaleString()}`;
    }
    
    // Actualizar el contador de items
    if (cartCounter) {
        const totalItems = getTotalItems();  // Llamar a función de cart.js
        cartCounter.textContent = `(${totalItems} items)`;
    }
}


// FUNCIÓN: inicializar la aplicación
function initialize() {
    // Cargar carrito desde localStorage (función de cart.js)
    loadCart();
    
    // Renderizar productos en el DOM
    renderProducts();
    
    // Renderizar carrito en el DOM
    renderCart();
    
    // Actualizar total y contador
    updateTotal();
    
    // Agregar evento al botón "Vaciar Carrito" (si existe)
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Mensajes en consola para verificar que todo funciona
    console.log('✅ PixelCore iniciado correctamente');
    console.log(`📦 ${products.length} productos cargados`);
    console.log(`🛒 ${cart.length} items en carrito`);
}

// INICIAR LA APLICACIÓN
document.addEventListener('DOMContentLoaded', initialize);