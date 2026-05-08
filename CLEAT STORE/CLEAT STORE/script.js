// Agregar arriba junto a las referencias del DOM:
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const sampleItem = document.querySelector(".sample-item");

const productList = document.getElementById("product-list");
productList.innerHTML = "";

const products = [
  { id:1, nombre:"Guayos F50 Amarillos",  marca:"Adidas", precio:519950, imagen:"Assets/guayo-amarillo.avif" },
  { id:2, nombre:"Guayos Nike Negros",     marca:"Nike",   precio:339950, imagen:"Assets/guayo-nike-negro.webp" },
  { id:3, nombre:"Guayos Mbappé",          marca:"Nike",   precio:199950, imagen:"Assets/guayo-mbappe.webp" },
  { id:4, nombre:"Guayos Nike Blancos",    marca:"Nike",   precio:299950, imagen:"Assets/guayo-nike.webp" },
  { id:5, nombre:"Guayos CR7",             marca:"Nike",   precio:229950, imagen:"Assets/guayos-cr7.jpg" },
  { id:6, nombre:"Guayos Lamine Yamal",    marca:"Adidas", precio:519950, imagen:"Assets/guayos-lamine.avif" },
];

products.forEach(producto => {
  const card = document.createElement("article");
  card.classList.add("product-card");
  card.setAttribute("role", "listitem");

  card.innerHTML = `
    <div class="card-image-wrap">
      <img class="card-img" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
    </div>
    <div class="card-body">
      <span class="card-brand">${producto.marca}</span>
      <h3 class="card-name">${producto.nombre}</h3>
      <div class="card-footer">
        <p class="card-price">$${producto.precio.toLocaleString("es-CO")}</p>
        <button class="btn-add" type="button">+ Agregar</button>
      </div>
    </div>
  `;

  productList.appendChild(card);
});


// Al inicio del archivo, después de productList:
const carrito = [];

// Dentro del forEach, antes de productList.appendChild(card):
const btnAgregar = card.querySelector(".btn-add");
btnAgregar.addEventListener("click", () => {
  const productoExistente = carrito.find(item => item.id === producto.id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  // Reemplazar console.log por:
  renderCarrito();
});



// Agregar al final del archivo:
function renderCarrito() {
  cartItems.innerHTML = "";
  if (sampleItem) sampleItem.style.display = "none";

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <div class="item-img-wrap">
        <img src="${item.imagen}" alt="${item.nombre}" class="item-thumb" />
      </div>
      <div class="item-info">
        <span class="item-brand">${item.marca}</span>
        <span class="item-name">${item.nombre}</span>
        <span class="item-qty">× ${item.cantidad}</span>
      </div>
      <div class="item-right">
        <span class="item-subtotal">$${(item.precio * item.cantidad).toLocaleString("es-CO")}</span>
      </div>
    `;

    cartItems.appendChild(li);
  });

  calcularTotal();
}

// Función para calcular el total de la compra
function calcularTotal() {
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  cartTotal.textContent = `$${total.toLocaleString("es-CO")}`;
}