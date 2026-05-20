// CHECKOUT.JS, aquí manejamos la parte final del pedido.
// Este archivo calcula el domicilio, valida la fecha y arma el mensaje para enviarlo por WhatsApp.

// Número de WhatsApp del emprendimiento.
const numeroWhatsApp = "573217465371";


// Esta función da formato a los precios.
// Ejemplo: 8000 se muestra como $8.000
function formatearPrecioCheckout(precio) {
  return "$" + precio.toLocaleString("es-CO");
}


// Esta función obtiene el valor del domicilio según la zona elegida.
function obtenerValorDomicilio() {
  const zona = document.getElementById("zone");

  if (zona == null || zona.value === "") {
    return 0;
  }

  return Number(zona.value);
}

// Esta función actualiza el total final y suma el subtotal del carrito más el domicilio.
function actualizarTotalConDomicilio() {
  const deliveryText = document.getElementById("delivery-price");
  const totalText = document.getElementById("total");

  if (deliveryText == null || totalText == null) {
    return;
  }

  const subtotal = window.obtenerSubtotalCarrito ? window.obtenerSubtotalCarrito() : 0;
  const domicilio = obtenerValorDomicilio();
  const total = subtotal + domicilio;

  deliveryText.textContent = formatearPrecioCheckout(domicilio);
  totalText.textContent = formatearPrecioCheckout(total);
}
