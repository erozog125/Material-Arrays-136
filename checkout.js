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

// Esta función coloca una fecha mínima de 2 días y así el usuario no puede elegir una fecha demasiado cercana.
function configurarFechaMinima() {
  const fechaEntrega = document.getElementById("delivery-date");

  if (fechaEntrega == null) {
    return;
  }

  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 2);

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  fechaEntrega.min = anio + "-" + mes + "-" + dia;
}

// Esta función revisa si la fecha cumple con los 2 días de anticipación.
function fechaEsValida() {
  const fechaEntrega = document.getElementById("delivery-date");

  if (fechaEntrega == null || fechaEntrega.value === "") {
    alert("Por favor selecciona la fecha de entrega.");
    return false;
  }

  const fechaElegida = new Date(fechaEntrega.value + "T00:00:00");

  const fechaMinima = new Date();
  fechaMinima.setHours(0, 0, 0, 0);
  fechaMinima.setDate(fechaMinima.getDate() + 2);

  if (fechaElegida < fechaMinima) {
    alert("Los pedidos deben realizarse con mínimo 2 días de anticipación.");
    return false;
  }

  return true;
}

