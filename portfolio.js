// PORTFOLIO.JS
// Este archivo maneja los botones del portafolio.
// La idea es que cuando alguien vea un diseño que le gusta, pueda escribir por WhatsApp con un mensaje ya preparado.


// Número de WhatsApp de Detallitos Harly.
const whatsappPortafolio = "573217465371";


// Esta función identifica si la tarjeta pertenece a desayunos, anchetas o decoraciones.
function obtenerTipoPortafolio(tarjeta) {
  const seccion = tarjeta.closest("section");

  if (seccion == null) {
    return "detalle";
  }

  if (seccion.id === "desayunos") {
    return "desayuno";
  }

  if (seccion.id === "anchetas") {
    return "ancheta";
  }

  if (seccion.id === "decoraciones") {
    return "decoración";
  }

  return "detalle";
}


// Esta función arma el mensaje que se enviará a WhatsApp.
function crearMensajePortafolio(titulo, tipo, accion) {
  let mensaje = "";

  mensaje += "Hola, vi este diseño en la página de Detallitos Harly.\n\n";
  mensaje += "Tipo de detalle: " + tipo + "\n";
  mensaje += "Diseño de referencia: " + titulo + "\n";
  mensaje += "Me interesa: " + accion + "\n\n";
  mensaje += "Quisiera personalizar algo parecido según la ocasión, colores, mensaje y disponibilidad.";

  return mensaje;
}


// Esta función abre WhatsApp con el mensaje ya escrito.
function abrirWhatsAppPortafolio(mensaje) {
  const enlace = "https://wa.me/" + whatsappPortafolio + "?text=" + encodeURIComponent(mensaje);

  window.open(enlace, "_blank");
}


// Esta función activa los botones de todas las tarjetas del portafolio.
function activarBotonesPortafolio() {
  const botones = document.querySelectorAll(".portfolio-card .card-actions button, .portfolio-card .card-actions a");

  botones.forEach(function(boton) {
    boton.addEventListener("click", function(evento) {
      evento.preventDefault();

      const tarjeta = boton.closest(".portfolio-card");

      if (tarjeta == null) {
        return;
      }

      const titulo = tarjeta.querySelector("h3").textContent;
      const tipo = obtenerTipoPortafolio(tarjeta);
      const accion = boton.textContent.trim();

      const mensaje = crearMensajePortafolio(titulo, tipo, accion);

      abrirWhatsAppPortafolio(mensaje);
    });
  });
}


// Cuando la página cargue, activamos los botones del portafolio.
document.addEventListener("DOMContentLoaded", function() {
  activarBotonesPortafolio();
});