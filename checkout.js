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
