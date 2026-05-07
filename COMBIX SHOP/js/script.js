// Array de productos gamer
const productos = [
    {
        id: 1,
        nombre: "Aud铆fonos RGB",
        precio: 180000,
        imagen: "assets/img/audifonos.jpg"
    },
    {
        id: 2,
        nombre: "Teclado Mec谩nico",
        precio: 250000,
        imagen: "assets/img/teclado.jpg"
    },
    {
        id: 3,
        nombre: "Mouse Gamer",
        precio: 95000,
        imagen: "assets/img/mouse.jpg"
    },
    {
        id: 4,
        nombre: "Monitor 240Hz",
        precio: 1200000,
        imagen: "assets/img/monitor.jpg"
    },
    {
        id: 5,
        nombre: "Laptop Gamer",
        precio: 4200000,
        imagen: "assets/img/laptop.jpg"
    },
    {
        id: 6,
        nombre: "Silla Gamer",
        precio: 650000,
        imagen: "assets/img/silla.jpg"
    }
];

// Obtener carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");
const total = document.getElementById("total");
const buscador = document.getElementById("buscador");

// Funci贸n para renderizar productos
const renderizarProductos = (productosAMostrar = productos) => {

    // Limpiar contenedor
    contenedorProductos.innerHTML = "";

    // Recorrer productos
    productosAMostrar.forEach(producto => {

        contenedorProductos.innerHTML += `
        
        <div class="card">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <div class="card-body">

                <h3>${producto.nombre}</h3>

                <p>$ ${producto.precio}</p>

                <button onclick="agregarAlCarrito(${producto.id})">
                    Agregar al carrito
                </button>

            </div>

        </div>
        
        `;
    });

    // Mensaje si no encuentra productos
    if (productosAMostrar.length === 0) {

        contenedorProductos.innerHTML = `
        
        <p class="mensaje-error">
            No se encontraron productos 馃槬
        </p>
        
        `;
    }
};