// Arreglo de productos
const productos = [
  {
    id: 1,
    nombre: "Extracto de Vainilla",
    precio: 28,
    imagen: "assets/images/vainilla.jpg",
    categoria: "Dulces",
    etiqueta: "Nuevo"
  },
  {
    id: 2,
    nombre: "Extracto de Lavanda",
    precio: 32,
    imagen: "assets/images/lavanda.jpg",
    categoria: "Florales",
    etiqueta: "Top"
  },
  {
    id: 3,
    nombre: "Extracto de Coco",
    precio: 25,
    imagen: "assets/images/coco.jpg",
    categoria: "Dulces",
    etiqueta: "Oferta"
  },
  {
    id: 4,
    nombre: "Extracto de Frutos Rojos",
    precio: 38,
    imagen: "assets/images/frutos-rojos.jpg",
    categoria: "Frutales",
    etiqueta: "Premium"
  },
  {
    id: 5,
    nombre: "Extracto de Sándalo",
    precio: 55,
    imagen: "assets/images/sandalo.jpg",
    categoria: "Amaderados",
    etiqueta: "Pro"
  },
  {
    id: 6,
    nombre: "Extracto Cítrico Andino",
    precio: 30,
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