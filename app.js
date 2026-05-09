const arrayProducts = [
  {
    id: 1,
    name: "Reloj",
    image: "./assets/images/reloj.jpg",
    description: "Esto es un reloj",
    price: 300000,
  },
  {
    id: 2,
    name: "Phone",
    image: "./assets/images/phone.jpg",
    description: "Esto es un teléfono",
    price: 4000000,
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   RENDER PRODUCTOS
========================= */
const renderProducts = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  arrayProducts.forEach((product) => {
    main.appendChild(makeCard(product));
  });
};

/* =========================
   CREAR CARD
========================= */
const makeCard = (product) => {
  const cardProduct = document.createElement("div");
  cardProduct.classList.add("card");

  const titleProduct = document.createElement("h3");
  const imageProduct = document.createElement("img");
  const descriptionProduct = document.createElement("p");
  const priceProduct = document.createElement("span");
  const buttonCard = document.createElement("button");

  titleProduct.textContent = product.name;
  imageProduct.src = product.image;
  descriptionProduct.textContent = product.description;
  priceProduct.textContent = `$${product.price}`;
  buttonCard.textContent = "Agregar";

  buttonCard.addEventListener("click", () => addToCart(product));

  cardProduct.append(
    titleProduct,
    imageProduct,
    descriptionProduct,
    priceProduct,
    buttonCard,
  );

  return cardProduct;
};

/* =========================
   AGREGAR AL CARRITO
========================= */
const addToCart = (product) => {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
};

/* =========================
   ELIMINAR PRODUCTO
========================= */
const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartUI();
};

/* =========================
   TOTAL
========================= */
const calculateTotal = () => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

/* =========================
   UI DEL CARRITO
========================= */
const updateCartUI = () => {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = calculateTotal();
};

/* =========================
   LOCALSTORAGE
========================= */
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/* =========================
   INIT
========================= */
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
});
