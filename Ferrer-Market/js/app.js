// ============================================================
// app.js — Ferrer Market
// Renderizado dinámico de productos en el DOM
// Gestión de eventos del carrito (abrir/cerrar)
// ============================================================

// ── Selección de elementos del DOM ──────────────────────────
const productsGrid  = document.getElementById('productsGrid');
const cartToggle    = document.getElementById('cartToggle');
const cartClose     = document.getElementById('cartClose');
const cartSidebar   = document.getElementById('cartSidebar');
const cartOverlay   = document.getElementById('cartOverlay');
const cartCount     = document.getElementById('cartCount');
const cartItems     = document.getElementById('cartItems');
const cartTotal     = document.getElementById('cartTotal');
const checkoutBtn   = document.getElementById('checkoutBtn');
const clearCartBtn  = document.getElementById('clearCartBtn');

// ── Función para formatear precios en COP ───────────────────
// Convierte un número a formato $ 49.000 COP
const formatearPrecio = (precio) => {
  return `$${precio.toLocaleString('es-CO')} COP`;
};

// ── Función principal: renderizar productos en el grid ───────
// Recorre el arreglo `productos` de products.js y genera
// una card HTML por cada producto, insertándola en el DOM
const renderizarProductos = () => {
  // Limpia el grid antes de renderizar
  productsGrid.innerHTML = '';

  // Recorre cada producto del arreglo
  productos.forEach(producto => {

    // Determina el badge (Popular / Premium / ninguno)
    let badge = '';
    if (producto.popular) {
      badge = `<span class="product-badge badge-popular">Popular</span>`;
    } else if (producto.premium) {
      badge = `<span class="product-badge badge-premium">Premium</span>`;
    }

    // Genera los features como lista
    const featuresHTML = producto.features
      .map(f => `<li>${f}</li>`)
      .join('');

    // Determina si la card tiene clase premium (borde dorado)
    const cardClass = producto.premium ? 'product-card premium' : 'product-card';

    // Template string con el HTML completo de la card
    const cardHTML = `
      <article class="${cardClass}" role="listitem">
        ${badge}

        <div class="product-img-wrap">
          <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="product-img-placeholder" style="display:none;">📈</div>
        </div>

        <div class="product-info">
          <p class="product-category">${producto.categoria}</p>
          <h3 class="product-name">${producto.nombre}</h3>
          <p class="product-description">${producto.descripcion}</p>
          <ul class="product-features">
            ${featuresHTML}
          </ul>
        </div>

        <div class="product-footer">
          <div class="product-price">
            <span class="amount">${formatearPrecio(producto.precio)}</span>
          </div>
          <button
            class="btn-add-cart"
            data-id="${producto.id}"
            onclick="agregarAlCarrito(${producto.id})"
          >
            Agregar
          </button>
        </div>
      </article>
    `;

    // Inserta la card en el grid
    productsGrid.innerHTML += cardHTML;
  });
};

// ── Función para abrir el carrito ────────────────────────────
const abrirCarrito = () => {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
  cartSidebar.setAttribute('aria-hidden', 'false');
};

// ── Función para cerrar el carrito ───────────────────────────
const cerrarCarrito = () => {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
  cartSidebar.setAttribute('aria-hidden', 'true');
};

// ── Eventos del carrito ──────────────────────────────────────
cartToggle.addEventListener('click', abrirCarrito);
cartClose.addEventListener('click', cerrarCarrito);
cartOverlay.addEventListener('click', cerrarCarrito);

// Botón checkout
checkoutBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  alert('¡Gracias por tu compra! Pronto te contactaremos.');
  limpiarCarrito();
  cerrarCarrito();
});

// Botón vaciar carrito
clearCartBtn.addEventListener('click', () => {
  if (carrito.length === 0) return;
  limpiarCarrito();
});

// ── Inicialización ───────────────────────────────────────────
// Se ejecuta al cargar la página
renderizarProductos();  // Dibuja los productos
cargarCarrito();        // Carga el carrito desde localStorage