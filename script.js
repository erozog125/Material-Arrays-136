// ============================================================
// FUENTE DE DATOS: Arreglo de objetos con los productos
// Cada objeto tiene id, nombre, precio e imagen
// ============================================================
const productos = [
    { id: 1,  nombre: "Ducati Panigale V4",        precio: 24495, imagen: "/img/Ducati Panigale V4.jpg" },
    { id: 2,  nombre: "Yamaha YZF-R1",              precio: 17999, imagen: "/img/Yamaha YZF-R1.jpg" },
    { id: 3,  nombre: "Kawasaki Ninja H2",           precio: 31500, imagen: "/img/Kawasaki Ninja H2.jpg" },
    { id: 4,  nombre: "BMW S 1000 RR",               precio: 16995, imagen: "/img/BMW S 1000 RR.jpg" },
    { id: 5,  nombre: "Honda CBR1000RR-R Fireblade", precio: 28900, imagen: "/img/Honda CBR1000RR-R Fireblade.jpg" },
    { id: 6,  nombre: "Ducati Streetfighter V4",     precio: 20895, imagen: "/img/Ducati Streetfighter V4.jpg" },
    { id: 7,  nombre: "Yamaha MT-10",                precio: 14199, imagen: "/img/Yamaha MT-10.jpg" },
    { id: 8,  nombre: "Kawasaki Ninja ZX-10R",       precio: 17399, imagen: "/img/Kawasaki Ninja ZX-10R.jpg" },
    { id: 9,  nombre: "Suzuki GSX-R1000R",           precio: 18299, imagen: "/img/Suzuki GSX-R1000R.jpg" },
    { id: 10, nombre: "Aprilia RSV4 Factory",         precio: 25999, imagen: "/img/Aprilia RSV4 Factory.jpg" },
    { id: 11, nombre: "Triumph Daytona Moto2 765",    precio: 17500, imagen: "/img/Triumph Daytona Moto2 765.jpg" },
    { id: 12, nombre: "Yamaha YZF-R6",               precio: 12199, imagen: "/img/Yamaha YZF-R6.jpg" },
    { id: 13, nombre: "KTM 1290 Super Duke R",        precio: 19599, imagen: "/img/KTM 1290 Super Duke R.jpg" },
    { id: 14, nombre: "MV Agusta F4",                precio: 22000, imagen: "/img/MV Agusta F4.jpg" },
    { id: 15, nombre: "BMW M 1000 RR",               precio: 32495, imagen: "/img/BMW M 1000 RR.jpg" },
    { id: 16, nombre: "Ducati Panigale V2",           precio: 17395, imagen: "/img/Ducati Panigale V2.jpg" },
    { id: 17, nombre: "Yamaha MT-09 SP",              precio: 11499, imagen: "/img/Yamaha-MT-09-SP.webp" },
    { id: 18, nombre: "Kawasaki Z H2",               precio: 18500, imagen: "/img/Kawasaki Z H2.jpg" },
    { id: 19, nombre: "Suzuki Hayabusa",              precio: 18799, imagen: "/img/Suzuki Hayabusa.jpg" },
    { id: 20, nombre: "Honda CBR600RR",              precio: 11999, imagen: "/img/Honda CBR600RR.jpg" },
];

// Selector del contenedor del grid
const productGrid = document.querySelector('#product-list');
// ============================================================
// SELECTORES DEL DOM — carrito y botones de acción
// ============================================================
const cartBadge        = document.querySelector('#cart-count');
const cartItemsWrapper = document.querySelector('#cart-items');
const cartTotalDisplay = document.querySelector('#cart-total');
const btnEmptyCart     = document.querySelector('#btn-empty');
const btnBuy           = document.querySelector('#btn-buy');
const cartTrigger      = document.querySelector('.cart-trigger');
const cartSidebar      = document.querySelector('.cart-sidebar');

actualizarCarritoDOM(); // Mostrar estado inicial del carrito

// ============================================================
// FUNCIÓN: Actualizar el DOM del carrito
// Recorre el array carrito y construye la lista visual
// También actualiza el badge y el total en tiempo real
// ============================================================
const actualizarCarritoDOM = () => {
    // Actualizar número del badge con el total de unidades
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartBadge.textContent = totalItems;

    // Si el carrito está vacío, mostrar estado vacío y salir
    if (carrito.length === 0) {
        cartItemsWrapper.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="#475569" stroke-width="1.5">
                    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>No tienes motos seleccionadas.</p>
            </div>`;
        cartTotalDisplay.textContent = '0';
        return;
    }

    // Construir HTML de los items y calcular el total
    cartItemsWrapper.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;  // precio × cantidad
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="item-info">
                    <h4>${item.nombre}</h4>
                    <span class="item-price">$${item.precio.toLocaleString()} x ${item.cantidad}</span>
                </div>
                <button class="btn-remove" data-id="${item.id}">❌</button>
            </div>`;
        cartItemsWrapper.insertAdjacentHTML('beforeend', itemHTML);
    });

    cartTotalDisplay.textContent = total.toLocaleString();
};

// ============================================================
// EVENTO: Eliminar un producto del carrito al hacer clic en ❌
// ============================================================
cartItemsWrapper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn-remove')) return;
    const id = parseInt(event.target.getAttribute('data-id'));
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarritoDOM();
});

// ============================================================
// EVENTO: Vaciar todo el carrito
// ============================================================
btnEmptyCart.addEventListener('click', () => {
    carrito = [];
    actualizarCarritoDOM();
});

// ============================================================
// EVENTO: Comprar — muestra alerta y limpia el carrito
// ============================================================
btnBuy.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('¡Compra realizada con éxito! 🏍️');
        carrito = [];
        actualizarCarritoDOM();
    } else {
        alert('El carrito está vacío.');
    }
});

// ============================================================
// EVENTO: Abrir / cerrar el sidebar del carrito en móvil
// ============================================================
cartTrigger.addEventListener('click', () => {
    cartSidebar.classList.toggle('cart-visible');
    cartTrigger.classList.toggle('activo');
});

// ============================================================
// EVENTO: Agregar producto al carrito (delegación de eventos)
// Si el producto ya existe, incrementa su cantidad (no duplica)
// Si no existe, lo agrega como nuevo objeto con cantidad: 1
// ============================================================
productGrid.addEventListener('click', (event) => {
    if (!event.target.classList.contains('add-to-cart')) return;

    const id = parseInt(event.target.getAttribute('data-id'));
    const productoBase = productos.find(p => p.id === id);
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        // Si ya existe → solo incrementar la cantidad
        itemExistente.cantidad++;
    } else {
        // Si no existe → agregar con cantidad 1
        carrito.push({ ...productoBase, cantidad: 1 });
    }

    actualizarCarritoDOM();
});

// ============================================================
// FUNCIÓN: Renderizar las cards desde el array de productos
// Recorre el array y genera el HTML de cada tarjeta en el DOM
// ============================================================
const renderizarProductos = (lista) => {
    productGrid.innerHTML = '';
    lista.forEach(producto => {
        const cardHTML = `
            <div class="product-card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="card-body">
                    <h3>${producto.nombre}</h3>
                    <p class="price">$${producto.precio.toLocaleString()}</p>
                    <button class="btn-add add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
};

// Renderizado inicial al cargar la página
renderizarProductos(productos);