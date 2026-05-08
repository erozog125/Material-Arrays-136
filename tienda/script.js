const products = [
    { id: 1, nombre: "Teclado Mecánico RGB", categoria: "teclado", precio: 89.99, stock: 12, rating: 4, imagen: "https://cdn-icons-png.flaticon.com/512/2972/2972286.png", descripcion: "Switch azul, retroiluminación LED personalizable, diseño compacto." },
    { id: 2, nombre: "Mouse Gamer Pro", categoria: "mouse", precio: 49.99, stock: 20, rating: 5, imagen: "https://cdn-icons-png.flaticon.com/512/3163/3163478.png", descripcion: "Sensor óptico 16000 DPI, 6 botones, ergonómico." },
    { id: 3, nombre: "Headset 7.1 Surround", categoria: "headset", precio: 79.99, stock: 8, rating: 4, imagen: "https://cdn-icons-png.flaticon.com/512/2972/2972342.png", descripcion: "Audio envolvente, micrófono removible, diadema ajustable." },
    { id: 4, nombre: "Mousepad XXL", categoria: "mousepad", precio: 29.99, stock: 25, rating: 3, imagen: "https://cdn-icons-png.flaticon.com/512/3163/3163522.png", descripcion: "Superficie suave, base antideslizante, 90x40cm." },
    { id: 5, nombre: "Silla Gamer Ergo", categoria: "silla", precio: 299.99, stock: 5, rating: 5, imagen: "https://cdn-icons-png.flaticon.com/512/2972/2972350.png", descripcion: "Soporte lumbar, reposabrazos 4D, material transpirable." },
    { id: 6, nombre: "Monitor 27\" 144Hz", categoria: "monitor", precio: 349.99, stock: 7, rating: 4, imagen: "https://cdn-icons-png.flaticon.com/512/3659/3659896.png", descripcion: "Pantalla IPS, 144Hz, 1ms, FreeSync." },
    { id: 7, nombre: "Tira LED RGB", categoria: "led", precio: 19.99, stock: 30, rating: 4, imagen: "https://cdn-icons-png.flaticon.com/512/3388/3388945.png", descripcion: "5 metros, control remoto, 16 colores." },
    { id: 8, nombre: "Teclado TKL Alámbrico", categoria: "teclado", precio: 59.99, stock: 15, rating: 3, imagen: "https://cdn-icons-png.flaticon.com/512/2972/2972286.png", descripcion: "Teclas silenciosas, diseño compacto, retroiluminación blanca." },
    { id: 9, nombre: "Mouse Inalámbrico Ultraligero", categoria: "mouse", precio: 69.99, stock: 10, rating: 5, imagen: "https://cdn-icons-png.flaticon.com/512/3163/3163478.png", descripcion: "60g, batería 70h, sensor Hero." },
    { id: 10, nombre: "Headset con micrófono", categoria: "headset", precio: 39.99, stock: 18, rating: 2, imagen: "https://cdn-icons-png.flaticon.com/512/2972/2972342.png", descripcion: "Cómodo, sonido estéreo, cable trenzado." },
    { id: 11, nombre: "Mousepad RGB", categoria: "mousepad", precio: 39.99, stock: 14, rating: 4, imagen: "https://cdn-icons-png.flaticon.com/512/3163/3163522.png", descripcion: "Iluminación RGB, superficie de tela, 80x30cm." },
    { id: 12, nombre: "Monitor 24\" 75Hz", categoria: "monitor", precio: 179.99, stock: 9, rating: 3, imagen: "https://cdn-icons-png.flaticon.com/512/3659/3659896.png", descripcion: "Full HD, 75Hz, IPS, ideal para gaming casual." }
];

// ─── ESTADO GLOBAL ───
let cart = [];
let loggedUser = null;

// ─── REFERENCIAS DOM ───
const grid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cart-count');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalCloseBtn');
const loginBtn = document.getElementById('loginBtn');

// ─── FUNCIONES AUXILIARES ───
function renderStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatPrice(price) {
    return '$' + price.toFixed(2);
}

function getStockText(stock) {
    if (stock <= 0) return 'Agotado';
    if (stock < 5) return 'Quedan ' + stock;
    return 'En stock';
}

// ─── RENDERIZAR PRODUCTOS ───
function renderProducts(filteredProducts = products) {
    grid.innerHTML = '';
    filteredProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
            <h3>${p.nombre}</h3>
            <span class="category-badge">${p.categoria}</span>
            <div class="stars">${renderStars(p.rating)}</div>
            <div class="price">${formatPrice(p.precio)}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">${getStockText(p.stock)}</div>
            <div class="card-actions">
                <button class="btn-sm accent add-cart" data-id="${p.id}">➕ Agregar</button>
                <button class="btn-sm outline detail-view" data-id="${p.id}">📄 Detalles</button>
            </div>
        `;
        grid.appendChild(card);
    });
    // Eventos dinámicos
    document.querySelectorAll('.add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        });
    });
    document.querySelectorAll('.detail-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            showDetails(id);
        });
    });
}

// ─── FILTRADO Y BÚSQUEDA ───
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    let filtered = products.filter(p => {
        // Búsqueda por nombre o categoría
        const matchSearch = p.nombre.toLowerCase().includes(searchTerm) || p.categoria.toLowerCase().includes(searchTerm);
        if (!matchSearch) return false;

        // Filtro categoría
        if (category !== 'todas' && p.categoria !== category) return false;

        // Filtro precio
        if (priceRange !== 'todas') {
            const price = p.precio;
            if (priceRange === '0-50' && (price < 0 || price > 50)) return false;
            if (priceRange === '50-100' && (price < 50 || price > 100)) return false;
            if (priceRange === '100-200' && (price < 100 || price > 200)) return false;
            if (priceRange === '200+' && price <= 200) return false;
        }
        return true;
    });
    renderProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

// ─── CARRITO ───
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    if (product.stock <= 0) {
        showModal(`<p style="color:#ff6b6b;">❌ ${product.nombre} está agotado.</p>`);
        return;
    }
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    showModal(`<p style="color:#69db7c;">✔️ ${product.nombre} agregado al carrito</p>`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderCartModal(); // refresca si el modal está abierto
}

function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
    localStorage.setItem('nexusCart', JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
}

function renderCartModal() {
    if (cart.length === 0) {
        modalBody.innerHTML = `<div class="empty-cart-msg">🛒 Tu carrito está vacío</div>`;
        return;
    }
    let html = `<h2>🛍️ Tu carrito</h2>`;
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <div>${formatPrice(item.precio)} x ${item.quantity}</div>
                </div>
                <button class="btn-remove" data-id="${item.id}">✕</button>
            </div>
        `;
    });
    html += `<div class="cart-total"><span>Total</span><span>${formatPrice(getCartTotal())}</span></div>`;
    modalBody.innerHTML = html;
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
        });
    });
}

// ─── DETALLES DE PRODUCTO (MODAL) ───
function showDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const html = `
        <div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center;">
            <img src="${product.imagen}" alt="${product.nombre}" style="width:180px;object-fit:contain;background:#1a1f28;border-radius:16px;padding:10px;">
            <div style="flex:1;">
                <h2>${product.nombre}</h2>
                <span class="category-badge">${product.categoria}</span>
                <div class="stars" style="font-size:1.2rem;">${renderStars(product.rating)}</div>
                <p style="color:var(--text-secondary);margin:0.8rem 0;">${product.descripcion}</p>
                <div style="font-size:2rem;font-weight:700;color:var(--accent-glow);">${formatPrice(product.precio)}</div>
                <div style="margin-top:0.5rem;color:var(--text-secondary);">${getStockText(product.stock)}</div>
                <button class="btn-primary add-cart" data-id="${product.id}" style="margin-top:1rem;">Agregar al carrito</button>
            </div>
        </div>
    `;
    modalBody.innerHTML = html;
    openModal();
    modalBody.querySelector('.add-cart')?.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
        closeModal();
    });
}

// ─── MODAL ───
function openModal() {
    modalOverlay.classList.add('active');
}
function closeModal() {
    modalOverlay.classList.remove('active');
}
function showModal(htmlContent) {
    modalBody.innerHTML = htmlContent;
    openModal();
    setTimeout(() => closeModal(), 1800);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// ─── LOGIN ───
function renderLoginForm() {
    if (loggedUser) {
        modalBody.innerHTML = `
            <h2>👋 Bienvenido, ${loggedUser}</h2>
            <p style="color:var(--text-secondary);">Has iniciado sesión correctamente.</p>
            <button class="btn-primary" id="logoutBtn" style="margin-top:1rem;">Cerrar sesión</button>
        `;
        openModal();
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            loggedUser = null;
            localStorage.removeItem('nexusUser');
            renderLoginForm();
            closeModal();
        });
        return;
    }
    const html = `
        <h2>🔐 Iniciar sesión</h2>
        <div class="login-form">
            <label>Usuario</label>
            <input type="text" id="loginUser" placeholder="Tu usuario">
            <label>Correo</label>
            <input type="email" id="loginEmail" placeholder="correo@ejemplo.com">
            <label>Contraseña</label>
            <input type="password" id="loginPassword" placeholder="••••••••">
            <div id="loginError" class="login-error"></div>
            <button class="btn-primary" id="loginSubmit" style="margin-top:1.2rem;width:100%;">Entrar</button>
        </div>
    `;
    modalBody.innerHTML = html;
    openModal();

    document.getElementById('loginSubmit').addEventListener('click', () => {
        const user = document.getElementById('loginUser').value.trim();
        const email = document.getElementById('loginEmail').value.trim();
        const pass = document.getElementById('loginPassword').value.trim();
        const errorDiv = document.getElementById('loginError');

        if (!user || !email || !pass) {
            errorDiv.textContent = '❌ Todos los campos son obligatorios.';
            return;
        }
        if (!email.includes('@')) {
            errorDiv.textContent = '❌ Correo inválido.';
            return;
        }
        if (pass.length < 3) {
            errorDiv.textContent = '❌ Contraseña demasiado corta.';
            return;
        }
        // Login exitoso
        loggedUser = user;
        localStorage.setItem('nexusUser', JSON.stringify({ user, email }));
        errorDiv.style.color = '#69db7c';
        errorDiv.textContent = '✅ Inicio de sesión exitoso. Bienvenido ' + user + '!';
        setTimeout(() => {
            closeModal();
            // Mostrar mensaje de bienvenida
            showModal(`<p style="color:#69db7c;font-size:1.2rem;">🎉 ¡Bienvenido, ${user}!</p>`);
        }, 600);
    });
}

loginBtn.addEventListener('click', renderLoginForm);

// ─── EVENTO COMPRAR AHORA (Hero) ───
document.getElementById('heroShopBtn').addEventListener('click', () => {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
});

// ─── CARRITO MODAL ───
cartBtn.addEventListener('click', () => {
    renderCartModal();
    openModal();
});

// ─── INICIALIZAR ───
// Cargar carrito desde localStorage
const savedCart = localStorage.getItem('nexusCart');
if (savedCart) {
    try {
        cart = JSON.parse(savedCart);
        updateCartUI();
    } catch (e) { cart = []; }
}
// Cargar usuario desde localStorage
const savedUser = localStorage.getItem('nexusUser');
if (savedUser) {
    try {
        const parsed = JSON.parse(savedUser);
        loggedUser = parsed.user;
    } catch (e) { loggedUser = null; }
}

renderProducts();
filterProducts(); // asegura que los filtros se apliquen desde el inicio

// Navegación suave (Inicio, Productos, etc.)
document.querySelectorAll('[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        const section = e.target.dataset.section;
        if (section === 'inicio') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (section === 'productos') {
            document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'categorias') {
            document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
            categoryFilter.focus();
        }
    });
});