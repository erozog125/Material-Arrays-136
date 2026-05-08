// Arreglo de productos

const products = [
  {
    id: 1,
    name: "Extracto de Vainilla",
    price: 28000,
    image: "assets/images/vainilla.jpg",
    category: "Dulces",
    tag: "Nuevo"
  },
  {
    id: 2,
    name: "Extracto de Lavanda",
    price: 32000,
    image: "assets/images/lavanda.jpg",
    category: "Florales",
    tag: "Top"
  },
  {
    id: 3,
    name: "Extracto de Coco",
    price: 25000,
    image: "assets/images/coco.jpeg",
    category: "Dulces",
    tag: "Oferta"
  },
  {
    id: 4,
    name: "Extracto de Frutos Rojos",
    price: 38000,
    image: "assets/images/frutos-rojos.jpg",
    category: "Frutales",
    tag: "Premium"
  },
  {
    id: 5,
    name: "Extracto de Sándalo",
    price: 55000,
    image: "assets/images/sandalo.jpg",
    category: "Amaderados",
    tag: "Pro"
  },
  {
    id: 6,
    name: "Extracto Cítrico Andino",
    price: 30000,
    image: "assets/images/citrica.jpg",
    category: "Cítricos",
    tag: "Best"
  }
];

// Referencias del DOM
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const priceSelect = document.getElementById("price");
const summaryChip = document.querySelector(".summary-chip");

// Función para renderizar productos en el DOM
const renderProducts = (list) => {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";

  // Generar cada card
  list.forEach(({ id, name, price, image, category, tag }) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <span class="tag">${tag}</span>
      <div class="product-image">
        <img src="${image}" alt="${name}" loading="lazy" />
      </div>
      <h3>${name}</h3>
      <p class="category">${category}</p>
      <p class="rating">★★★★★</p>
      <div class="product-footer">
        <span class="price">COP $${price.toLocaleString("es-CO")}</span>
        <button class="add-btn" data-id="${id}">Agregar</button>
      </div>
    `;
    productsContainer.appendChild(card);
  });
};

// Función de filtrado combinado
const filterProducts = () => {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;
  const selectedPrice = priceSelect.value;

  const filtered = products.filter(({ name, category, price }) => {
    // Filtro por texto
    const matchesText = name.toLowerCase().includes(searchText);
    // Filtro por categoría
    const matchesCategory = selectedCategory === "Todas" || category === selectedCategory;
    // Filtro por precio (valores en COP)
    let matchesPrice = true;
    if (selectedPrice === "Menos de $30.000") matchesPrice = price < 30000;
    else if (selectedPrice === "$30.000 - $60.000") matchesPrice = price >= 30000 && price <= 60000;
    else if (selectedPrice === "Más de $60.000") matchesPrice = price > 60000;

    return matchesText && matchesCategory && matchesPrice;
  });

  // Actualizar DOM con productos filtrados
  renderProducts(filtered);

  // Actualizar contador de productos mostrados
  if (summaryChip) {
    summaryChip.textContent = `${filtered.length} extractos`;
  }
};

// Eventos para los filtros
if (searchInput) searchInput.addEventListener("input", filterProducts);
if (categorySelect) categorySelect.addEventListener("change", filterProducts);
if (priceSelect) priceSelect.addEventListener("change", filterProducts);

// Clase carrito de compras
class ShoppingCart {
  constructor() {
    // Cargar items guardados en localStorage
    this.items = this.loadFromStorage();
    this.updateDOM();
    this.setupEventListeners();
  }

  // Agregar un producto o aumentar su cantidad
  addProduct(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveToStorage();
    this.updateDOM();
  }

  // Eliminar un producto del carrito
  removeProduct(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
    this.updateDOM();
  }

  // Cambiar la cantidad de un producto
  changeQuantity(id, delta) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeProduct(id);
        return;
      }
    }
    this.saveToStorage();
    this.updateDOM();
  }

  // Calcular el subtotal
  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Guardar carrito en localStorage
  saveToStorage() {
    localStorage.setItem("carritoEsenciaAndina", JSON.stringify(this.items));
  }

  // Cargar carrito desde localStorage
  loadFromStorage() {
    const data = localStorage.getItem("carritoEsenciaAndina");
    return data ? JSON.parse(data) : [];
  }

  // Actualizar la vista del carrito en el DOM
  updateDOM() {
    const cartList = document.getElementById("cart-list");
    const cartCount = document.querySelector(".cart-count");
    const subtotalSpan = document.getElementById("cart-subtotal");
    const shippingSpan = document.getElementById("cart-shipping");
    const totalSpan = document.getElementById("cart-total");

    if (!cartList) return;

    // Actualizar contador de items
    cartCount.textContent = this.items.length;

    if (this.items.length === 0) {
      cartList.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
      subtotalSpan.textContent = "COP $0";
      shippingSpan.textContent = "COP $0";
      totalSpan.textContent = "COP $0";
      return;
    }

    // Renderizar items del carrito
    cartList.innerHTML = this.items.map(({ id, name, price, quantity, image }) => `
      <div class="cart-item">
        <div class="cart-emoji">
          <img src="${image}" alt="${name}" />
        </div>
        <div class="cart-info">
          <h4>${name}</h4>
          <p>COP $${price.toLocaleString("es-CO")} x ${quantity}</p>
        </div>
        <div class="qty-row">
          <div class="qty-controls">
            <button class="qty-btn" data-action="decrease" data-id="${id}">-</button>
            <strong>${quantity}</strong>
            <button class="qty-btn" data-action="increase" data-id="${id}">+</button>
          </div>
          <button class="remove-btn" data-action="remove" data-id="${id}">Eliminar</button>
        </div>
      </div>
    `).join("");

    // Calcular totales
    const subtotal = this.calculateTotal();
    // Envío: gratis si supera $50.000, de lo contrario $12.000
    const shipping = subtotal > 50000 ? 0 : 12000;
    subtotalSpan.textContent = `COP $${subtotal.toLocaleString("es-CO")}`;
    shippingSpan.textContent = `COP $${shipping.toLocaleString("es-CO")}`;
    totalSpan.textContent = `COP $${(subtotal + shipping).toLocaleString("es-CO")}`;
  }

  // Configurar eventos delegados para todo el carrito y los botones de agregar
  setupEventListeners() {
    document.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;

      // Botón "Agregar" desde el catálogo
      if (button.classList.contains("add-btn")) {
        const id = parseInt(button.dataset.id);
        const product = products.find(p => p.id === id);
        if (product) this.addProduct(product);
        return;
      }

      // Acciones dentro del carrito (aumentar, disminuir, eliminar)
      const { action, id } = button.dataset;
      if (!action) return;

      const productId = parseInt(id);
      if (action === "increase") this.changeQuantity(productId, 1);
      if (action === "decrease") this.changeQuantity(productId, -1);
      if (action === "remove") this.removeProduct(productId);
    });
  }
}

// Función para mostrar estadísticas y resumen en footer (nueva funcionalidad)
const showStatistics = () => {
  const activeProducts = products.filter(p => p.price > 0);

  const sortedProducts = activeProducts.toSorted((a, b) => a.price - b.price);

  const totalPrice = activeProducts.reduce((sum, p) => sum + p.price, 0);
  const average = totalPrice / activeProducts.length;

  const cheapest = sortedProducts[0];
  const costliest = sortedProducts[sortedProducts.length - 1];

  const safeSetText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  safeSetText("stat-count", activeProducts.length);
  safeSetText("stat-average", `COP $${average.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`);
  safeSetText("stat-cheapest", `${cheapest.name} (COP $${cheapest.price.toLocaleString("es-CO")})`);
  safeSetText("stat-costliest", `${costliest.name} (COP $${costliest.price.toLocaleString("es-CO")})`);
  safeSetText("stat-total-value", `COP $${totalPrice.toLocaleString("es-CO")}`);

  const sortedList = document.getElementById("stats-sorted-list");
  if (sortedList) {
    sortedList.innerHTML = sortedProducts.map(p =>
      `<li><span>${p.name}</span><span>COP $${p.price.toLocaleString("es-CO")}</span></li>`
    ).join("");
  }

  safeSetText("footer-summary", `${activeProducts.length} extractos · Precio promedio: COP $${average.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`);
};

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Renderizar todos los productos al cargar (solo en index y catálogo)
  if (productsContainer) {
    renderProducts(products);
  }

  // Instanciar el carrito (carga desde localStorage y se mantiene actualizado)
  const cart = new ShoppingCart();

  // Mostrar estadísticas y resumen
  showStatistics();

  // Agregar interactividad al botón "Finalizar compra"
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.items.length === 0) {
        alert("Tu carrito está vacío. Agrega algunos extractos antes de finalizar.");
      } else {
        alert("¡Gracias por tu compra! En breve recibirás un correo con los detalles.");
        // Vaciar carrito después de la compra
        cart.items = [];
        cart.saveToStorage();
        cart.updateDOM();
      }
    });
  }

  // Renderizado adicional para catalogo.html
  const catalogContainer = document.getElementById("catalog-container");
  if (catalogContainer) {
    renderProducts(products);
    const catalogCount = document.getElementById("catalog-count");
    if (catalogCount) catalogCount.textContent = `${products.length} extractos`;
  }
});