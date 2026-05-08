// ── 1. DATOS ─────────────────────────────────
// Arreglo de objetos con los 6 productos de la tienda.
// Cada objeto contiene id, nombre, precio e imagen (ruta local en /assets)
const productos = [
  { id: 1, nombre: "Jarrón Escandinavo Dorado",     precio: 1920000,  imagen: "assets/img_jarron.png" },
  { id: 2, nombre: "Lámpara Moderna Minimalista",   precio: 4960000,  imagen: "assets/img_lampara.png" },
  { id: 3, nombre: "Vela Aromática Premium",        precio: 780000,   imagen: "assets/img_vela.png" },
  { id: 4, nombre: "Espejo Decorativo Circular",    precio: 3500000,  imagen: "assets/img_espejo.png" },
  { id: 5, nombre: "Escultura Abstracta de Mármol", precio: 10400000, imagen: "assets/img_escultura.png" },
  { id: 6, nombre: "Bandeja Decorativa de Lujo",    precio: 1360000,  imagen: "assets/img_bandeja.png" },
];

// Arreglo vacío que almacenará los productos agregados al carrito
let carrito = [];


// ── 2. RECUPERAR LOCALSTORAGE ─────────────────
// Función para recuperar el carrito guardado en LocalStorage al cargar la página.
// Usa JSON.parse() para convertir el texto almacenado de vuelta a un arreglo de objetos
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}


// ── 3. DIBUJAR PRODUCTOS EN EL GRID ──────────
// Función para recorrer el arreglo de productos y generar
// dinámicamente las cards de cada producto en el DOM
function renderProductos() {
  const grid = document.querySelector(".product-grid");
  grid.innerHTML = "";

  productos.forEach(producto => {
    grid.innerHTML += `
      <article class="product-card">
        <div class="product-img-wrap">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img" />
        </div>
        <div class="product-info">
          <h3 class="product-name">${producto.nombre}</h3>
          <div class="product-footer">
            <span class="product-price">
              ${producto.precio.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0
              })}
            </span>
            <button class="btn btn-cart" data-id="${producto.id}">
              Agregar al carrito
            </button>
          </div>
        </div>
      </article>
    `;
  });
}


// ── 4. DIBUJAR EL CARRITO ─────────────────────
// Función para dibujar los items del carrito en el panel lateral.
// Si el carrito está vacío muestra un mensaje, si no recorre
// el arreglo y genera el HTML de cada item con su imagen y cantidad
function renderCarrito() {
  const lista = document.querySelector(".carrito-lista");
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = `
      <div class="carrito-vacio">
        <p>Tu carrito está vacío.</p>
        <p>Agrega productos para continuar.</p>
      </div>
    `;
  } else {
    carrito.forEach(item => {
      lista.innerHTML += `
        <div class="carrito-item">
          <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img" />
          <div class="carrito-item-info">
            <span class="carrito-item-nombre">${item.nombre}</span>
            <span class="carrito-item-cantidad">Cantidad: ${item.cantidad}</span>
            <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
          </div>
          <span class="carrito-item-precio">
            ${item.precio.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0
            })}
          </span>
        </div>
      `;
    });
  }

  calcularTotal();
  actualizarContador();
}


// ── 5. CALCULAR TOTAL ─────────────────────────
// Función para actualizar el contador total de la compra.
// Suma el precio multiplicado por la cantidad de cada producto
// usando reduce() y muestra el resultado formateado en pesos colombianos
function calcularTotal() {
  const total = carrito.reduce((acumulador, item) => {
    return acumulador + (item.precio * item.cantidad);
  }, 0);

  document.querySelector(".carrito-total").textContent = total.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  });
}


// ── 6. ACTUALIZAR CONTADOR DEL ÍCONO ─────────
// Función para actualizar el número visible sobre el ícono del carrito.
// Suma la cantidad de todos los items y lo muestra en el badge dorado
function actualizarContador() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("cart-contador");
  contador.textContent = totalItems;

  if (totalItems > 0) {
    contador.classList.add("visible");
  } else {
    contador.classList.remove("visible");
  }
}


// ── 7. AGREGAR AL CARRITO ─────────────────────
// Función para agregar un producto al carrito.
// Si el producto ya existe incrementa su propiedad cantidad sin duplicarlo.
// Si es nuevo lo agrega con cantidad 1.
// Guarda el estado en LocalStorage usando JSON.stringify()
function agregarAlCarrito(id) {
  const existe = carrito.find(item => item.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    const producto = productos.find(p => p.id === id);
    carrito.push({
      id:       producto.id,
      nombre:   producto.nombre,
      precio:   producto.precio,
      imagen:   producto.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}


// ── 8. ELIMINAR DEL CARRITO ───────────────────
// Función para eliminar un producto del carrito.
// Usa filter() para crear un nuevo arreglo sin el producto seleccionado
// y guarda el resultado en LocalStorage
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}


// ── 9. ABRIR Y CERRAR PANEL ───────────────────
// Función para mostrar el panel lateral del carrito
function abrirCarrito() {
  document.getElementById("carrito-panel").classList.add("abierto");
}

// Función para ocultar el panel lateral del carrito
function cerrarCarrito() {
  document.getElementById("carrito-panel").classList.remove("abierto");
}


// ── 10. EVENTOS ───────────────────────────────
// Escucha todos los clics en la página y ejecuta la acción
// correspondiente según el elemento que fue clickeado
document.addEventListener("click", function(e) {

  // Abrir carrito al hacer clic en el ícono
  if (e.target.closest("#cart-toggle")) {
    abrirCarrito();
  }

  // Cerrar carrito al hacer clic en el botón X
  if (e.target.closest("#carrito-cerrar")) {
    cerrarCarrito();
  }

  // Agregar producto al carrito y abrir el panel
  if (e.target.classList.contains("btn-cart")) {
    const id = Number(e.target.dataset.id);
    agregarAlCarrito(id);
    abrirCarrito();
  }

  // Eliminar producto del carrito
  if (e.target.classList.contains("btn-eliminar")) {
    const id = Number(e.target.dataset.id);
    eliminarDelCarrito(id);
  }

});


// ── 11. INICIAR ───────────────────────────────
// Punto de entrada del programa. Se ejecuta al cargar la página.
// Recupera el carrito guardado, dibuja los productos y actualiza el panel
cargarCarrito();
renderProductos();
renderCarrito();