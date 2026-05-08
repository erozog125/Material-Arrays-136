// ── 1. DATOS ─────────────────────────────────
// Arreglo de objetos con los 6 productos de la tienda.
// Cada objeto contiene id, nombre, precio e imagen (ruta local en /assets)
const productos = [
  { id: 1, nombre: "Jarrón Escandinavo Dorado",     precio: 1920000,  imagen: "assets/img_jarron.png" },
  { id: 2, nombre: "Lámpara Moderna Minimalista",   precio: 4960000,  imagen: "assets/img_lampara.png" },
  { id: 3, nombre: "Vela Aromática Premium",        precio: 780000,   imagen: "assets/img_vela.png" },
  { id: 4, nombre: "Espejo Decorativo Circular",    precio: 3500000,  imagen: "assets/img_espejo.png" },
  { id: 5, nombre: "Escultura Abstracta de Mármol", precio: 10400000, imagen: "assets/img_escultura.png" },
  { id: 6, nombre: "Bandeja Decorativa de Lujo",    precio: 1360000,  imagen: "assets/img_bandeja.png" },
];


// ── 2. RENDERIZADO DINÁMICO ───────────────────
// Función para recorrer el arreglo de productos y generar
// dinámicamente las cards de cada producto en el DOM
function renderProductos() {
  const grid = document.querySelector(".product-grid");
  grid.innerHTML = "";

  productos.forEach(producto => {
    grid.innerHTML += `
      <article class="product-card">
        <div class="product-img-wrap">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img" />
        </div>
        <div class="product-info">
          <h3 class="product-name">${producto.nombre}</h3>
          <div class="product-footer">
            <span class="product-price">
              ${producto.precio.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0
              })}
            </span>
            <button class="btn btn-cart" data-id="${producto.id}">
              Agregar al carrito
            </button>
          </div>
        </div>
      </article>
    `;
  });
}


// ── INICIAR ───────────────────────────────────
renderProductos();