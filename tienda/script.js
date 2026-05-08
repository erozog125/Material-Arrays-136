const productos = [
    { id: 1,  nombre: "Nike Mercurial Vapor",  precio: 160, categoria: "futbol",      tag: "nuevo",   imagen: "img/" },
    { id: 2,  nombre: "Adidas Predator",       precio: 280, categoria: "futbol",      tag: "top",     imagen: "assets/predator.jpg" },
    { id: 3,  nombre: "Nike Air Zoom Pegasus", precio: 140, categoria: "running",     tag: "clasico", imagen: "assets/pegasus.jpg" },
    { id: 4,  nombre: "Hoka Clifton",          precio: 150, categoria: "running",     tag: "top",     imagen: "assets/clifton.jpg" },
    { id: 5,  nombre: "Brooks Ghost",          precio: 150, categoria: "running",     tag: "clasico", imagen: "assets/ghost.jpg" },
    { id: 6,  nombre: "Under Armour Curry",    precio: 160, categoria: "baloncesto",  tag: "nuevo",   imagen: "assets/curry.jpg" },
    { id: 7,  nombre: "Adidas Dame",           precio: 120, categoria: "baloncesto",  tag: "oferta",  imagen: "assets/dame.jpg" },
    { id: 8,  nombre: "Asics Sky Elite",       precio: 200, categoria: "voleibol",    tag: "top",     imagen: "assets/sky-elite.jpg" },
    { id: 9,  nombre: "Asics Sky Elite",       precio: 200, categoria: "voleibol",    tag: "nuevo",   imagen: "assets/sky-elite-2.jpg" },
    { id: 10, nombre: "Adidas Ultraboost",     precio: 190, categoria: "running",     tag: "oferta",  imagen: "assets/ultraboost.jpg" },
];

const COSTO_ENVIO = 24;

const elCatalogo        = document.getElementById("catalogo");
const elCarritoItems    = document.getElementById("carritoItems");
const elCarritoResumen  = document.getElementById("carritoResumen");
const elContador        = document.getElementById("carritoContador");
const elBadgeMovil      = document.getElementById("badgeMovil");
const elTotalProductos  = document.getElementById("totalProductos");
const elInputBuscar     = document.getElementById("inputBuscar");
const elSelectCat       = document.getElementById("selectCategoria");
const elSelectPrecio    = document.getElementById("selectPrecio");
const elBtnAbrirCarrito = document.getElementById("btnAbrirCarrito");
const elCarritoPanel    = document.getElementById("carrito-panel");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function guardarYRenderizar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    }

    function renderizarProductos(lista) {
    elTotalProductos.textContent = `${lista.length} productos`;

    if (lista.length === 0) {
        elCatalogo.innerHTML = `<p style="color:var(--color-muted);grid-column:1/-1">No se encontraron productos.</p>`;
        return;
    }

    elCatalogo.innerHTML = lista.map(p => `
        <div class="card">
        <img class="card-imagen" src="${p.imagen}" alt="${p.nombre}"
            onerror="this.src='https://placehold.co/400x300/e2e8f0/7a7a9d?text=Imagen'" />
        <div class="card-cuerpo">
            <span class="card-tag tag-${p.tag}">${p.tag.toUpperCase()}</span>
            <p class="card-nombre">${p.nombre}</p>
            <p class="card-precio">$${p.precio.toLocaleString()}</p>
            <button class="btn-agregar" data-id="${p.id}">
            <i class="fa-solid fa-cart-plus"></i> Agregar
            </button>
        </div>
        </div>
    `).join("");
    }

    function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: 1 });
    }

    guardarYRenderizar();
    }

    function cambiarCantidad(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => i.id !== id);
    }

    guardarYRenderizar();
    }

    function renderizarCarrito() {
    const totalItems = carrito.reduce((a, i) => a + i.cantidad, 0);
    const subtotal   = carrito.reduce((a, i) => a + i.precio * i.cantidad, 0);

    elContador.textContent    = totalItems;
    elBadgeMovil.textContent  = totalItems;

    if (carrito.length === 0) {
        elCarritoItems.innerHTML = `
        <div class="carrito-vacio">
            <i class="fa-solid fa-cart-shopping" style="font-size:2rem;margin-bottom:.5rem;opacity:.4"></i>
            <p>Tu carrito está vacío</p>
        </div>`;
        elCarritoResumen.innerHTML = "";
        return;
    }

    elCarritoItems.innerHTML = carrito.map(item => `
        <div class="carrito-item">
        <img class="carrito-item-img" src="${item.imagen}" alt="${item.nombre}"
            onerror="this.src='https://placehold.co/48x48/e2e8f0/7a7a9d?text=?'" />
        <div class="carrito-item-info">
            <p class="carrito-item-nombre">${item.nombre}</p>
            <p class="carrito-item-precio">$${item.precio.toLocaleString()} × ${item.cantidad}</p>
            <div class="carrito-controles">
            <button class="btn-cantidad btn-menos" data-id="${item.id}">−</button>
            <span class="cantidad-num">${item.cantidad}</span>
            <button class="btn-cantidad btn-mas"   data-id="${item.id}">+</button>
            <button class="btn-eliminar"           data-id="${item.id}">Eliminar</button>
            </div>
        </div>
        </div>
    `).join("");

    elCarritoResumen.innerHTML = `
        <div class="resumen-fila"><span>Subtotal</span><span>$${subtotal.toLocaleString()}</span></div>
        <div class="resumen-fila"><span>Envío</span><span>$${COSTO_ENVIO}</span></div>
        <div class="resumen-total"><span>Total</span><span>$${(subtotal + COSTO_ENVIO).toLocaleString()}</span></div>
        <button class="btn-finalizar">Finalizar compra</button>
    `;

    elCarritoResumen.querySelector(".btn-finalizar").addEventListener("click", () => {
        alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
        carrito = [];
        guardarYRenderizar();
    });
    }

    function filtrarProductos() {
    const busqueda  = elInputBuscar.value.toLowerCase().trim();
    const categoria = elSelectCat.value;
    const precio    = elSelectPrecio.value;

    const resultado = productos.filter(p => {
        const texto    = p.nombre.toLowerCase().includes(busqueda);
        const cat      = categoria === "todas" || p.categoria === categoria;
        const precioOk = precio === "bajo"  ? p.precio < 300
                    : precio === "medio" ? p.precio >= 300 && p.precio <= 600
                    : precio === "alto"  ? p.precio > 600
                    : true;
        return texto && cat && precioOk;
    });

    renderizarProductos(resultado);
    }

    elCatalogo.addEventListener("click", e => {
    const btn = e.target.closest(".btn-agregar");
    if (btn) agregarAlCarrito(Number(btn.dataset.id));
    });

    elCarritoItems.addEventListener("click", e => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains("btn-mas"))      cambiarCantidad(id, +1);
    if (e.target.classList.contains("btn-menos"))    cambiarCantidad(id, -1);
    if (e.target.classList.contains("btn-eliminar")) { carrito = carrito.filter(i => i.id !== id); guardarYRenderizar(); }
    });

    elInputBuscar.addEventListener("input",   filtrarProductos);
    elSelectCat.addEventListener("change",    filtrarProductos);
    elSelectPrecio.addEventListener("change", filtrarProductos);

    elBtnAbrirCarrito.addEventListener("click", () => elCarritoPanel.classList.toggle("abierto"));

    document.addEventListener("click", e => {
    if (elCarritoPanel.classList.contains("abierto") &&
        !elCarritoPanel.contains(e.target) &&
        e.target !== elBtnAbrirCarrito) {
        elCarritoPanel.classList.remove("abierto");
    }
    });

    renderizarProductos(productos);
    renderizarCarrito();