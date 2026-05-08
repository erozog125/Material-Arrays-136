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

// Clase Carrito de Compras
class Carrito {
constructor() {
  this.items = this.cargarDeStorage();
  this.initEventListeners();
  this.actualizarDOM();
}

// Guardar en localStorage
guardarEnStorage() {
  localStorage.setItem("carritoEsenciaAndina", JSON.stringify(this.items));
}

// Cargar desde localStorage
cargarDeStorage() {
  const datos = localStorage.getItem("carritoEsenciaAndina");
  return datos ? JSON.parse(datos) : [];
}

  // Agregar producto o aumentar cantidad
  agregarProducto(producto) {
    const existente = this.items.find(item => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.items.push({ ...producto, cantidad: 1 });
    }
      this.guardarEnStorage();
      this.actualizarDOM();
  }

  // Eliminar producto por id
  eliminarProducto(id) {
    this.items = this.items.filter(item => item.id !== id);
      this.guardarEnStorage();
      this.actualizarDOM();
  }

  // Actualizar cantidad (aumentar/disminuir)
  cambiarCantidad(id, delta) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.cantidad += delta;
      if (item.cantidad <= 0) {
        this.eliminarProducto(id);
        return;
      }
    }
      this.guardarEnStorage();
      this.actualizarDOM();
  }

  // Calcular total
  calcularTotal() {
    return this.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  // Renderizar carrito en el DOM
  actualizarDOM() {
    const cartList = document.getElementById("cart-list");
    const cartCount = document.querySelector(".cart-count");
    const subtotalSpan = document.getElementById("cart-subtotal");
    const totalSpan = document.getElementById("cart-total");

    cartCount.textContent = this.items.length;

    if (this.items.length === 0) {
      cartList.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
      subtotalSpan.textContent = "$0";
      totalSpan.textContent = "$0";
      return;
    }

    cartList.innerHTML = this.items.map(({ id, nombre, precio, cantidad, imagen }) => `
      <div class="cart-item">
        <div class="cart-emoji"><img src="${imagen}" alt="${nombre}" style="width:100%;height:100%;object-fit:cover;border-radius:12px" /></div>
        <div class="cart-info">
          <h4>${nombre}</h4>
          <p>$${precio} x ${cantidad}</p>
        </div>
        <div class="qty-row">
          <div class="qty-controls">
            <button class="qty-btn" data-action="decrease" data-id="${id}">-</button>
            <strong>${cantidad}</strong>
            <button class="qty-btn" data-action="increase" data-id="${id}">+</button>
          </div>
          <button class="remove-btn" data-action="remove" data-id="${id}">Eliminar</button>
        </div>
      </div>
    `).join("");

    const subtotal = this.calcularTotal();
    const envio = subtotal > 50 ? 0 : 12;
    document.getElementById("cart-subtotal").textContent = `$${subtotal}`;
    document.getElementById("cart-shipping").textContent = `$${envio}`;
    document.getElementById("cart-total").textContent = `$${subtotal + envio}`;
  }

  // Configurar event listeners delegados
  initEventListeners() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      // Si es un botón de agregar desde el catálogo
      if (btn.classList.contains("add-btn")) {
        const id = parseInt(btn.dataset.id);
        const producto = productos.find(p => p.id === id);
        if (producto) this.agregarProducto(producto);
      }

      // Si es un botón dentro del carrito
      const action = btn.dataset.action;
      const id = parseInt(btn.dataset.id);
      if (action === "increase") this.cambiarCantidad(id, 1);
      if (action === "decrease") this.cambiarCantidad(id, -1);
      if (action === "remove") this.eliminarProducto(id);
    });
  }
}

// Instanciar el carrito
const carrito = new Carrito();