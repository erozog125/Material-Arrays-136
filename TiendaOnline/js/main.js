/* Arreglo de objetos*/
const productos = [
  {
    id: 1,
    nombre: "Camara X12 Pro",
    categoria: "Cámara",
    descripcion: "Pantalla AMOLED 6.7\", 256 GB, cámara triple 108 MP.",
    precio: 2599000,
    precioAnterior: 3299000,
    imagen: "assets/imagenes/01.jpg",
    badge: "-20%"
  },
  {
    id: 2,
    nombre: "UltraSlim 14\"",
    categoria: "Teclado",
    descripcion: "Switches Mecánicos de Respuesta Rápida.",
    precio: 4899000,
    precioAnterior: null,
    imagen: "assets/imagenes/02.jpg",
    badge: null
  },
  {
    id: 3,
    nombre: "NoiseOff Pro",
    categoria: "Monitor",
    descripcion: "Resolución Full HD. Incluye puertos USB, HDMI, VGA.",
    precio: 649000,
    precioAnterior: 799000,
    imagen: "assets/imagenes/03.jpg",
    badge: "Nuevo"
  },
  {
    id: 4,
    nombre: "FitPro 5",
    categoria: "Monitor",
    descripcion: "Equipo robusto, compacto y táctil, optimizado para comercio minorista.",
    precio: 1199000,
    precioAnterior: null,
    imagen: "assets/imagenes/04.jpg",
    badge: null
  },
  {
    id: 5,
    nombre: "KeyFlow TKL",
    categoria: "Tablet",
    descripcion: "4 GB a 6 GB de RAM, pantalla táctil intuitiva, conectividad completa.",
    precio: 489000,
    precioAnterior: null,
    imagen: "assets/imagenes/05.jpg",
    badge: null
  },
  {
    id: 6,
    nombre: "MirrorVision 4K",
    categoria: "Cámara",
    descripcion: "Sensor 32 MP, lente intercambiable, video 4K 60fps.",
    precio: 4420000,
    precioAnterior: 5200000,
    imagen: "assets/imagenes/06.jpg",
    badge: "-15%"
  },
  {
    id: 7,
    nombre: "AirTab 11\"",
    categoria: "Cámara",
    descripcion: "Sensor de alta sensibilidad para condiciones de iluminación variables (día/noche).",
    precio: 2100000,
    precioAnterior: null,
    imagen: "assets/imagenes/07.jpg",
    badge: null
  },
  {
    id: 8,
    nombre: "DriftX Wireless",
    categoria: "Accesorios",
    descripcion: "25.600 DPI, 70 h batería, USB-C, receptor 2.4 GHz.",
    precio: 329000,
    precioAnterior: null,
    imagen: "assets/imagenes/08.jpg",
    badge: null
  },
  {
    id: 9,
    nombre: "Kingston DataTraveler",
    categoria: "Accesorio",
    descripcion: "Transferencias rápidas con tecnología USB 3.2 Gen 1.",
    precio: 399000,
    precioAnterior: null,
    imagen: "assets/imagenes/09.jpg",
    badge: "Nuevo"
  },
  {
    id: 10,
    nombre: "UltraWide 34\"",
    categoria: "Tablet",
    descripcion: "Panel IPS 144 Hz, resolución QHD+, HDR 400.",
    precio: 3199000,
    precioAnterior: 3800000,
    imagen: "assets/imagenes/10.jpg",
    badge: null
  }
];

// Intenta leer el carrito guardado. Si no hay nada, empieza con arreglo vacío.
let carrito = JSON.parse(localStorage.getItem("techstore-carrito")) || [];

/* Se guardan en variables para no buscarlos cada vez */
const grid = document.getElementById("catalogo-grid");    
const cartDrawer = document.getElementById("cart-drawer");      
const cartOverlay = document.getElementById("cart-overlay");      
const cartItemsEl = document.getElementById("cart-items");       
const cartTotalEl = document.getElementById("cart-total");      
const cartBadgeEl = document.getElementById("cart-badge");        
const btnAbrir = document.getElementById("btn-abrir-carrito");
const btnCerrar = document.getElementById("btn-cerrar-carrito");

/*convertir texto a numero */
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-CO");
}

/* Recorre el arreglo `productos`*/
function renderCatalogo() {
 
  grid.innerHTML = "";

  productos.forEach(function(producto) {
    // Construye la etiqueta de descuento/novedad (si tiene)
    const badgeHTML = producto.badge
      ? `<span class="product-card__badge ${producto.badge === 'Nuevo' ? 'product-card__badge--new' : ''}">${producto.badge}</span>`
      : "";

    // Construye el precio anterior tachado (si tiene)
    const precioAnteriorHTML = producto.precioAnterior
      ? `<span class="price--old">${formatearPrecio(producto.precioAnterior)}</span>`
      : "";

    // El botón siempre es "Agregar" — sin importar si ya está en el carrito
    const controlHTML = `<button class="btn-add" data-id="${producto.id}">+ Agregar</button>`;

    // Crea el HTML completo de la tarjeta
    const cardHTML = `
      <article class="product-card" data-product-id="${producto.id}">
        <div class="product-card__image-wrap">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="product-card__image" loading="lazy">
          ${badgeHTML}
        </div>
        <div class="product-card__body">
          <p class="product-card__category">${producto.categoria}</p>
          <h3 class="product-card__name">${producto.nombre}</h3>
          <p class="product-card__desc">${producto.descripcion}</p>
          <div class="product-card__prices">
            ${precioAnteriorHTML}
            <span class="price--current">${formatearPrecio(producto.precio)}</span>
          </div>
          <div class="cart-control" id="ctrl-${producto.id}">
            ${controlHTML}
          </div>
        </div>
      </article>
    `;

    // Inserta la tarjeta al final del grid
    grid.insertAdjacentHTML("beforeend", cardHTML);
  });

  // Después de renderizar, adjunta los eventos a los botones nuevos
  adjuntarEventosTarjetas();
}

/* Adjuntar eventos a las targetas solo escucha el clic en "btn-add" */
function adjuntarEventosTarjetas() {
  grid.addEventListener("click", function(evento) {
    const el = evento.target;

    // Clic en botón "+ Agregar"
    if (el.classList.contains("btn-add")) {
      const id = Number(el.dataset.id);
      agregarAlCarrito(id);
    }
  });
}

/* agrega elemetos al carrito */
function agregarAlCarrito(id) {
  const existe = carrito.find(function(item) { return item.id === id; });

  if (!existe) {
    carrito.push({ id: id, cantidad: 1 });
  } else {
    existe.cantidad++;
  }

  guardarCarrito();   
  renderCarrito();    
  actualizarBadge(); 
}

/* Suma o resta 1 a la cantidad de un producto del carrito */
function cambiarCantidad(id, delta) {
  const item = carrito.find(function(i) { return i.id === id; });
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    // Elimina el producto del arreglo si la cantidad llegó a 0
    carrito = carrito.filter(function(i) { return i.id !== id; });
  }

  guardarCarrito();
  renderCarrito();
  actualizarBadge();
}

/* Quita completamente un producto del carrito sin importar su cantidad actual.*/
function eliminarDelCarrito(id) {
  carrito = carrito.filter(function(item) { return item.id !== id; });

  guardarCarrito();
  renderCarrito();
  actualizarBadge();
}

/* Suma precio × cantidad de cada producto en el carrito.*/
function calcularTotal() {
  return carrito.reduce(function(acumulado, item) {
    const producto = productos.find(function(p) { return p.id === item.id; });
    // Si el producto existe, suma precio × cantidad al acumulado
    return acumulado + (producto ? producto.precio * item.cantidad : 0);
  }, 0); 
}

/* Genera el HTML de cada item dentro del panel lateral y actualiza el precio total.*/
function renderCarrito() {

  if (carrito.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <p>Tu carrito está vacío 🛒</p>
        <p>¡Agrega productos para comenzar!</p>
      </div>
    `;
    cartTotalEl.textContent = "$0";
    return;
  }

  // Construye el HTML de cada producto en el carrito
  cartItemsEl.innerHTML = carrito.map(function(item) {
    const producto = productos.find(function(p) { return p.id === item.id; });
    if (!producto) return ""; 

    return `
      <div class="cart-item" data-id="${producto.id}">
        <!-- Imagen miniatura -->
        <img src="${producto.imagen}" alt="${producto.nombre}" class="cart-item__img">

        <!-- Nombre y precio unitario -->
        <div class="cart-item__info">
          <p class="cart-item__name">${producto.nombre}</p>
          <p class="cart-item__price">${formatearPrecio(producto.precio)}</p>
        </div>

        <!-- Controles de cantidad -->
        <div class="cart-item__controls">
          <button class="stepper__btn stepper__btn--minus" data-id="${producto.id}">−</button>
          <span class="stepper__qty">${item.cantidad}</span>
          <button class="stepper__btn stepper__btn--plus" data-id="${producto.id}">+</button>
        </div>

        <!-- Botón eliminar -->
        <button class="cart-item__delete" data-id="${producto.id}" aria-label="Eliminar">🗑</button>
      </div>
    `;
  }).join(""); 

  // Actualiza el precio total
  cartTotalEl.textContent = formatearPrecio(calcularTotal());
}

/* FUNCIÓN: EVENTOS DEL PANEL DEL CARRITO */
function adjuntarEventosCarrito() {
  cartItemsEl.addEventListener("click", function(evento) {
    const el = evento.target;

    if (el.classList.contains("stepper__btn--plus")) {
      cambiarCantidad(Number(el.dataset.id), +1);
    }

    if (el.classList.contains("stepper__btn--minus")) {
      cambiarCantidad(Number(el.dataset.id), -1);
    }

    if (el.classList.contains("cart-item__delete")) {
      eliminarDelCarrito(Number(el.dataset.id));
    }
  });
}

/* Cuenta el total de unidades en el carrito y muestra u oculta la burbuja sobre el ícono.*/
function actualizarBadge() {
  // Suma todas las cantidades del carrito
  const totalUnidades = carrito.reduce(function(acc, item) {
    return acc + item.cantidad;
  }, 0);

  cartBadgeEl.textContent = totalUnidades;

  // Muestra el badge solo si hay productos, lo oculta si no hay ninguno
  if (totalUnidades > 0) {
    cartBadgeEl.classList.add("visible");
  } else {
    cartBadgeEl.classList.remove("visible");
  }
}

/*  Convierte el arreglo `carrito` a texto JSON y lo guarda. Esto hace que persista aunque el usuario recargue la página.*/
function guardarCarrito() {
  localStorage.setItem("techstore-carrito", JSON.stringify(carrito));
}

/* Abrir y cerrar el panel del carrito */
function abrirCarrito() {
  cartDrawer.classList.add("abierto");
  cartOverlay.classList.add("abierto");
  document.body.style.overflow = "hidden"; 
}

function cerrarCarrito() {
  cartDrawer.classList.remove("abierto");
  cartOverlay.classList.remove("abierto");
  document.body.style.overflow = ""; 
}

// Eventos de abrir/cerrar
btnAbrir.addEventListener("click", abrirCarrito);
btnCerrar.addEventListener("click", cerrarCarrito);

/* inicio de la pagina*/
renderCatalogo();      
renderCarrito();         
actualizarBadge();      
adjuntarEventosCarrito(); 