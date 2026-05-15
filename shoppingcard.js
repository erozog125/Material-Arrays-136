// SHOPPINGCARD.JS
// Aquí manejamos todo lo del carrito de compras.
// Este archivo se encarga de agregar productos, cambiar cantidades, eliminar productos y guardar el carrito.



// Aquí guardamos los productos que el usuario va agregando.
let carrito = [];


// Esta función convierte un número en precio colombiano, algo parecido a lo que hicimos en market.js pero esta es para mostrar los precios dentro del carrito de compras.
function formatearPrecioCarrito(precio) {
  return "$" + precio.toLocaleString("es-CO");
}

// Esta función guarda el carrito en localStorage, de este modo, si la persona recarga la página, el pedido no se perdaría.
function guardarCarrito() {
  localStorage.setItem("carritoDetallitosHarly", JSON.stringify(carrito));
}

// Esta función carga el carrito guardado en localStorage.
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carritoDetallitosHarly");

  if (carritoGuardado != null) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// Esta función calcula el subtotal del carrito y multiplica el precio por la cantidad de cada producto.
function calcularSubtotal() {
  let subtotal = 0;

  carrito.forEach(function(producto) {
    subtotal = subtotal + producto.precio * producto.cantidad;
  });

  return subtotal;
}

// Esta función muestra el carrito en la página, actualiza el subtotal y el total. También se encarga de mostrar un mensaje si el carrito está vacío.
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("cart-items");
  const subtotalTexto = document.getElementById("subtotal");
  const totalTexto = document.getElementById("total");

  if (contenedorCarrito == null) {
    return;
  }

  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.className = "empty-cart-message";
    mensaje.textContent = "Aún no has agregado productos.";

    contenedorCarrito.appendChild(mensaje);

    subtotalTexto.textContent = "$0";
    totalTexto.textContent = "$0";

    return;
  }

  carrito.forEach(function(producto) {
    const item = document.createElement("div");
    item.className = "cart-item";

    const info = document.createElement("div");

    const nombre = document.createElement("h4");
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = formatearPrecioCarrito(producto.precio) + " x " + producto.cantidad;

    info.appendChild(nombre);
    info.appendChild(precio);

    const acciones = document.createElement("div");
    acciones.className = "cart-item-actions";

    const botonRestar = document.createElement("button");
    botonRestar.type = "button";
    botonRestar.textContent = "-";
    botonRestar.dataset.id = producto.id;
    botonRestar.className = "cart-minus-btn";

    const cantidad = document.createElement("span");
    cantidad.textContent = producto.cantidad;

    const botonSumar = document.createElement("button");
    botonSumar.type = "button";
    botonSumar.textContent = "+";
    botonSumar.dataset.id = producto.id;
    botonSumar.className = "cart-plus-btn";

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.dataset.id = producto.id;
    botonEliminar.className = "cart-delete-btn";

    acciones.appendChild(botonRestar);
    acciones.appendChild(cantidad);
    acciones.appendChild(botonSumar);
    acciones.appendChild(botonEliminar);

    item.appendChild(info);
    item.appendChild(acciones);

    contenedorCarrito.appendChild(item);
  });

  const subtotal = calcularSubtotal();

  subtotalTexto.textContent = formatearPrecioCarrito(subtotal);
  totalTexto.textContent = formatearPrecioCarrito(subtotal);
}
