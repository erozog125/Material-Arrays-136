// SHOPPINGCARD.JS
// Aquí manejamos todo lo del carrito de compras.
// Este archivo se encarga de agregar productos, cambiar cantidades, eliminar productos y guardar el carrito.



// Aquí guardamos los productos que el usuario va agregando.
let carrito = [];


// Esta función convierte un número en precio colombiano, algo parecido a lo que hicimos en market.js pero esta es para mostrar los precios dentro del carrito de compras.
function formatearPrecioCarrito(precio) {
  return "$" + precio.toLocaleString("es-CO");
}
