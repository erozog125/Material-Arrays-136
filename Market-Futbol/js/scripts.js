const productos = [
    { id: 1, nombre: "Real Madrid Local 24/25", precio: 170000, marca: "Adidas", tipo: "Camiseta", img: "assets/real madrid.jpg" },
    { id: 2, nombre: "FC Barcelona Local", precio: 150000, marca: "Nike", tipo: "Camiseta", img: "assets/BARCELONA-HOME-25-26-A.webp" },
    { id: 3, nombre: "Manchester City Home", precio: 150000, marca: "Puma", tipo: "Camiseta", img: "assets/New-Man-City-Jersey-2024-2025-1.jpg" },
    { id: 4, nombre: "Liverpool FC Home", precio: 130000, marca: "Nike", tipo: "Camiseta", img: "assets/liverpool.jpg" },
    { id: 5, nombre: "Bayern Múnich Local", precio: 160000, marca: "Adidas", tipo: "Camiseta", img: "assets/bayern.jpg" },
    { id: 6, nombre: "Juventus Home 24/25", precio: 130000, marca: "Adidas", tipo: "Camiseta", img: "assets/juve.webp" },
    { id: 8, nombre: "Argentina (3 Estrellas)", precio: 170000, marca: "Adidas", tipo: "Selección", img: "assets/argentina.webp" },
    { id: 9, nombre: "Brasil Local", precio: 180000, marca: "Nike", tipo: "Selección", img: "assets/brazil.webp" },
    { id: 10, nombre: "Colombia Local 2024", precio: 140000, marca: "Adidas", tipo: "Selección", img: "assets/colombia.webp" },
    { id: 11, nombre: "España Euro 2024", precio: 200000, marca: "Adidas", tipo: "Selección", img: "assets/españa.webp" },
    { id: 12, nombre: "Predator Elite FG", precio: 260000, marca: "Adidas", tipo: "Guayos", img: "assets/predator.avif" },
    { id: 13, nombre: "Mercurial Air Zoom", precio: 275000, marca: "Nike", tipo: "Guayos", img: "assets/air zoom.avif" },
    { id: 14, nombre: "Tiempo Legend 10", precio: 220000, marca: "Nike", tipo: "Guayos", img: "assets/tiempo.webp" },
    { id: 15, nombre: "Puma Future Ultimate", precio: 230000, marca: "Puma", tipo: "Guayos", img: "assets/puma.jpg" },
    { id: 16, nombre: "F50 Elite Fast", precio: 255000, marca: "Adidas", tipo: "Guayos", img: "assets/f50.jpg" },
    { id: 17, nombre: "Mizuno Morelia Neo IV", precio: 290000, marca: "Mizuno", tipo: "Guayos", img: "assets/mizuno.avif" },
    { id: 18, nombre: "Balón UCL Pro", precio: 150000, marca: "Adidas", tipo: "Balón", img: "assets/balon.jpg" },
    { id: 21, nombre: "Balón La Liga Orbita", precio: 140000, marca: "Puma", tipo: "Balón", img: "assets/la liga orbita.jpg" },
    { id: 22, nombre: "Balón Premier League", precio: 160000, marca: "Nike", tipo: "Balón", img: "assets/balon-premier.webp" },
    { id: 23, nombre: "Balón Copa América", precio: 135000, marca: "Puma", tipo: "Balón", img: "assets/copa-america.webp" },
    { id: 20, nombre: "Guantes Predator Pro", precio: 120000, marca: "Adidas", tipo: "Guantes", img: "assets/guantes.jpg" },
    { id: 24, nombre: "Guantes Nike Vapor", precio: 115000, marca: "Nike", tipo: "Guantes", img: "assets/guantes nike.avif" },
    { id: 25, nombre: "Guantes Reusch Attrakt", precio: 130000, marca: "Reusch", tipo: "Guantes", img: "assets/guants reusch.jpg" },
    { id: 26, nombre: "Guantes Uhlsport Supergrip", precio: 125000, marca: "Uhlsport", tipo: "Guantes", img: "assets/guantes supergrip.avif" },
    { id: 19, nombre: "Canilleras de Carbono", precio: 60000, marca: "G-Form", tipo: "Protección", img: "assets/canilleras.webp" }
];

let carrito = [];

function renderizarProductos(lista) {
    const contenedor = document.getElementById('product-container');
    if(!contenedor) return; 
    contenedor.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <span class="badge">${p.marca}</span>
            <img src="${p.img}" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/200?text=Error+Imagen'">
            <h3>${p.nombre}</h3>
            <p class="price">$${p.precio.toLocaleString()}</p>
            <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const item = productos.find(p => p.id === id);
    carrito.push(item);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaUI = document.getElementById('lista-carrito');
    const totalUI = document.getElementById('total-precio');
    const countUI = document.getElementById('cart-count');
    
    listaUI.innerHTML = "";
    let total = 0;

    carrito.forEach((p, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${p.nombre} - $${p.precio.toLocaleString()} <button onclick="quitar(${index})" class="btn-delete">x</button>`;
        listaUI.appendChild(li);
        total += p.precio;
    });

    totalUI.innerText = total.toLocaleString();
    countUI.innerText = carrito.length;
}

function quitar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function filtrarProductos() {
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda) || p.marca.toLowerCase().includes(busqueda));
    renderizarProductos(filtrados);
}

// ESTO INICIA TODO
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos(productos);
});
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Interacción con el mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            this.x -= dx / 20;
            this.y -= dy / 20;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(39, 174, 96, 0.2)'; // Verde futbolero suave
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();