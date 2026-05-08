/* ============================================================
   Las imágenes están embebidas directamente para que el
   proyecto funcione sin necesidad de un servidor web.
============================================================ */
const imagenes = {
  "realmadrid.webp": "assets/realmadrid.webp",
  "barca.webp":   "assets/barca.webp",
  "arsenal.webp":     "assets/arsenal.webp",
  "manchester.webp":    "assets/manchester.webp",
  "juve.webp":    "assets/juve.webp",
  "milan.webp":    "assets/milan.webp",
  "bayer.webp":      "assets/bayer.webp",
  "colombia.webp":    "assets/colombia.webp",
  "argentina.webp":   "assets/argentina.webp"
};

/* ============================================================
   ARREGLO DE PRODUCTOS — fuente de datos de la tienda
   Cada objeto contiene: id, nombre, precio, imgKey, liga, badge
============================================================ */
const productos = [
  { id:1, nombre:"realmadrid.webp — Local 24/25",       precio:289000, imgKey:"realmadrid.webp", liga:"LaLiga",     badge:"new"  },
  { id:2, nombre:"barca.webp — Visitante 24/25",  precio:285000, imgKey:"barca.webp",   liga:"LaLiga",     badge:"hot"  },
  { id:3, nombre:"arsenal.webp — Local 24/25",        precio:279000, imgKey:"arsenal.webp",     liga:"Premier",    badge:"new"  },
  { id:4, nombre:"manchester.webp — Local 24/25",   precio:292000, imgKey:"manchester.webp",    liga:"Premier",    badge:null   },
  { id:5, nombre:"juve.webp — Local 24/25",          precio:265000, imgKey:"juve.webp",    liga:"Serie A",    badge:"sale" },
  { id:6, nombre:"milan.webp — Visitante 24/25",      precio:268000, imgKey:"milan.webp",    liga:"Serie A",    badge:null   },
  { id:7, nombre:"bayer.webp — Local 24/25",    precio:288000, imgKey:"bayer.webp",      liga:"Bundesliga", badge:"hot"  },
  { id:8, nombre:"Colombia.webp — Copa América 2024",    precio:320000, imgKey:"colombia.webp",    liga:"Selección",  badge:"new"  },
  { id:9, nombre:"argentina.webp — Campeona Mundial",    precio:335000, imgKey:"argentina.webp",   liga:"Selección",  badge:"hot"  }
];


/* ============================================================
   ESTADO — carrito recuperado desde localStorage al iniciar
============================================================ */
let carrito = cargarCarrito();
let filtroActivo = "all";

/* ============================================================
   FUNCIÓN: cargarCarrito
   Recupera el carrito persistido en localStorage.
   Usa JSON.parse() para convertir el string guardado a objeto JS.
============================================================ */
function cargarCarrito() {
  const datos = localStorage.getItem("soccerjersey_carrito");
  return datos ? JSON.parse(datos) : [];
}

/* ============================================================
   FUNCIÓN: guardarCarrito
   Persiste el estado del carrito en localStorage.
   Usa JSON.stringify() para convertir el objeto a string.
============================================================ */
function guardarCarrito() {
  localStorage.setItem("soccerjersey_carrito", JSON.stringify(carrito));
}

/* ============================================================
   FUNCIÓN: formatearPrecio
   Formatea un número como precio en pesos colombianos.
============================================================ */
const formatearPrecio = (valor) => `$${valor.toLocaleString("es-CO")}`;

