// BREAKFAST.JS
// Aquí manejamos la personalización del desayuno.
// Este archivo solo se encarga de guardar las opciones que el cliente va seleccionando.


// Aquí guardamos las elecciones del desayuno.
let personalizacionDesayuno = {
  bebidaFria: "Jugo de fruta de cosecha",
  frutasPreferidas: "",
  bebidaCaliente: "",
  preparacion: "",
  frutas: "Variedad de frutas de cosecha",
  comidaPrincipal: "",
  dulces: "",
  postre: "Torta o postre según disponibilidad"
};


// Esta función guarda la personalización en localStorage y así no se pierde si la persona recarga la página.
function guardarPersonalizacion() {
  localStorage.setItem(
    "personalizacionDetallitosHarly",
    JSON.stringify(personalizacionDesayuno)
  );
}


// Esta función carga la personalización guardada.
function cargarPersonalizacion() {
  const datosGuardados = localStorage.getItem("personalizacionDetallitosHarly");

  if (datosGuardados != null) {
    personalizacionDesayuno = JSON.parse(datosGuardados);
  }
}


// Esta función obtiene el texto principal de una opción y lo usamos para guardar lo que la persona ha elegido, por ejemplo, si la opción es un botón que tiene un h4 con el nombre de la bebida, tomamos ese h4 para guardar el nombre de la bebida, pero si no hay un h4, tomamos el texto del botón.

function obtenerTextoOpcion(elemento) {
  const titulo = elemento.querySelector("h4");

  if (titulo != null) {
    return titulo.textContent.trim();
  }

  return elemento.textContent.trim();
}


// Esta función identifica a qué grupo pertenece una opción, por ejemplo, bebida caliente, comida principal o dulces.
function obtenerCategoria(elemento) {
  const grupo = elemento.closest(".option-group");

  if (grupo == null) {
    return "";
  }

  const tituloGrupo = grupo.querySelector("h3").textContent.toLowerCase();
  const textoOpcion = obtenerTextoOpcion(elemento);

  if (tituloGrupo.includes("bebida fría")) {
    return "bebidaFria";
  }

  if (tituloGrupo.includes("bebida caliente")) {
    if (textoOpcion.startsWith("En ")) {
      return "preparacion";
    }

    return "bebidaCaliente";
  }

  if (tituloGrupo.includes("variedad de frutas")) {
    return "frutas";
  }

  if (tituloGrupo.includes("comida principal")) {
    return "comidaPrincipal";
  }

  if (tituloGrupo.includes("dulces")) {
    return "dulces";
  }

  if (tituloGrupo.includes("torta")) {
    return "postre";
  }

  return "";
}


// Esta función quita la selección anterior de una misma categoría y así solo queda marcada una bebida, una comida, un dulce, etc.
function limpiarSeleccionAnterior(categoria) {
  const opciones = document.querySelectorAll("#personalizar .option-pill, #personalizar .option-card");

  opciones.forEach(function(opcion) {
    const categoriaOpcion = obtenerCategoria(opcion);

    if (categoriaOpcion === categoria) {
      opcion.classList.remove("selected-option");
    }
  });
}


// Esta función marca una opción como seleccionada y la guarda.
function seleccionarOpcion(elemento) {
  const categoria = obtenerCategoria(elemento);

  if (categoria === "") {
    return;
  }

  const valor = obtenerTextoOpcion(elemento);

  limpiarSeleccionAnterior(categoria);

  elemento.classList.add("selected-option");
  personalizacionDesayuno[categoria] = valor;

  guardarPersonalizacion();
  mostrarResumenPersonalizacion();
}


// Esta función crea una línea del resumen y la usamos para mostrar cada dato elegido.
function crearLineaResumen(nombre, valor) {
  const linea = document.createElement("p");

  const etiqueta = document.createElement("strong");
  etiqueta.textContent = nombre + ": ";

  const texto = document.createElement("span");

  if (valor === "") {
    texto.textContent = "Sin seleccionar";
  } else {
    texto.textContent = valor;
  }

  linea.appendChild(etiqueta);
  linea.appendChild(texto);

  return linea;
}


// Esta función muestra un resumen de lo que la persona ha elegido.
function mostrarResumenPersonalizacion() {
  let resumen = document.getElementById("breakfast-summary");

  if (resumen == null) {
    return;
  }

  resumen.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = "Resumen de personalización";

  resumen.appendChild(titulo);
  resumen.appendChild(crearLineaResumen("Bebida fría", personalizacionDesayuno.bebidaFria));
  resumen.appendChild(crearLineaResumen("Frutas preferidas", personalizacionDesayuno.frutasPreferidas));
  resumen.appendChild(crearLineaResumen("Bebida caliente", personalizacionDesayuno.bebidaCaliente));
  resumen.appendChild(crearLineaResumen("Preparación", personalizacionDesayuno.preparacion));
  resumen.appendChild(crearLineaResumen("Frutas", personalizacionDesayuno.frutas));
  resumen.appendChild(crearLineaResumen("Comida principal", personalizacionDesayuno.comidaPrincipal));
  resumen.appendChild(crearLineaResumen("Dulces", personalizacionDesayuno.dulces));
  resumen.appendChild(crearLineaResumen("Postre", personalizacionDesayuno.postre));
}


// Esta función vuelve a marcar las opciones guardadas, sirve cuando la persona recarga la página.
function marcarOpcionesGuardadas() {
  const opciones = document.querySelectorAll("#personalizar .option-pill, #personalizar .option-card");

  opciones.forEach(function(opcion) {
    const categoria = obtenerCategoria(opcion);
    const valor = obtenerTextoOpcion(opcion);

    if (categoria !== "" && personalizacionDesayuno[categoria] === valor) {
      opcion.classList.add("selected-option");
    }
  });
}


// Esta función activa los clics en las opciones del desayuno.
function activarSeleccionDesayuno() {
  const seccionPersonalizar = document.getElementById("personalizar");

  if (seccionPersonalizar == null) {
    return;
  }

  seccionPersonalizar.addEventListener("click", function(evento) {
    
    if (evento.target.closest(".add-breakfast-btn") != null) {
      return;
    }

    const opcion = evento.target.closest(".option-pill, .option-card");

    if (opcion != null) {
      seleccionarOpcion(opcion);
    }
  });
}


// Esta función guarda lo que la persona escriba sobre las frutas.
function activarCampoFrutas() {
  const campoFrutas = document.getElementById("frutas-preferidas");

  if (campoFrutas == null) {
    return;
  }

  campoFrutas.value = personalizacionDesayuno.frutasPreferidas;

  campoFrutas.addEventListener("input", function() {
    personalizacionDesayuno.frutasPreferidas = campoFrutas.value.trim();

    guardarPersonalizacion();
    mostrarResumenPersonalizacion();
  });
}


// Cuando carga la página, dejamos lista la personalización.
document.addEventListener("DOMContentLoaded", function() {
  cargarPersonalizacion();
  activarSeleccionDesayuno();
  activarCampoFrutas();
  marcarOpcionesGuardadas();
  mostrarResumenPersonalizacion();
});


// Dejamos esta función disponible para usarla en checkout.js.
window.obtenerPersonalizacionDesayuno = function() {
  return personalizacionDesayuno;
};

