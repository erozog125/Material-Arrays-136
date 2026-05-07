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
// Funci贸n para agregar productos al carrito
const agregarAlCarrito = (id) => {

    // Buscar si el producto ya existe
    const productoExiste = carrito.find(producto => producto.id === id);

    if (productoExiste) {

        // Aumentar cantidad
        productoExiste.cantidad++;

    } else {

        // Buscar producto original
        const producto = productos.find(producto => producto.id === id);

        // Agregar producto
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarLocalStorage();
    renderizarCarrito();
};

// Funci贸n para renderizar carrito
const renderizarCarrito = () => {

    // Limpiar carrito
    contenedorCarrito.innerHTML = "";

    // Recorrer carrito
    carrito.forEach(producto => {

        contenedorCarrito.innerHTML += `
        
        <div class="item-carrito">

            <h4>${producto.nombre}</h4>

            <p>Precio: $${producto.precio}</p>

            <p>Cantidad: ${producto.cantidad}</p>

            <button 
                class="eliminar"
                onclick="eliminarProducto(${producto.id})"
            >
                Eliminar
            </button>

        </div>
        
        `;
    });

    calcularTotal();
};
