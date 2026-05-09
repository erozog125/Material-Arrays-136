const arrayProducts = [
  { id: 1, name: "Reloj", image: "./assets/images/reloj.jpg", description: "Reloj elegante", price: 300000 },
  { id: 2, name: "Phone", image: "./assets/images/phone.jpg", description: "Smartphone", price: 4000000 },
  { id: 3, name: "Laptop", image: "./assets/images/laptop.jpg", description: "Potente laptop", price: 2500000 },
  { id: 4, name: "Audífonos", image: "./assets/images/audifonos.jpg", description: "Bluetooth", price: 150000 },
  { id: 5, name: "Teclado", image: "./assets/images/teclado.jpg", description: "Mecánico", price: 200000 },
  { id: 6, name: "Mouse", image: "./assets/images/mouse.jpg", description: "Gaming", price: 100000 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= UI CART ================= */

const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");

document.getElementById("open-cart").addEventListener("click", () => {
  cartEl.classList.add("open");
  overlay.classList.remove("hidden");
});

document.getElementById("close-cart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function closeCart() {
  cartEl.classList.remove("open");
  overlay.classList.add("hidden");
}

/* ================= PRODUCTS ================= */

const renderProducts = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  arrayProducts.forEach(product => {
    main.appendChild(createCard(product));
  });
};

const createCard = (product) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h3>${product.name}</h3>
    <img src="${product.image}">
    <p>${product.description}</p>
    <span>$${product.price}</span>
    <button>Agregar</button>
  `;

  card.querySelector("button").addEventListener("click", () => addToCart(product));

  return card;
};

/* ================= CART LOGIC ================= */

const addToCart = (product) => {
  const item = cart.find(p => p.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
};

const changeQty = (id, value) => {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.quantity += value;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart();
  renderCart();
};

const renderCart = () => {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>$${item.price}</p>
      </div>

      <div class="qty-controls">
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="removeItem(${item.id})">x</button>
      </div>
    `;

    container.appendChild(div);
  });

  document.getElementById("cart-total").textContent = total;
  document.getElementById("cart-count").textContent = count;
};

const removeItem = (id) => {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
};

/* ================= STORAGE ================= */

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/* ================= INIT ================= */

window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});