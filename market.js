// Arreglo de productos de la tienda
const productos = [
    { id: 1, nombre: "Hamburguesa Clásica con Queso", precio: 12000, imagen: "assets/Hamburguesa_clasica_queso.png" },
    { id: 2, nombre: "Hamburguesa Doble Carne", precio: 18000, imagen: "assets/Hamburguesa_doble_carne.png" },
    { id: 3, nombre: "Hotdog Clásico", precio: 8000, imagen: "assets/Hotdog_clasico.png" },
    { id: 4, nombre: "Papas Fritas", precio: 6000, imagen: "assets/Papas_fritas.png" },
    { id: 5, nombre: "Pizza Pepperoni", precio: 22000, imagen: "assets/Pizza_pepperoni.png" },
    { id: 6, nombre: "Pollo Frito Crujiente", precio: 15000, imagen: "assets/Pollo_frito_crujiente.png" },
]

// Arreglo del carrito (inicia vacío)
let carrito = []

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

// Llamar la función al cargar la página
renderizarProductos()