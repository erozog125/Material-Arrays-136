// CHECKOUT.JS, aquí manejamos la parte final del pedido.
// Este archivo calcula el domicilio, valida la fecha y arma el mensaje para enviarlo por WhatsApp.

// Número de WhatsApp del emprendimiento.
const numeroWhatsApp = "573217465371";


// Esta función da formato a los precios, por ejemplo, 8000 se muestra como $8.000.
function formatearPrecioCheckout(precio) {
  return "$" + precio.toLocaleString("es-CO");
}

// Esta función toma el valor de un input, textarea o select, pero si el campo no existe, devuelve un texto vacío.
function obtenerValor(idCampo) {
  const campo = document.getElementById(idCampo);

  if (campo == null) {
    return "";
  }

  return campo.value.trim();
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

  const fechaMinima = new Date();
  fechaMinima.setDate(fechaMinima.getDate() + 2);

  const anio = fechaMinima.getFullYear();
  const mes = String(fechaMinima.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaMinima.getDate()).padStart(2, "0");

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

// Esta función arma una lista con los productos del carrito.
function crearResumenProductos() {
  const carrito = window.obtenerCarrito ? window.obtenerCarrito() : [];

  if (carrito.length === 0) {
    return "No se agregaron productos al carrito.";
  }

  let resumen = "";

  carrito.forEach(function(producto) {
    resumen += "- " + producto.nombre + " x" + producto.cantidad + " = ";
    resumen += formatearPrecioCheckout(producto.precio * producto.cantidad) + "\n";
  });

  return resumen;
}

// Esta función crea el resumen de la personalización del desayuno y toma las opciones que se guardaron desde breakfast.js.
function crearResumenDesayuno() {
  if (window.obtenerPersonalizacionDesayuno == null) {
    return "No se seleccionó personalización del desayuno.";
  }

  const desayuno = window.obtenerPersonalizacionDesayuno();

  let resumen = "";

  resumen += "Bebida fría: " + desayuno.bebidaFria + "\n";
  resumen += "Frutas preferidas o a evitar: " + desayuno.frutasPreferidas + "\n";
  resumen += "Bebida caliente: " + desayuno.bebidaCaliente + "\n";
  resumen += "Preparación: " + desayuno.preparacion + "\n";
  resumen += "Frutas: " + desayuno.frutas + "\n";
  resumen += "Comida principal: " + desayuno.comidaPrincipal + "\n";
  resumen += "Dulces: " + desayuno.dulces + "\n";
  resumen += "Postre: " + desayuno.postre + "\n";

  return resumen;
}

// Esta función valida algunos datos básicos del formulario.
function validarDatosBasicos() {
  const nombreComprador = obtenerValorInput("buyer-name");
  const celularComprador = obtenerValorInput("buyer-phone");
  const direccion = obtenerValorInput("address");
  const zona = document.getElementById("zone");

  if (nombreComprador === "") {
    alert("Por favor escribe el nombre de quien compra.");
    return false;
  }

  if (celularComprador === "") {
    alert("Por favor escribe el número de celular.");
    return false;
  }

  if (direccion === "") {
    alert("Por favor escribe la dirección de entrega.");
    return false;
  }

  if (zona == null || zona.value === "") {
    alert("Por favor selecciona la zona de entrega.");
    return false;
  }

  return true;
}

// Esta función arma el mensaje final que se enviará por WhatsApp.
function crearMensajeWhatsApp() {
  const subtotal = window.obtenerSubtotalCarrito ? window.obtenerSubtotalCarrito() : 0;
  const domicilio = obtenerValorDomicilio();
  const total = subtotal + domicilio;

  let mensaje = "";

  mensaje += "Hola, quiero confirmar este pedido de Detallitos Harly:%0A%0A";

  mensaje += "*Resumen del pedido:*%0A";
  mensaje += encodeURIComponent(crearResumenProductos()) + "%0A";

  mensaje += "*Subtotal:* " + encodeURIComponent(formatearPrecioCheckout(subtotal)) + "%0A";
  mensaje += "*Domicilio:* " + encodeURIComponent(formatearPrecioCheckout(domicilio)) + "%0A";
  mensaje += "*Total estimado:* " + encodeURIComponent(formatearPrecioCheckout(total)) + "%0A%0A";

  mensaje += "*Datos de quien compra:*%0A";
  mensaje += "Nombre: " + encodeURIComponent(obtenerValorInput("buyer-name")) + "%0A";
  mensaje += "Celular: " + encodeURIComponent(obtenerValorInput("buyer-phone")) + "%0A";
  mensaje += "Correo: " + encodeURIComponent(obtenerValorInput("buyer-email")) + "%0A%0A";

  mensaje += "*Datos de quien recibe:*%0A";
  mensaje += "Nombre: " + encodeURIComponent(obtenerValorInput("receiver-name")) + "%0A";
  mensaje += "Contacto: " + encodeURIComponent(obtenerValorInput("receiver-phone")) + "%0A%0A";

  mensaje += "*Mensaje para la tarjeta:*%0A";
  mensaje += "De: " + encodeURIComponent(obtenerValorInput("from-name")) + "%0A";
  mensaje += "Para: " + encodeURIComponent(obtenerValorInput("to-name")) + "%0A";
  mensaje += "Mensaje: " + encodeURIComponent(obtenerValorInput("card-message")) + "%0A%0A";

  mensaje += "*Datos de entrega:*%0A";
  mensaje += "Dirección: " + encodeURIComponent(obtenerValorInput("address")) + "%0A";
  mensaje += "Barrio: " + encodeURIComponent(obtenerValorInput("neighborhood")) + "%0A";
  mensaje += "Fecha: " + encodeURIComponent(obtenerValorInput("delivery-date")) + "%0A";
  mensaje += "Hora aproximada: " + encodeURIComponent(obtenerValorInput("delivery-time")) + "%0A";
  mensaje += "Indicaciones: " + encodeURIComponent(obtenerValorInput("delivery-notes")) + "%0A%0A";

  mensaje += "Entiendo que el pedido debe confirmarse con mínimo 2 días de anticipación y que el total puede variar según disponibilidad.";

  return mensaje;
}

// Esta función abre WhatsApp con el resumen del pedido.
function enviarPedidoPorWhatsApp() {
  if (!validarDatosBasicos()) {
    return;
  }

  if (!fechaEsValida()) {
    return;
  }

  const mensaje = crearMensajeWhatsApp();
  const enlace = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensaje);

  window.open(enlace, "_blank");
}


// Esta función activa los eventos del checkout.
function activarCheckout() {
  const zona = document.getElementById("zone");
  const botonEnviar = document.getElementById("send-whatsapp-btn");

  if (zona != null) {
    zona.addEventListener("change", function() {
      actualizarTotalConDomicilio();
    });
  }

  if (botonEnviar != null) {
    botonEnviar.addEventListener("click", function() {
      enviarPedidoPorWhatsApp();
    });
  }

  // Cada vez que se toca el carrito, actualizamos el total con domicilio.
  document.addEventListener("click", function() {
    setTimeout(function() {
      actualizarTotalConDomicilio();
    }, 100);
  });
}


// Cuando carga la página, preparamos el formulario final.
document.addEventListener("DOMContentLoaded", function() {
  configurarFechaMinima();
  actualizarTotalConDomicilio();
  activarCheckout();
});


// Dejamos esta función disponible por si otro archivo necesita actualizar el total.
window.actualizarTotalConDomicilio = actualizarTotalConDomicilio;