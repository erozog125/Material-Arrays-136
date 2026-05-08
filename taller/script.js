// ARRAY DE PRODUCTOS

const products = [
  {
    id: 1,
    name: "Iphone ProMax",
    price: 4000000,
    category: "Nuevo",
    img: "./assets/iphone.jpg",
  },

  {
    id: 2,
    name: "Nike Air",
    price: 850000,
    category: "Oferta",
    img: "./assets/shoes.jpg",
  },

  {
    id: 3,
    name: "Macbook Pro",
    price: 7200000,
    category: "Premium",
    img: "./assets/laptop.jpg",
  },

  {
    id: 4,
    name: "Audífonos Sony",
    price: 1200000,
    category: "Nuevo",
    img: "./assets/headphones.jpg",
  },

  {
    id: 5,
    name: "Teclado Gamer",
    price: 450000,
    category: "Oferta",
    img: "./assets/keyboard.jpg",
  },

  {
    id: 6,
    name: "Apple Watch",
    price: 1800000,
    category: "Premium",
    img: "./assets/watch.jpg",
  },
];

// CARRITO

// Recuperar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// FUNCIÓN PARA CREAR CARDS

const makeCard = (product) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // Badge
  const badge = document.createElement("div");
  badge.classList.add("badge");
  badge.textContent = product.category;

  // Imagen
  const imgProduct = document.createElement("img");
  imgProduct.src = product.img;
  imgProduct.alt = product.name;

  // Contenido
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  // Título
  const tituloProduct = document.createElement("h3");
  tituloProduct.textContent = product.name;

  // Precio
  const priceProduct = document.createElement("div");
  priceProduct.classList.add("price");

  const span = document.createElement("span");
  span.textContent = `$${product.price.toLocaleString()}`;

  priceProduct.appendChild(span);

  // Botón
  const buttonProduct = document.createElement("button");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-cart-plus");

  buttonProduct.appendChild(icon);
  buttonProduct.innerHTML += " Agregar";

  // Evento agregar carrito
  buttonProduct.addEventListener("click", () => {
    addToCart(product);
  });

  // Append
  card.appendChild(badge);
  card.appendChild(imgProduct);
  card.appendChild(cardContent);

  cardContent.appendChild(tituloProduct);
  cardContent.appendChild(priceProduct);
  cardContent.appendChild(buttonProduct);

  document.querySelector(".products-grid").appendChild(card);
};

// RENDER PRODUCTOS

const renderProducts = () => {
  document.querySelector(".products-grid").innerHTML = "";

  products.forEach((product) => {
    makeCard(product);
  });
};

// AGREGAR AL CARRITO
const addToCart = (product) => {
  // Buscar si existe
  const existingProduct = cart.find((item) => item.id === product.id);

  // Si existe aumentar cantidad
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    // Si no existe agregar nuevo
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
  renderCart();
};

// ==========================
// RENDER CARRITO
// ==========================

const renderCart = () => {
  const cartContainer = document.querySelector(".cart-items");

  cartContainer.innerHTML = "";

  cart.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${product.img}" alt="${product.name}">

      <div class="item-info">
        <h4>${product.name}</h4>

        <p>$${product.price.toLocaleString()}</p>

        <span class="quantity">
          Cantidad: ${product.quantity}
        </span>
      </div>

      <button class="remove-btn">
        X
      </button>
    `;

    // Eliminar producto
    const removeBtn = cartItem.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {
      removeFromCart(product.id);
    });

    cartContainer.appendChild(cartItem);
  });

  updateTotal();
  updateCartCount();
};

// ==========================
// ELIMINAR PRODUCTO
// ==========================

const removeFromCart = (id) => {
  cart = cart.filter((product) => product.id !== id);

  saveCart();
  renderCart();
};

// ==========================
// ACTUALIZAR TOTAL
// ==========================

// Función para calcular el costo total
const updateTotal = () => {
  const total = cart.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);

  document.querySelector("#cart-total").textContent =
    `$${total.toLocaleString()}`;
};

// ==========================
// ACTUALIZAR CONTADOR
// ==========================

// Función para actualizar el contador del carrito
const updateCartCount = () => {
  const totalItems = cart.reduce((accumulator, product) => {
    return accumulator + product.quantity;
  }, 0);

  document.querySelector(".cart-count").textContent = totalItems;
};

// ==========================
// GUARDAR EN LOCAL STORAGE
// ==========================

// Función para persistir carrito
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ==========================
// INICIALIZAR APP
// ==========================

window.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  renderCart();
});
