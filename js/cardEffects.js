// =====================================================================
// cardEffects.js — Efectos interactivos de las tarjetas
// Este archivo contiene las funcionalidades de:
//   1. Flip card (voltear tarjeta)
//   2. Rasca y gana (scratch card)
//   3. Fly to cart (animación al agregar producto)
//
// Estas funcionalidades fueron creadas con ayuda de IA para agregar
// interacciones visuales al proyecto. Se adaptaron al diseño existente.
// =====================================================================


// ===================================================
// 1. CURIOSIDADES DE CADA PRODUCTO
// Este array guarda un dato curioso inventado para cada producto.
// Se usa el id del producto para buscar su curiosidad.
// La idea fue generada con IA para darle contenido al rasca y gana.
// ===================================================

var curiosidades = [
  { id: 1, texto: "Este tipo de relojes fue inspirado en relojes usados en estaciones espaciales ficticias de los años 80" },
  { id: 2, texto: "Este modelo tiene un modo oculto llamado 'Astronauta' que supuestamente ahorra batería por 48 horas" },
  { id: 3, texto: "La primera laptop del mundo pesaba 11 kilos y fue creada en 1981 por Osborne Computer" },
  { id: 4, texto: "Los audífonos Bluetooth llevan su nombre por un rey vikingo del siglo X llamado Harald Bluetooth" },
  { id: 5, texto: "El teclado mecánico más antiguo conocido fue diseñado por IBM en 1984 y aún se vende como colección" },
  { id: 6, texto: "El primer mouse de computadora fue inventado en 1964 y estaba hecho de madera" },
];


// ===================================================
// 2. FLIP CARD
// Esta parte del flip card fue hecha con ayuda de IA
// para agregar interacción visual a las tarjetas.
//
// Lo que hace: busca todas las tarjetas y les agrega
// un botón para voltearlas. Al hacer clic, la tarjeta
// gira con una animación CSS (rotateY) y muestra la
// parte trasera con el juego de rasca y gana.
// ===================================================

function inicializarFlipCards() {
  // se buscan todas las tarjetas de productos
  var tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach(function (tarjeta) {
    var productId = Number(tarjeta.dataset.productId);

    // se busca la curiosidad de este producto
    var curiosidad = curiosidades.find(function (c) {
      return c.id === productId;
    });
    var textoCuriosidad = curiosidad ? curiosidad.texto : "Dato curioso no disponible";

    // --- se guarda el contenido original (front) ---
    var contenidoFront = tarjeta.innerHTML;

    // --- se crea la estructura de flip ---
    tarjeta.innerHTML = "";
    tarjeta.classList.add("flip-container");

    var flipInner = document.createElement("div");
    flipInner.classList.add("flip-inner");

    // CARA FRONTAL: se pone el contenido original del producto
    var caraFront = document.createElement("div");
    caraFront.classList.add("flip-front");
    caraFront.innerHTML = contenidoFront;

    // se agrega un ícono pequeño para voltear en la esquina superior derecha
    var btnFlip = document.createElement("button");
    btnFlip.type = "button";
    btnFlip.classList.add("btn-flip-icon");
    btnFlip.innerHTML = "🔄";
    btnFlip.title = "Ver dato curioso";
    caraFront.appendChild(btnFlip);

    // CARA TRASERA: se pone el rasca y gana con la curiosidad
    var caraBack = document.createElement("div");
    caraBack.classList.add("flip-back");
    caraBack.innerHTML = `
      <div class="scratch-zone">
        <p class="scratch-hint">✨ Rasca para descubrir</p>
        <div class="scratch-content">
          <p class="curiosidad-texto">${textoCuriosidad}</p>
        </div>
        <canvas class="scratch-canvas" width="280" height="140"></canvas>
      </div>
      <button type="button" class="btn-volver">↩ Volver al producto</button>
    `;

    flipInner.appendChild(caraFront);
    flipInner.appendChild(caraBack);
    tarjeta.appendChild(flipInner);

    // --- EVENTOS ---

    // al hacer clic en "Descubrir dato curioso", se voltea la tarjeta
    btnFlip.addEventListener("click", function (e) {
      e.stopPropagation(); // para que no se active otra cosa
      tarjeta.classList.add("flipped");
      // se inicializa el canvas del scratch cuando se voltea
      var canvas = caraBack.querySelector(".scratch-canvas");
      inicializarScratch(canvas);
    });

    // al hacer clic en "Volver", se regresa a la cara frontal
    caraBack.querySelector(".btn-volver").addEventListener("click", function (e) {
      e.stopPropagation();
      tarjeta.classList.remove("flipped");
    });

    // se re-asigna el evento del botón "Agregar" porque se reconstruyó el HTML
    var btnAgregar = caraFront.querySelector("button:not(.btn-flip-icon)");
    if (btnAgregar) {
      btnAgregar.addEventListener("click", function (e) {
        e.stopPropagation();
        // se busca el producto original para pasarlo a agregarProducto
        var producto = productos.find(function (p) {
          return p.id === productId;
        });
        if (producto) {
          // se lanza la animación fly-to-cart antes de agregar
          animarFlyToCart(btnAgregar);
          agregarProducto(producto);
        }
      });
    }
  });
}


// ===================================================
// 3. RASCA Y GANA (SCRATCH CARD)
// La lógica del rasca y gana fue generada con IA
// y adaptada al proyecto para funcionar en cada tarjeta.
//
// Cómo funciona: se dibuja una capa gris encima de un canvas.
// Cuando el usuario mueve el mouse presionado (o touch),
// se va "borrando" la capa gris y se ve el texto de abajo.
// Se usa globalCompositeOperation = "destination-out" para borrar.
// ===================================================

function inicializarScratch(canvas) {
  if (!canvas || canvas.dataset.iniciado === "true") return;
  canvas.dataset.iniciado = "true";

  var ctx = canvas.getContext("2d");
  var ancho = canvas.width;
  var alto = canvas.height;

  // se dibuja la capa gris que se va a rascar
  ctx.fillStyle = "#1a2235";
  ctx.fillRect(0, 0, ancho, alto);

  // se agrega un texto de ayuda encima de la capa
  ctx.fillStyle = "rgba(0, 212, 255, 0.4)";
  ctx.font = "bold 13px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Rasca aquí ✨", ancho / 2, alto / 2);

  var rascando = false;

  // esta función obtiene la posición del mouse/touch dentro del canvas
  function obtenerPosicion(evento) {
    var rect = canvas.getBoundingClientRect();
    var clientX, clientY;

    // se verifica si es touch o mouse
    if (evento.touches && evento.touches.length > 0) {
      clientX = evento.touches[0].clientX;
      clientY = evento.touches[0].clientY;
    } else {
      clientX = evento.clientX;
      clientY = evento.clientY;
    }

    return {
      x: (clientX - rect.left) * (ancho / rect.width),
      y: (clientY - rect.top) * (alto / rect.height),
    };
  }

  // esta función borra un círculo en la posición del mouse
  // simula el efecto de "rascar" con el dedo o mouse
  function rascarEnPosicion(pos) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  // eventos de mouse
  canvas.addEventListener("mousedown", function (e) {
    rascando = true;
    rascarEnPosicion(obtenerPosicion(e));
  });
  canvas.addEventListener("mousemove", function (e) {
    if (rascando) rascarEnPosicion(obtenerPosicion(e));
  });
  canvas.addEventListener("mouseup", function () { rascando = false; });
  canvas.addEventListener("mouseleave", function () { rascando = false; });

  // eventos de touch (para celulares)
  canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    rascando = true;
    rascarEnPosicion(obtenerPosicion(e));
  });
  canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    if (rascando) rascarEnPosicion(obtenerPosicion(e));
  });
  canvas.addEventListener("touchend", function () { rascando = false; });
}


// ===================================================
// 4. ANIMACIÓN FLY TO CART
// Animación fly to cart agregada con IA para simular
// ecommerce real (tipo Amazon o Shopify).
//
// Cómo funciona: cuando se agrega un producto, se crea
// una copia (clon) del botón "Agregar", se posiciona sobre
// la página en la misma ubicación, y se anima volando
// hacia el ícono del carrito con CSS transitions.
// Después de la animación, el clon se elimina del DOM.
// ===================================================

function animarFlyToCart(botonOrigen) {
  // se busca la posición del botón "Agregar" y del ícono del carrito
  var rectOrigen = botonOrigen.getBoundingClientRect();
  var btnCarrito = document.getElementById("open-cart");
  var rectDestino = btnCarrito.getBoundingClientRect();

  // se crea un cohete "fantasma" que vuela hacia el carrito
  var fantasma = document.createElement("div");
  fantasma.classList.add("fly-item");
  fantasma.textContent = "🚀";

  // se posiciona encima del botón de agregar
  fantasma.style.position = "fixed";
  fantasma.style.left = rectOrigen.left + rectOrigen.width / 2 + "px";
  fantasma.style.top = rectOrigen.top + "px";
  fantasma.style.zIndex = "9999";

  document.body.appendChild(fantasma);

  // se calcula a dónde tiene que llegar (el botón del carrito)
  var destinoX = rectDestino.left + rectDestino.width / 2;
  var destinoY = rectDestino.top + rectDestino.height / 2;

  // se usa requestAnimationFrame para que la animación empiece en el siguiente frame
  // (si se pone directo, el navegador no detecta el cambio de posición)
  requestAnimationFrame(function () {
    fantasma.style.left = destinoX + "px";
    fantasma.style.top = destinoY + "px";
    fantasma.style.transform = "scale(0.2) rotate(-45deg)";
    fantasma.style.opacity = "0";
  });

  // cuando termina la animación, se elimina el elemento fantasma
  fantasma.addEventListener("transitionend", function () {
    fantasma.remove();
  });

  // por si la animación falla, se elimina después de 1 segundo
  setTimeout(function () {
    if (fantasma.parentNode) fantasma.remove();
  }, 1000);
}


// ===================================================
// 5. INICIO DE LOS EFECTOS
// Se espera a que la página cargue y los productos
// ya estén dibujados antes de agregar los efectos.
// Se usa setTimeout para asegurar que mostrarProductos()
// ya terminó de ejecutarse (porque se llama en DOMContentLoaded).
// ===================================================

document.addEventListener("DOMContentLoaded", function () {
  // se espera un poco para que app.js termine de dibujar los productos
  setTimeout(function () {
    inicializarFlipCards();
  }, 100);
});
