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

