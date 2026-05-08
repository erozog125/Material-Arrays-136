// Arreglo de productos de la tienda
const productos = [
    { id: 1, nombre: "Hamburguesa Clásica con Queso", precio: 12000, imagen: "assets/Hamburguesa_clasica_queso.png" },
    { id: 2, nombre: "Hamburguesa Doble Carne", precio: 18000, imagen: "assets/Hamburguesa_doble_carne.png" },
    { id: 3, nombre: "Hotdog Clásico", precio: 8000, imagen: "assets/Hotdog_clasico.png" },
    { id: 4, nombre: "Papas Fritas", precio: 6000, imagen: "assets/Papas_fritas.png" },
    { id: 5, nombre: "Pizza Pepperoni", precio: 22000, imagen: "assets/Pizza_pepperoni.png" },
    { id: 6, nombre: "Pollo Frito Crujiente", precio: 15000, imagen: "assets/Pollo_frito_crujiente.png" },
]

// Recuperar el carrito del localStorage al cargar la página
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

// Función para renderizar las cards de productos en el DOM
const renderizarProductos = () => {
    const contenedor = document.querySelector('#products-container')
    contenedor.innerHTML = ''

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="product-card">
                <div class="product-card__img-wrapper">
                    <img class="product-card__img" src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="product-card__body">
                    <h3 class="product-card__name">${producto.nombre}</h3>
                    <p class="product-card__price">$${producto.precio.toLocaleString('es-CO')}</p>
                    <button class="product-card__btn" onclick="agregarAlCarrito(${producto.id})">
                        🛒 Agregar al carrito
                    </button>
                </div>
            </div>
        `
    })
}

// Función para agregar un producto al carrito
const agregarAlCarrito = (id) => {
    const productoExistente = carrito.find(item => item.id === id)

    if (productoExistente) {
        // Si ya existe en el carrito, aumentar la cantidad
        productoExistente.cantidad++
    } else {
        // Si no existe, buscarlo en el arreglo de productos y agregarlo
        const producto = productos.find(item => item.id === id)
        carrito.push({ ...producto, cantidad: 1 })
    }

    actualizarCarrito()
    guardarCarrito()
}

// Función para actualizar el carrito en el DOM
const actualizarCarrito = () => {
    const contenedorItems = document.querySelector('#cart-items')
    const cartCount = document.querySelector('#cart-count')

    contenedorItems.innerHTML = ''

    if (carrito.length === 0) {
        contenedorItems.innerHTML = '<p class="cart__empty">Tu carrito está vacío 🥺</p>'
    } else {
        carrito.forEach(item => {
            contenedorItems.innerHTML += `
                <div class="cart-item">
                    <img class="cart-item__img" src="${item.imagen}" alt="${item.nombre}">
                    <div class="cart-item__info">
                        <p class="cart-item__name">${item.nombre}</p>
                        <p class="cart-item__price">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
                    </div>
                    <div class="cart-item__controls">
                        <button class="cart-item__qty-btn" onclick="cambiarCantidad(${item.id}, -1)">−</button>
                        <span class="cart-item__qty">${item.cantidad}</span>
                        <button class="cart-item__qty-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                        <button class="cart-item__delete" onclick="eliminarDelCarrito(${item.id})">🗑️</button>
                    </div>
                </div>
            `
        })
    }

    calcularTotal()
    actualizarContador()
}

// Función para calcular el total del carrito
const calcularTotal = () => {
    const total = carrito.reduce((acumulador, item) => {
        return acumulador + (item.precio * item.cantidad)
    }, 0)

    document.querySelector('#cart-total').textContent = `$${total.toLocaleString('es-CO')}`
}

// Función para actualizar el contador del botón del carrito
const actualizarContador = () => {
    const totalItems = carrito.reduce((acumulador, item) => {
        return acumulador + item.cantidad
    }, 0)

    document.querySelector('#cart-count').textContent = totalItems
}

// Función para guardar el carrito en el localStorage
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Función para aumentar o disminuir la cantidad de un producto en el carrito
const cambiarCantidad = (id, cambio) => {
    const producto = carrito.find(item => item.id === id)

    producto.cantidad += cambio

    // Si la cantidad llega a 0, eliminar el producto del carrito
    if (producto.cantidad === 0) {
        eliminarDelCarrito(id)
        return
    }

    actualizarCarrito()
    guardarCarrito()
}

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (id) => {
    carrito = carrito.filter(item => item.id !== id)
    actualizarCarrito()
    guardarCarrito()
}

// Referencias a los elementos del carrito
const cartToggle = document.querySelector('#cart-toggle')
const cartPanel = document.querySelector('#cart-panel')
const cartClose = document.querySelector('#cart-close')
const overlay = document.querySelector('#overlay')

// Función para abrir el carrito
const abrirCarrito = () => {
    cartPanel.classList.add('open')
    overlay.classList.add('active')
    actualizarCarrito()
}

// Función para cerrar el carrito
const cerrarCarrito = () => {
    cartPanel.classList.remove('open')
    overlay.classList.remove('active')
}

// Event listeners para abrir y cerrar el carrito
cartToggle.addEventListener('click', abrirCarrito)
cartClose.addEventListener('click', cerrarCarrito)
overlay.addEventListener('click', cerrarCarrito)

// Llama las funciones al cargar la página
renderizarProductos()
actualizarCarrito()