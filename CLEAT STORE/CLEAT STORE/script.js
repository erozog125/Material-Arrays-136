// ── Referencias al DOM ──────────────────────────────────────
const productList = document.getElementById("product-list");
const cartItems   = document.getElementById("cart-items");
const cartTotal   = document.getElementById("cart-total");
const cartCount   = document.querySelector(".cart-count");
const cartEmpty   = document.querySelector(".cart-empty");
const sampleItem  = document.querySelector(".sample-item");


// ── Fuente de datos: arreglo de productos ───────────────────
const products = [
  { id:1, nombre:"Guayos F50 Amarillos",  marca:"Adidas", precio:519950, imagen:"Assets/guayo-amarillo.avif" },
  { id:2, nombre:"Guayos Nike Negros",     marca:"Nike",   precio:339950, imagen:"Assets/guayo-nike-negro.webp" },
  { id:3, nombre:"Guayos Mbappé",          marca:"Nike",   precio:199950, imagen:"Assets/guayo-mbappe.webp" },
  { id:4, nombre:"Guayos Nike Blancos",    marca:"Nike",   precio:299950, imagen:"Assets/guayo-nike.webp" },
  { id:5, nombre:"Guayos CR7",             marca:"Nike",   precio:229950, imagen:"Assets/guayos-cr7.jpg" },
  { id:6, nombre:"Guayos Lamine Yamal",    marca:"Adidas", precio:519950, imagen:"Assets/guayos-lamine.avif" },
];


// ── Cargar carrito desde localStorage ───────────────────────
// JSON.parse convierte el string guardado de vuelta a un arreglo de objetos
const carritoGuardado = localStorage.getItem("carritoCleatStore");
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];


// ── Función para guardar el carrito en localStorage ──────────
// JSON.stringify convierte el arreglo de objetos a string para poder guardarlo
function guardarCarrito() {
  localStorage.setItem("carritoCleatStore", JSON.stringify(carrito));
}



// Suma todas las cantidades para mostrar el total de ítems en el ícono del carrito
function actualizarContador() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  cartCount.textContent = totalItems;
}


// ── Función para calcular el total de la compra ──────────────
// Suma el costo de todos los productos multiplicado por su cantidad
function calcularTotal() {
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  cartTotal.textContent = `$${total.toLocaleString("es-CO")}`;
}


// ── Función para renderizar el carrito en el DOM ─────────────
// Recorre el arreglo carrito y genera los elementos visuales en el aside
function renderCarrito() {

  cartItems.innerHTML = "";

  // Ocultar el ítem de muestra del HTML estático
  if (sampleItem) sampleItem.style.display = "none";

  // Mostrar u ocultar el estado vacío según si hay productos
  if (carrito.length === 0) {
    cartEmpty.style.display = "flex";
    cartItems.style.display = "none";
  } else {
    cartEmpty.style.display = "none";
    cartItems.style.display = "flex";
  }

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <div class="item-img-wrap">
        <img src="${item.imagen}" alt="${item.nombre}" class="item-thumb" />
      </div>
      <div class="item-info">
        <span class="item-brand">${item.marca}</span>
        <span class="item-name">${item.nombre}</span>
        <span class="item-qty">× ${item.cantidad}</span>
      </div>
      <div class="item-right">
        <span class="item-subtotal">$${(item.precio * item.cantidad).toLocaleString("es-CO")}</span>
        <button class="btn-remove" type="button" aria-label="Eliminar ${item.nombre}">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8">
            <line x1="1" y1="1" x2="13" y2="13"/>
            <line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>
      </div>
    `;

    // Eliminar el producto del carrito al hacer clic en ✕
    li.querySelector(".btn-remove").addEventListener("click", () => {
      const index = carrito.findIndex(p => p.id === item.id);
      carrito.splice(index, 1); // Eliminar 1 elemento en la posición encontrada
      guardarCarrito();          // Persistir el cambio en localStorage
      renderCarrito();           // Volver a pintar el carrito actualizado
    });

    cartItems.appendChild(li);
  });

  calcularTotal();
  actualizarContador();
  guardarCarrito();
}


// ── Función para renderizar las cards de productos ───────────
// Recorre el arreglo products y genera dinámicamente cada card en el DOM
function renderProductos() {

  // Limpiar los skeleton-cards del HTML antes de insertar los productos reales
  productList.innerHTML = "";

  products.forEach(producto => {
    const card = document.createElement("article");
    card.classList.add("product-card");
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      <div class="card-image-wrap">
        <img class="card-img" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
      </div>
      <div class="card-body">
        <span class="card-brand">${producto.marca}</span>
        <h3 class="card-name">${producto.nombre}</h3>
        <div class="card-footer">
          <p class="card-price">$${producto.precio.toLocaleString("es-CO")}</p>
          <button class="btn-add" type="button">+ Agregar</button>
        </div>
      </div>
    `;

    // Agregar el producto al carrito al hacer clic en el botón
    card.querySelector(".btn-add").addEventListener("click", () => {

      // Verificar si el producto ya existe en el carrito
      const productoExistente = carrito.find(item => item.id === producto.id);

      if (productoExistente) {
        // Si ya existe, incrementar su cantidad (no duplicar el elemento visual)
        productoExistente.cantidad++;
      } else {
        // Si no existe, agregarlo con cantidad inicial de 1
        carrito.push({ ...producto, cantidad: 1 });
      }

      guardarCarrito(); // Persistir y re-renderizar el carrito con el nuevo estado
      renderCarrito();
    });

    productList.appendChild(card);
  });
}


// ── Inicialización ───────────────────────────────────────────
// Al cargar la página: pintar productos y restaurar el carrito desde localStorage
renderProductos();
renderCarrito();