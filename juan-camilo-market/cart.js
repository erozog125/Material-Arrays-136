

 // cart.js - LÓGICA DEL CARRITO DE COMPRAS



let cart = [];

// FUNCIÓN: agregar producto al carrito

function addToCart(productId) {
    // Buscar el producto en la base de datos
    const product = products.find(p => p.id === productId);
    
    // Si no existe el producto, salir de la función
    if (!product) return;
    
    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        // Si ya existe, incrementar su cantidad en 1
        existingProduct.quantity += 1;
    } else {
        // Si no existe, agregarlo con cantidad inicial 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    // Guardar el carrito actualizado en localStorage
    saveCart();
    
    // Actualizar la interfaz (si las funciones existen)
    if (typeof renderCart === 'function') {
        renderCart();
        updateTotal();
    }
}

// FUNCIÓN: aumentar cantidad de un producto

function increaseQuantity(productId) {
    // Buscar el producto en el carrito
    const product = cart.find(item => item.id === productId);
    
    if (product) {
        // Incrementar cantidad en 1
        product.quantity += 1;
        
        // Guardar cambios en localStorage
        saveCart();
        
        // Actualizar la interfaz
        if (typeof renderCart === 'function') {
            renderCart();
            updateTotal();
        }
    }
}

// FUNCIÓN: disminuir cantidad de un producto
function decreaseQuantity(productId) {
    // Buscar el producto en el carrito
    const product = cart.find(item => item.id === productId);
    
    if (product) {
        if (product.quantity > 1) {
            // Si hay más de 1, solo disminuir la cantidad
            product.quantity -= 1;
            saveCart();
            
            if (typeof renderCart === 'function') {
                renderCart();
                updateTotal();
            }
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            removeFromCart(productId);
        }
    }
}

// FUNCIÓN: eliminar producto del carrito


function removeFromCart(productId) {
    // Filtrar: mantener solo los productos con ID diferente al que queremos eliminar
    cart = cart.filter(item => item.id !== productId);
    
    // Guardar cambios en localStorage
    saveCart();
    
    // Actualizar la interfaz
    if (typeof renderCart === 'function') {
        renderCart();
        updateTotal();
    }
}


// FUNCIÓN: vaciar carrito completo
function clearCart() {
    // Mostrar confirmación al usuario
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        // Vaciar el arreglo del carrito
        cart = [];
        
        // Guardar cambios en localStorage
        saveCart();
        
        // Actualizar la interfaz
        if (typeof renderCart === 'function') {
            renderCart();
            updateTotal();
        }
    }
}

// FUNCIÓN: calcular el total de la compra
function calculateTotal() {
    // Usar reduce para sumar todos los subtotales
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0); // 0 es el valor inicial del acumulador
}

// FUNCIÓN: obtener el total de items

function getTotalItems() {
    // Usar reduce para sumar todas las cantidades
    return cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
}

// FUNCIÓN: guardar carrito en localStorage
function saveCart() {
    // Convertir el arreglo a string JSON
    const cartJSON = JSON.stringify(cart);
    
    // Guardar en localStorage con la clave 'pixelcore-cart'
    localStorage.setItem('pixelcore-cart', cartJSON);
}

// FUNCIÓN: cargar carrito desde localStorage
function loadCart() {
    // Obtener el carrito guardado (si existe)
    const savedCart = localStorage.getItem('pixelcore-cart');
    
    if (savedCart) {
        // Convertir de JSON a arreglo de objetos
        cart = JSON.parse(savedCart);
    } else {
        // Si no hay nada guardado, iniciar con carrito vacío
        cart = [];
    }
}