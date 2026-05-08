

// ── 1. FUENTE DE DATOS ──────────────────────────────────────
// Arreglo base con los 6 productos de la tienda.
// Cada objeto tiene: id, nombre, precio e imagen (ruta local).
const productos = [
  { id: 1, nombre: "Raqueta Pro",        precio: 250000, imagen: "assets/raqueta.webp" },
  { id: 2, nombre: "Pelotas x3",         precio:  30000, imagen: "assets/pelotas.jpg"  },
  { id: 3, nombre: "Zapatos Tennis",     precio: 180000, imagen: "assets/zapatos.jpg"  },
  { id: 4, nombre: "Gorra Deportiva",    precio:  40000, imagen: "assets/gorra.jpg"    },
  { id: 5, nombre: "Camiseta Deportiva", precio:  90000, imagen: "assets/camiseta.jpg" },
  { id: 6, nombre: "Bolso Tennis",       precio: 120000, imagen: "assets/bolso.jpg"    }
];

// ── 2. ESTADO DEL CARRITO ───────────────────────────────────
// Se recupera el carrito guardado en localStorage.
// Si no existe (primera visita), se inicia como arreglo vacío.
let carrito = JSON.parse(localStorage.getItem("carritoTenisHub")) || [];

// ── 3. PERSISTENCIA: guardar carrito en localStorage ────────
// Serializa el carrito con JSON.stringify() y lo guarda
// bajo la clave "carritoTenisHub" en el almacenamiento local.
const guardarCarrito = () => {
    localStorage.setItem("carritoTenisHub", JSON.stringify(carrito));
};

// ── 4. RENDERIZADO DEL CATÁLOGO ─────────────────────────────
// Recorre el arreglo productos y genera dinámicamente
// una card HTML por cada producto, insertándola en el DOM.
const renderizarProductos = () => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const precioFormateado = producto.precio.toLocaleString("es-CO");
        const card = `
            <article class="card">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                <div class="card-body">
                    <h3>${producto.nombre}</h3>
                    <p class="card-precio">$${precioFormateado}</p>
                    <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                        + Agregar al carrito
                    </button>
                </div>
            </article>
        `;
        contenedor.insertAdjacentHTML("beforeend", card);
    });
};

// ── 5. AGREGAR PRODUCTO AL CARRITO ──────────────────────────
// Si el producto ya existe en el carrito, incrementa su cantidad.
// Si no existe, lo agrega con cantidad = 1.
const agregarAlCarrito = (idProducto) => {
    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        // Producto ya en carrito: solo se aumenta la cantidad
        itemExistente.cantidad++;
    } else {
        // Producto nuevo: se busca en el arreglo base y se agrega
        const producto = productos.find(p => p.id === idProducto);
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    renderizarCarrito();
};

// ── 6. ELIMINAR PRODUCTO DEL CARRITO ────────────────────────
// Filtra el arreglo del carrito quitando el item con ese id.
const eliminarDelCarrito = (idProducto) => {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    renderizarCarrito();
};

// ── 7. VACIAR TODO EL CARRITO ───────────────────────────────
// Deja el carrito vacío y lo persiste en localStorage.
const vaciarCarrito = () => {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
};

// ── 8. CALCULAR TOTAL ───────────────────────────────────────
// Suma el precio * cantidad de cada item en el carrito.
const calcularTotal = () => {
    return carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
};

// ── 9. ACTUALIZAR CONTADOR DEL HEADER ───────────────────────
// Muestra la cantidad total de unidades en el ícono del carrito.
const actualizarContador = () => {
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById("contador").textContent = total;
};

// ── 10. RENDERIZAR CARRITO EN EL DOM ────────────────────────
// Redibuja la lista del carrito y actualiza el total en tiempo real.
const renderizarCarrito = () => {
    const lista = document.getElementById("lista-carrito");
    const spanTotal = document.getElementById("total");

    if (carrito.length === 0) {
        lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío 🛒</p>`;
        spanTotal.textContent = "0";
        actualizarContador();
        return;
    }

    lista.innerHTML = "";

    carrito.forEach(item => {
        const subtotal = (item.precio * item.cantidad).toLocaleString("es-CO");
        const itemHTML = `
            <div class="item-carrito">
                <div class="item-info">
                    <p class="item-nombre">${item.nombre} x${item.cantidad}</p>
                    <p class="item-subtotal">$${subtotal}</p>
                </div>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})" title="Eliminar">✕</button>
            </div>
        `;
        lista.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Actualiza el total formateado en pesos colombianos
    spanTotal.textContent = calcularTotal().toLocaleString("es-CO");
    actualizarContador();
};

// ── 11. INICIALIZACIÓN ──────────────────────────────────────
// Al cargar la página se renderizan los productos y se restaura
// el carrito guardado en localStorage (persistencia).
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    renderizarCarrito();

    // Botón para vaciar el carrito completo
    document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
});