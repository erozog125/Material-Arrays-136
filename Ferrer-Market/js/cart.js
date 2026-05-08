// ============================================================
// cart.js — Ferrer Market
// Lógica completa del carrito de compras:
// - Agregar productos
// - Aumentar / disminuir cantidad
// - Eliminar productos
// - Calcular total en tiempo real
// - Persistencia con localStorage
// ============================================================

// ── Estado del carrito ───────────────────────────────────────
// Arreglo que almacena los productos agregados por el usuario
// Cada item tiene: id, nombre, precio, cantidad
let carrito = [];

// ── Clave para localStorage ──────────────────────────────────
const STORAGE_KEY = 'ferrer_market_carrito';

// ── Función para guardar el carrito en localStorage ──────────
// Convierte el arreglo a JSON string y lo almacena
const guardarCarrito = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
};

// ── Función para cargar el carrito desde localStorage ────────
// Al recargar la página, recupera el estado anterior del carrito
const cargarCarrito = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  // Si existe data guardada, la parsea y la asigna al carrito
  if (data) {
    carrito = JSON.parse(data);
  }
  // Renderiza el carrito con los datos recuperados
  renderizarCarrito();
};

// ── Función para agregar un producto al carrito ──────────────
// Si el producto ya existe, incrementa su cantidad (no duplica)
// Si es nuevo, lo agrega con cantidad 1
const agregarAlCarrito = (id) => {
  // Busca el producto en el arreglo de productos
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  // Verifica si el producto ya está en el carrito
  const itemExistente = carrito.find(item => item.id === id);

  if (itemExistente) {
    // Si ya existe, solo aumenta la cantidad
    itemExistente.cantidad++;
  } else {
    // Si no existe, lo agrega con cantidad 1
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  // Guarda y actualiza la vista
  guardarCarrito();
  renderizarCarrito();
  abrirCarrito();
};

// ── Función para aumentar la cantidad de un item ─────────────
const aumentarCantidad = (id) => {
  const item = carrito.find(item => item.id === id);
  if (item) {
    item.cantidad++;
    guardarCarrito();
    renderizarCarrito();
  }
};

// ── Función para disminuir la cantidad de un item ────────────
// Si la cantidad llega a 0, elimina el producto del carrito
const disminuirCantidad = (id) => {
  const item = carrito.find(item => item.id === id);
  if (item) {
    item.cantidad--;
    // Si cantidad llega a 0, elimina el item del arreglo
    if (item.cantidad === 0) {
      eliminarDelCarrito(id);
      return;
    }
    guardarCarrito();
    renderizarCarrito();
  }
};

// ── Función para eliminar un producto del carrito ────────────
// Filtra el arreglo excluyendo el item con el id dado
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
};

// ── Función para limpiar todo el carrito ─────────────────────
const limpiarCarrito = () => {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
};

// ── Función para calcular el total del carrito ───────────────
// Suma el precio * cantidad de todos los items
const calcularTotal = () => {
  return carrito.reduce((total, item) => {
    return total + (item.precio * item.cantidad);
  }, 0);
};

// ── Función para actualizar el contador del header ───────────
// Muestra la cantidad total de items en el botón del carrito
const actualizarContador = () => {
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.textContent = totalItems;
};

// ── Función para renderizar el carrito en el sidebar ─────────
// Genera el HTML de cada item y actualiza el total en tiempo real
const renderizarCarrito = () => {
  // Actualiza el contador del header
  actualizarContador();

  // Si el carrito está vacío, muestra mensaje
  if (carrito.length === 0) {
    cartItems.innerHTML = `
      <li class="cart-empty">
        <span class="cart-empty-icon">🛒</span>
        <span>Tu carrito está vacío</span>
        <span>Agrega un plan para comenzar</span>
      </li>
    `;
    cartTotal.textContent = '$0 COP';
    return;
  }

  // Genera el HTML de cada item del carrito
  cartItems.innerHTML = carrito.map(item => `
    <li class="cart-item">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.nombre}</p>
        <p class="cart-item-price">${formatearPrecio(item.precio)}</p>
      </div>
      <div class="cart-item-controls">
        <button
          class="qty-btn"
          onclick="disminuirCantidad(${item.id})"
          aria-label="Disminuir cantidad"
        >−</button>
        <span class="cart-item-qty">${item.cantidad}</span>
        <button
          class="qty-btn"
          onclick="aumentarCantidad(${item.id})"
          aria-label="Aumentar cantidad"
        >+</button>
      </div>
      <button
        class="btn-remove"
        onclick="eliminarDelCarrito(${item.id})"
        aria-label="Eliminar producto"
      >✕</button>
    </li>
  `).join('');

  // Actualiza el total en tiempo real
  cartTotal.textContent = formatearPrecio(calcularTotal());
};