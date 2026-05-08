// Arreglo de productos
const productos = [
  {
    id: 1,
    nombre: "Extracto de Vainilla",
    precio: 28000,
    imagen: "assets/images/vainilla.jpg",
    categoria: "Dulces",
    etiqueta: "Nuevo"
  },
  {
    id: 2,
    nombre: "Extracto de Lavanda",
    precio: 32000,
    imagen: "assets/images/lavanda.jpg",
    categoria: "Florales",
    etiqueta: "Top"
  },
  {
    id: 3,
    nombre: "Extracto de Coco",
    precio: 25000,
    imagen: "assets/images/coco.jpg",
    categoria: "Dulces",
    etiqueta: "Oferta"
  },
  {
    id: 4,
    nombre: "Extracto de Frutos Rojos",
    precio: 38000,
    imagen: "assets/images/frutos-rojos.jpg",
    categoria: "Frutales",
    etiqueta: "Premium"
  },
  {
    id: 5,
    nombre: "Extracto de Sándalo",
    precio: 55000,
    imagen: "assets/images/sandalo.jpg",
    categoria: "Amaderados",
    etiqueta: "Pro"
  },
  {
    id: 6,
    nombre: "Extracto Cítrico Andino",
    precio: 30000,
    imagen: "assets/images/citrica.jpg",
    categoria: "Cítricos",
    etiqueta: "Best"
  }
];

// Función para renderizar productos del DOM
const contenedorProductos = document.getElementById("products-container");

const renderizarProductos = (lista) => {
  contenedorProductos.innerHTML = "";
  lista.forEach(({ id, nombre, precio, imagen, categoria, etiqueta }) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <span class="tag">${etiqueta}</span>
      <div class="product-image">
        <img src="${imagen}" alt="${nombre}" loading="lazy" />
      </div>
      <h3>${nombre}</h3>
      <p class="category">${categoria}</p>
      <p class="rating">★★★★★</p>
      <div class="product-footer">
        <span class="price">$${precio}</span>
        <button class="add-btn" data-id="${id}">Agregar</button>
      </div>
    `;
    contenedorProductos.appendChild(card);
  });
};

// Renderizado inicial con todos los productos
renderizarProductos(productos);

// Referencias a los Controles
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const priceSelect = document.getElementById("price");
const summaryChip = document.querySelector(".summary-chip");

// Función de Filtrado combinado
const filtrarProductos = () => {
  const texto = searchInput.value.toLowerCase().trim();
  const categoria = categorySelect.value;
  const precio = priceSelect.value;

  const filtrados = productos.filter(({ nombre, categoria: cat, precio: p }) => {
    const coincideTexto = nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "Todas" || cat === categoria;
    let coincidePrecio = true;
    if (precio === "Menos de $30,000") coincidePrecio = p < 30000;
    else if (precio === "$30,000 - $60,000") coincidePrecio = p >= 30000 && p <= 60000;
    else if (precio === "Más de $60,000") coincidePrecio = p > 60000;
    return coincideTexto && coincideCategoria && coincidePrecio;
  });

  renderizarProductos(filtrados);
  summaryChip.textContent = `${filtrados.length} extractos`;
};

// Event listeners para filtros
searchInput.addEventListener("input", filtrarProductos);
categorySelect.addEventListener("change", filtrarProductos);
priceSelect.addEventListener("change", filtrarProductos);