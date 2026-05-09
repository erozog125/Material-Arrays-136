// =============================================
// app.js — Tienda Virtual
// Contiene toda la lógica de la tienda:
// productos, carrito, localStorage y pantalla
// =============================================


// ===================================================
// 1. LISTA DE PRODUCTOS
// Se declaran todos los productos disponibles en la tienda.
// Cada producto tiene un id, nombre, imagen, descripción y precio.
// ===================================================

const productos = [
  {
    id: 1,
    name: "Reloj",
    image: "./assets/images/reloj.jpg",
    description: "Reloj elegante",
    price: 300000,
  },
  {
    id: 2,
    name: "Phone",
    image: "./assets/images/phone.jpg",
    description: "Smartphone",
    price: 4000000,
  },
  {
    id: 3,
    name: "Laptop",
    image: "./assets/images/laptop.jpg",
    description: "Potente laptop",
    price: 2500000,
  },
  {
    id: 4,
    name: "Audífonos",
    image: "./assets/images/audifonos.jpg",
    description: "Bluetooth",
    price: 150000,
  },
  {
    id: 5,
    name: "Teclado",
    image: "./assets/images/teclado.jpg",
    description: "Mecánico",
    price: 200000,
  },
  {
    id: 6,
    name: "Mouse",
    image: "./assets/images/mouse.jpg",
    description: "Gaming",
    price: 100000,
  },
];


// ===================================================
// 2. CARRITO
// Se intenta cargar el carrito desde localStorage.
// Si no hay nada guardado, se inicializa como array vacío.
// ===================================================

let carrito = JSON.parse(localStorage.getItem("cart")) || [];


// ===================================================
// 3. LOCALSTORAGE
// Esta función guarda el carrito en el navegador
// para que no se pierda al recargar la página.
// ===================================================

function guardarCarrito() {
  localStorage.setItem("cart", JSON.stringify(carrito));
}


// ===================================================
// 4. LÓGICA DEL CARRITO
// ===================================================

// Esta función agrega un producto al carrito.
// Si el producto ya estaba en el carrito, se aumenta su cantidad.
// Si no estaba, se agrega como producto nuevo con cantidad 1.
function agregarProducto(producto) {
  let itemExistente = carrito.find(function (item) {
    return item.id === producto.id;
  });

  if (itemExistente) {
    // el producto ya estaba en el carrito, se le suma 1
    itemExistente.quantity++;
  } else {
    // es un producto nuevo, se agrega con cantidad 1
    carrito.push({ ...producto, quantity: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
}

// Esta función cambia la cantidad de un producto en el carrito.
// Si la cantidad llega a 0, el producto se elimina del carrito.
function cambiarCantidad(id, valor) {
  let item = carrito.find(function (p) {
    return p.id === id;
  });

  if (!item) return; // si no se encuentra el producto, no se hace nada

  item.quantity += valor;

  // si la cantidad llegó a 0, se elimina del carrito
  if (item.quantity <= 0) {
    carrito = carrito.filter(function (p) {
      return p.id !== id;
    });
  }

  guardarCarrito();
  mostrarCarrito();
}

// Esta función elimina un producto del carrito por su id.
// Se usa filter para crear un nuevo array sin ese producto.
function eliminarProducto(id) {
  carrito = carrito.filter(function (p) {
    return p.id !== id;
  });

  guardarCarrito();
  mostrarCarrito();
}


// ===================================================
// 5. FUNCIONES DE PANTALLA (UI)
// ===================================================

// Esta función formatea un número como precio colombiano.
// Ejemplo: 300000 → "300.000"
function formatearPrecio(precio) {
  return precio.toLocaleString("es-CO");
}

// Esta función muestra todos los productos en la pantalla.
// Se recorre el array de productos y se crea una tarjeta por cada uno.
function mostrarProductos() {
  let contenedor = document.querySelector("main");
  contenedor.innerHTML = ""; // se limpia el contenido anterior

  productos.forEach(function (producto) {
    // se crea la tarjeta del producto
    let tarjeta = document.createElement("div");
    tarjeta.classList.add("card");
    tarjeta.dataset.productId = producto.id;

    // se pone el contenido HTML dentro de la tarjeta
    tarjeta.innerHTML = `
      <h3>${producto.name}</h3>
      <img src="${producto.image}" alt="${producto.name}" loading="lazy">
      <p>${producto.description}</p>
      <span>$${formatearPrecio(producto.price)}</span>
      <button type="button">Agregar</button>
    `;

    // cuando se hace clic en "Agregar", se llama a la función del carrito
    tarjeta.querySelector("button").addEventListener("click", function () {
      agregarProducto(producto);
    });

    // se agrega la tarjeta al contenedor principal
    contenedor.appendChild(tarjeta);
  });
}

// Esta función actualiza todo lo que se ve en el carrito lateral.
// Se recorre cada item del carrito y se muestra con sus botones de control.
function mostrarCarrito() {
  let contenedor = document.getElementById("cart-items");
  contenedor.innerHTML = ""; // se limpia el carrito antes de redibujarlo

  let total = 0;
  let cantidadTotal = 0;

  // se recorre cada producto que está en el carrito
  carrito.forEach(function (item) {
    // se van sumando el total y las unidades
    total += item.price * item.quantity;
    cantidadTotal += item.quantity;

    // se crea la fila del item
    let fila = document.createElement("div");
    fila.classList.add("cart-item");
    fila.dataset.productId = item.id;

    fila.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>$${formatearPrecio(item.price)}</p>
      </div>
      <div class="qty-controls">
        <button type="button" class="btn-menos" aria-label="Disminuir cantidad">-</button>
        <span class="q-num">${item.quantity}</span>
        <button type="button" class="btn-mas"  aria-label="Aumentar cantidad">+</button>
        <button type="button" class="btn-eliminar" aria-label="Eliminar">x</button>
      </div>
    `;

    // se asignan los eventos a los botones de la fila
    // se guarda el id en una variable para usarla dentro de los listeners
    let idProducto = item.id;

    fila.querySelector(".btn-menos").addEventListener("click", function () {
      cambiarCantidad(idProducto, -1);
    });

    fila.querySelector(".btn-mas").addEventListener("click", function () {
      cambiarCantidad(idProducto, 1);
    });

    fila.querySelector(".btn-eliminar").addEventListener("click", function () {
      eliminarProducto(idProducto);
    });

    contenedor.appendChild(fila);
  });

  // se actualiza el total y el contador visibles en pantalla
  document.getElementById("cart-total").textContent = formatearPrecio(total);
  document.getElementById("cart-count").textContent = cantidadTotal;
}

// Estas dos funciones abren y cierran el carrito lateral.
function abrirCarrito() {
  document.getElementById("cart").classList.add("open");
  document.getElementById("overlay").classList.remove("hidden");
}

function cerrarCarrito() {
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").classList.add("hidden");
}


// ===================================================
// 6. INICIO
// Cuando termina de cargar la página, se arranca todo.
// ===================================================

document.addEventListener("DOMContentLoaded", function () {
  // se muestran los productos en la grilla
  mostrarProductos();

  // se muestra el carrito (por si había algo guardado en localStorage)
  mostrarCarrito();

  // se asignan los eventos de abrir y cerrar el carrito lateral
  document.getElementById("open-cart").addEventListener("click", abrirCarrito);
  document.getElementById("close-cart").addEventListener("click", cerrarCarrito);
  document.getElementById("overlay").addEventListener("click", cerrarCarrito);
});
