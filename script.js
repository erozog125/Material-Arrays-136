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