/* ============================================================
   Las imágenes están embebidas directamente para que el
   proyecto funcione sin necesidad de un servidor web.
============================================================ */
const imagenes = {
  "realmadrid.webp": "assets/realmadrid.webp",
  "barca.webp":   "assets/barca.webp",
  "arsenal.webp":     "assets/arsenal.webp",
  "manchester.webp":    "assets/manchester.webp",
  "juve.webp":    "assets/juve.webp",
  "milan.webp":    "assets/milan.webp",
  "bayer.webp":      "assets/bayer.webp",
  "colombia.webp":    "assets/colombia.webp",
  "argentina.webp":   "assets/argentina.webp"
};

/* ============================================================
   ARREGLO DE PRODUCTOS — fuente de datos de la tienda
   Cada objeto contiene: id, nombre, precio, imgKey, liga, badge
============================================================ */
const productos = [
  { id:1, nombre:"realmadrid.webp — Local 24/25",       precio:289000, imgKey:"realmadrid.webp", liga:"LaLiga",     badge:"new"  },
  { id:2, nombre:"barca.webp — Visitante 24/25",  precio:285000, imgKey:"barca.webp",   liga:"LaLiga",     badge:"hot"  },
  { id:3, nombre:"arsenal.webp — Local 24/25",        precio:279000, imgKey:"arsenal.webp",     liga:"Premier",    badge:"new"  },
  { id:4, nombre:"manchester.webp — Local 24/25",   precio:292000, imgKey:"manchester.webp",    liga:"Premier",    badge:null   },
  { id:5, nombre:"juve.webp — Local 24/25",          precio:265000, imgKey:"juve.webp",    liga:"Serie A",    badge:"sale" },
  { id:6, nombre:"milan.webp — Visitante 24/25",      precio:268000, imgKey:"milan.webp",    liga:"Serie A",    badge:null   },
  { id:7, nombre:"bayer.webp — Local 24/25",    precio:288000, imgKey:"bayer.webp",      liga:"Bundesliga", badge:"hot"  },
  { id:8, nombre:"Colombia.webp — Copa América 2024",    precio:320000, imgKey:"colombia.webp",    liga:"Selección",  badge:"new"  },
  { id:9, nombre:"argentina.webp — Campeona Mundial",    precio:335000, imgKey:"argentina.webp",   liga:"Selección",  badge:"hot"  }
];


/* ============================================================
   ESTADO — carrito recuperado desde localStorage al iniciar
============================================================ */
let carrito = cargarCarrito();
let filtroActivo = "all";

/* ============================================================
   FUNCIÓN: cargarCarrito
   Recupera el carrito persistido en localStorage.
   Usa JSON.parse() para convertir el string guardado a objeto JS.
============================================================ */
function cargarCarrito() {
  const datos = localStorage.getItem("soccerjersey_carrito");
  return datos ? JSON.parse(datos) : [];
}

/* ============================================================
   FUNCIÓN: guardarCarrito
   Persiste el estado del carrito en localStorage.
   Usa JSON.stringify() para convertir el objeto a string.
============================================================ */
function guardarCarrito() {
  localStorage.setItem("soccerjersey_carrito", JSON.stringify(carrito));
}

/* ============================================================
   FUNCIÓN: formatearPrecio
   Formatea un número como precio en pesos colombianos.
============================================================ */
const formatearPrecio = (valor) => `$${valor.toLocaleString("es-CO")}`;


/* ============================================================
   FUNCIÓN: crearBadge
   Retorna el HTML del badge (Nuevo / Popular / Oferta).
============================================================ */
const crearBadge = (tipo) => {
  if (!tipo) return "";
  const etiquetas = { new: "Nuevo", hot: "Popular", sale: "Oferta" };
  return `<span class="badge badge-${tipo}">${etiquetas[tipo]}</span>`;
};

/* ============================================================
   FUNCIÓN: renderizarCatalogo
   Recorre el arreglo de productos, aplica el filtro activo
   y genera dinámicamente las cards de producto en el DOM.
============================================================ */
function renderizarCatalogo(filtro = "all") {
  const catalogo = document.getElementById("catalog");
  const contador = document.getElementById("product-count");

  // Filtrar productos por liga seleccionada
  const lista = filtro === "all"
    ? productos
    : productos.filter(p => p.liga === filtro);

  contador.textContent = lista.length;

  // Generar HTML de cada card usando template strings
  catalogo.innerHTML = lista.map((p, i) => {
    const enCarrito = carrito.find(item => item.id === p.id);
    return `
      <article class="product-card" style="animation-delay:${i * 0.06}s">
        <div class="card-img-wrap">
          ${crearBadge(p.badge)}
          <img src="${imagenes[p.imgKey]}" alt="${p.nombre}" />
        </div>
        <div class="card-body">
          <span class="card-liga">${p.liga}</span>
          <h3 class="card-name">${p.nombre}</h3>
          <p class="card-price">${formatearPrecio(p.precio)}</p>
          <button class="btn-add ${enCarrito ? "added" : ""}" onclick="agregarAlCarrito(${p.id})" id="btn-${p.id}">
            ${enCarrito
              ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> En carrito`
              : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Agregar`}
          </button>
        </div>
      </article>`;
  }).join("");
}

/* ============================================================
   FUNCIÓN: agregarAlCarrito
   Agrega un producto al carrito. Si ya existe, incrementa
   su cantidad en lugar de duplicar el elemento.
============================================================ */
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const itemExistente = carrito.find(item => item.id === id);

  if (itemExistente) {
    // Producto ya en carrito — solo aumentar cantidad
    itemExistente.cantidad += 1;
    mostrarToast(`"${producto.nombre.split("—")[0].trim()}" — cantidad aumentada`);
  } else {
    // Nuevo producto — agregar con cantidad inicial 1
    carrito.push({ ...producto, cantidad: 1 });
    mostrarToast(`"${producto.nombre.split("—")[0].trim()}" agregado al carrito`);
  }

  guardarCarrito();
  renderizarCarrito();
  actualizarContadorHeader();
  renderizarCatalogo(filtroActivo);
}

/* ============================================================
   FUNCIÓN: cambiarCantidad
   Aumenta o disminuye la cantidad de un item en el carrito.
   Si la cantidad llega a 0, elimina el producto del carrito.
============================================================ */
function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) { eliminarDelCarrito(id); return; }
  guardarCarrito();
  renderizarCarrito();
  actualizarContadorHeader();
  renderizarCatalogo(filtroActivo);
}

/* ============================================================
   FUNCIÓN: eliminarDelCarrito
   Quita completamente un producto del carrito usando filter().
============================================================ */
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
  actualizarContadorHeader();
  renderizarCatalogo(filtroActivo);
}

/* ============================================================
   FUNCIÓN: calcularTotal
   Suma el precio × cantidad de cada producto del carrito.
   Retorna el costo total de la compra.
============================================================ */
function calcularTotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

/* ============================================================
   FUNCIÓN: calcularTotalItems
   Suma el total de unidades (no productos únicos) en el carrito.
============================================================ */
function calcularTotalItems() {
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

/* ============================================================
   Las imágenes están embebidas directamente para que el
   proyecto funcione sin necesidad de un servidor web.
============================================================ */
const imagenes = {
  "realmadrid.webp": "assets/realmadrid.webp",
  "barca.webp":   "assets/barca.webp",
  "arsenal.webp":     "assets/arsenal.webp",
  "manchester.webp":    "assets/manchester.webp",
  "juve.webp":    "assets/juve.webp",
  "milan.webp":    "assets/milan.webp",
  "bayer.webp":      "assets/bayer.webp",
  "colombia.webp":    "assets/colombia.webp",
  "argentina.webp":   "assets/argentina.webp"
};

/* ============================================================
   ARREGLO DE PRODUCTOS — fuente de datos de la tienda
   Cada objeto contiene: id, nombre, precio, imgKey, liga, badge
============================================================ */
const productos = [
  { id:1, nombre:"realmadrid.webp — Local 24/25",       precio:289000, imgKey:"realmadrid.webp", liga:"LaLiga",     badge:"new"  },
  { id:2, nombre:"barca.webp — Visitante 24/25",  precio:285000, imgKey:"barca.webp",   liga:"LaLiga",     badge:"hot"  },
  { id:3, nombre:"arsenal.webp — Local 24/25",        precio:279000, imgKey:"arsenal.webp",     liga:"Premier",    badge:"new"  },
  { id:4, nombre:"manchester.webp — Local 24/25",   precio:292000, imgKey:"manchester.webp",    liga:"Premier",    badge:null   },
  { id:5, nombre:"juve.webp — Local 24/25",          precio:265000, imgKey:"juve.webp",    liga:"Serie A",    badge:"sale" },
  { id:6, nombre:"milan.webp — Visitante 24/25",      precio:268000, imgKey:"milan.webp",    liga:"Serie A",    badge:null   },
  { id:7, nombre:"bayer.webp — Local 24/25",    precio:288000, imgKey:"bayer.webp",      liga:"Bundesliga", badge:"hot"  },
  { id:8, nombre:"Colombia.webp — Copa América 2024",    precio:320000, imgKey:"colombia.webp",    liga:"Selección",  badge:"new"  },
  { id:9, nombre:"argentina.webp — Campeona Mundial",    precio:335000, imgKey:"argentina.webp",   liga:"Selección",  badge:"hot"  }
];

/* ============================================================
   ESTADO — carrito recuperado desde localStorage al iniciar
============================================================ */
let carrito = cargarCarrito();
let filtroActivo = "all";

/* ============================================================
   FUNCIÓN: cargarCarrito
   Recupera el carrito persistido en localStorage.
   Usa JSON.parse() para convertir el string guardado a objeto JS.
============================================================ */
function cargarCarrito() {
  const datos = localStorage.getItem("soccerjersey_carrito");
  return datos ? JSON.parse(datos) : [];
}

/* ============================================================
   FUNCIÓN: guardarCarrito
   Persiste el estado del carrito en localStorage.
   Usa JSON.stringify() para convertir el objeto a string.
============================================================ */
function guardarCarrito() {
  localStorage.setItem("soccerjersey_carrito", JSON.stringify(carrito));
}

/* ============================================================
   FUNCIÓN: formatearPrecio
   Formatea un número como precio en pesos colombianos.
============================================================ */
const formatearPrecio = (valor) => `$${valor.toLocaleString("es-CO")}`;

/* ============================================================
   FUNCIÓN: crearBadge
   Retorna el HTML del badge (Nuevo / Popular / Oferta).
============================================================ */
const crearBadge = (tipo) => {
  if (!tipo) return "";
  const etiquetas = { new: "Nuevo", hot: "Popular", sale: "Oferta" };
  return `<span class="badge badge-${tipo}">${etiquetas[tipo]}</span>`;
};

/* ============================================================
   FUNCIÓN: renderizarCatalogo
   Recorre el arreglo de productos, aplica el filtro activo
   y genera dinámicamente las cards de producto en el DOM.
============================================================ */
function renderizarCatalogo(filtro = "all") {
  const catalogo = document.getElementById("catalog");
  const contador = document.getElementById("product-count");

  // Filtrar productos por liga seleccionada
  const lista = filtro === "all"
    ? productos
    : productos.filter(p => p.liga === filtro);

  contador.textContent = lista.length;

  // Generar HTML de cada card usando template strings
  catalogo.innerHTML = lista.map((p, i) => {
    const enCarrito = carrito.find(item => item.id === p.id);
    return `
      <article class="product-card" style="animation-delay:${i * 0.06}s">
        <div class="card-img-wrap">
          ${crearBadge(p.badge)}
          <img src="${imagenes[p.imgKey]}" alt="${p.nombre}" />
        </div>
        <div class="card-body">
          <span class="card-liga">${p.liga}</span>
          <h3 class="card-name">${p.nombre}</h3>
          <p class="card-price">${formatearPrecio(p.precio)}</p>
          <button class="btn-add ${enCarrito ? "added" : ""}" onclick="agregarAlCarrito(${p.id})" id="btn-${p.id}">
            ${enCarrito
              ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> En carrito`
              : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Agregar`}
          </button>
        </div>
      </article>`;
  }).join("");
}

/* ============================================================
   FUNCIÓN: agregarAlCarrito
   Agrega un producto al carrito. Si ya existe, incrementa
   su cantidad en lugar de duplicar el elemento.
============================================================ */
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const itemExistente = carrito.find(item => item.id === id);

  if (itemExistente) {
    // Producto ya en carrito — solo aumentar cantidad
    itemExistente.cantidad += 1;
    mostrarToast(`"${producto.nombre.split("—")[0].trim()}" — cantidad aumentada`);
  } else {
    // Nuevo producto — agregar con cantidad inicial 1
    carrito.push({ ...producto, cantidad: 1 });
    mostrarToast(`"${producto.nombre.split("—")[0].trim()}" agregado al carrito`);
  }

  guardarCarrito();
  renderizarCarrito();
  actualizarContadorHeader();
  renderizarCatalogo(filtroActivo);
}

/* ============================================================
   FUNCIÓN: cambiarCantidad
   Aumenta o disminuye la cantidad de un item en el carrito.
   Si la cantidad llega a 0, elimina el producto del carrito.
============================================================ */
function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) { eliminarDelCarrito(id); return; }
  guardarCarrito();
  renderizarCarrito();
  actualizarContadorHeader();
  renderizarCatalogo(filtroActivo);
}

/* ============================================================
   FUNCIÓN: eliminarDelCarrito
   Quita completamente un producto del carrito usando filter().
============================================================ */
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
  actualizarContadorHeader();
  renderizarCatalogo(filtroActivo);
}

/* ============================================================
   FUNCIÓN: calcularTotal
   Suma el precio × cantidad de cada producto del carrito.
   Retorna el costo total de la compra.
============================================================ */
function calcularTotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

/* ============================================================
   FUNCIÓN: calcularTotalItems
   Suma el total de unidades (no productos únicos) en el carrito.
============================================================ */
function calcularTotalItems() {
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

/* ============================================================
   FUNCIÓN: renderizarCarrito
   Genera los items del panel lateral del carrito y actualiza
   el total en tiempo real al agregar o eliminar productos.
============================================================ */
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-items");
  const totalEl    = document.getElementById("cart-total");
  const itemsEl    = document.getElementById("summary-items");

  if (carrito.length === 0) {
    // Mostrar estado vacío
    contenedor.innerHTML = `
      <div class="cart-empty">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Tu carrito está vacío.<br/>¡Agrega algunas camisetas!</p>
      </div>`;
  } else {
    // Renderizar cada item con sus controles de cantidad
    contenedor.innerHTML = carrito.map(item => `
      <div class="cart-item">
        <img src="${imagenes[item.imgKey]}" alt="${item.nombre}" />
        <div class="item-info">
          <span class="item-name">${item.nombre.split("—")[0].trim()}</span>
          <span class="item-unit">${formatearPrecio(item.precio)} c/u</span>
          <div class="qty-controls">
            <button class="qty-btn" onclick="cambiarCantidad(${item.id}, -1)">−</button>
            <span class="qty-val">${item.cantidad}</span>
            <button class="qty-btn" onclick="cambiarCantidad(${item.id}, +1)">+</button>
          </div>
          <span class="item-subtotal">${formatearPrecio(item.precio * item.cantidad)}</span>
        </div>
        <button class="btn-remove" onclick="eliminarDelCarrito(${item.id})" title="Eliminar">✕</button>
      </div>`).join("");
  }

  // Actualizar total y contador en tiempo real
  totalEl.textContent = formatearPrecio(calcularTotal());
  const ti = calcularTotalItems();
  itemsEl.textContent = `${ti} unidad${ti !== 1 ? "es" : ""}`;
}

/* ============================================================
   FUNCIÓN: actualizarContadorHeader
   Actualiza el badge numérico del botón carrito en el header.
============================================================ */
function actualizarContadorHeader() {
  document.getElementById("cart-count").textContent = calcularTotalItems();
}

/* ============================================================
   FUNCIONES: abrirCarrito / cerrarCarrito
   Controlan la visibilidad del panel lateral del carrito.
============================================================ */
function abrirCarrito() {
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-panel").classList.add("open");
  document.body.style.overflow = "hidden";
}

