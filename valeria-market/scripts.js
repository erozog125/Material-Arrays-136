const path = "Asets/images/";

const productos = [
    { id: 1, nombre: "Laptop ", precio: 80.0000, imagen: "Asets/images/laptop.png" },
    { id: 2, nombre: "Mouse ", precio: 20.000, imagen: "Asets/images/mouse.png" },
    { id: 3, nombre: "Teclado ", precio: 50.000, imagen: "Asets/images/teclado.png" },
    { id: 4, nombre: "Auriculares ", precio: 60.000, imagen: "Asets/images/auriculares.png"},
    { id: 5, nombre: "Reloj ", precio: 30.000, imagen: "Asets/images/reloj.png"}   
];

let carrito = [];

// Elementos del DOM
const container = document.getElementById('product-list');
const cartList = document.getElementById('cart-items');
const totalSpan = document.getElementById('total-price');
const countSpan = document.getElementById('cart-count');

// 1. Cargar productos al iniciar
function cargarProductos() {
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/250x200?text=Error+Imagen'">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Agregar al Carrito</button>
        `;
        container.appendChild(card);
    });
}

// 2. Lógica del Carrito
function agregarAlCarrito(id) {
    const item = productos.find(p => p.id === id);
    carrito.push(item);
    actualizarInterfaz();
}

function vaciarCarrito() {
    carrito = [];
    actualizarInterfaz();
}

function actualizarInterfaz() {
    // Limpiar lista visual
    cartList.innerHTML = '';
    
    let total = 0;
    
    // Dibujar cada item en el carrito
    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nombre}</span>
            <span>$${item.precio}</span>
        `;
        cartList.appendChild(li);
    });

    // Actualizar números
    totalSpan.innerText = total.toLocaleString();
    countSpan.innerText = carrito.length;
}

// Botón finalizar
document.getElementById('checkout-btn').addEventListener('click', () => {
    if(carrito.length > 0) {
        alert("¡Gracias por tu compra! Total: $" + totalSpan.innerText);
        vaciarCarrito();
    } else {
        alert("El carrito está vacío");
    }
});

// Inicializar
cargarProductos();