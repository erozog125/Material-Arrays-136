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
