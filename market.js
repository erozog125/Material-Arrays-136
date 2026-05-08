// MARKET.JS
// Aquí guardamos y mostramos productos de la tienda.
// En este primer paso solo vamos a mostrar los productos destacados en la página.


// Lista de productos destacados.
// Cada producto tiene un id, nombre, precio, imagen y descripción.
const productosDestacados = [
  {
    id: 1,
    nombre: "Ramo de flores",
    precio: 35000,
    imagen: "assets/ramo-flores-1.jpg",
    descripcion: "Ideal para complementar detalles románticos, familiares o fechas especiales."
  },
  {
    id: 2,
    nombre: "Ramo de flores especial",
    precio: 75000,
    imagen: "assets/ramo-flores-2.jpg",
    descripcion: "Una opción más llamativa para hacer el regalo más elegante y significativo."
  },
  {
    id: 3,
    nombre: "Tabla de quesos",
    precio: 40000,
    imagen: "assets/tabla-quesos-1.jpg",
    descripcion: "Complemento gastronómico para hacer el detalle más completo y especial."
  },
  {
    id: 4,
    nombre: "Charcutería",
    precio: 40000,
    imagen: "assets/tabla-quesos-2.jpg",
    descripcion: "Una opción ideal para anchetas, celebraciones o desayunos más especiales."
  },
  {
    id: 5,
    nombre: "Domo variado grande",
    precio: 40000,
    imagen: "assets/domo-grande-1.jpg",
    descripcion: "Perfecto para agregar dulces, fresas, chocolates u otros productos disponibles."
  },
  {
    id: 6,
    nombre: "Domo decorado",
    precio: 40000,
    imagen: "assets/domo-grande-2.jpg",
    descripcion: "Un adicional bonito y llamativo para acompañar desayunos o anchetas."
  },
  {
    id: 7,
    nombre: "Parfait",
    precio: 18000,
    imagen: "assets/parfait-1.jpg",
    descripcion: "Una opción fresca y dulce para complementar el desayuno sorpresa."
  }
];

// Esta función da formato al precio, lo pasa de numero normal a pesos. asi que si hay un 35000 se muestra como $35.000
function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("es-CO");
}

// Esta función crea una tarjeta de producto.
function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "featured-addon-card";

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;

  const contenido = document.createElement("div");

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion;

  const precio = document.createElement("span");
  precio.textContent = formatearPrecio(producto.precio);

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "addon-add-btn";
  boton.textContent = "Agregar a mi pedido";


// Guardamos el id del producto en el botón, esto es para el carrito de compras, para saber qué producto se está agregando al pedido.
  boton.dataset.id = producto.id;

  contenido.appendChild(titulo);
  contenido.appendChild(descripcion);
  contenido.appendChild(precio);
  contenido.appendChild(boton);

  tarjeta.appendChild(imagen);
  tarjeta.appendChild(contenido);

  return tarjeta;
}

// Esta función muestra todos los productos dentro de la galería.
function mostrarProductosDestacados() {
  const contenedor = document.querySelector(".featured-addons-grid");

  if (contenedor == null) {
    return;
  }

  contenedor.innerHTML = "";

  productosDestacados.forEach(function(producto) {
    const tarjetaProducto = crearTarjetaProducto(producto);
    contenedor.appendChild(tarjetaProducto);
  });
}

// Cuando la página cargue, mostramos los productos.
document.addEventListener("DOMContentLoaded", function() {
  mostrarProductosDestacados();
});


// Dejamos el arreglo disponible para usarlo luego en el carrito.
window.productosDestacados = productosDestacados;