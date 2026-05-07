let carrito = [];

let btnAbrir = document.getElementById('cart-icon');
let btnCerrar = document.getElementById('close-cart');
let panelLateral = document.getElementById('side-cart');
let listaVisual = document.getElementById('cart-items');
let totalDinero = document.getElementById('cart-total');
let circuloContador = document.getElementById('cart-count');

btnAbrir.onclick = function() {
    panelLateral.classList.add('active');
};

btnCerrar.onclick = function() {
    panelLateral.classList.remove('active');
};

let botonesJuegos = document.querySelectorAll('.btn-add');

botonesJuegos.forEach(function(boton) {
    boton.onclick = function(evento) {
        let tarjeta = evento.target.closest('.game-card');

        let juegoElegido = {
            nombre: tarjeta.querySelector('h3').innerText,
            valor: parseFloat(tarjeta.getAttribute('data-price')),
            foto: tarjeta.querySelector('img').src,
            info: tarjeta.querySelector('.description').innerText,
            puntos: tarjeta.querySelector('.rating span').innerText
        };

        carrito.push(juegoElegido);
        mostrarCarrito();
    };
});

function eliminarDelCarrito(posicion) {
    carrito.splice(posicion, 1);
    
    
    mostrarCarrito();
}


function mostrarCarrito() {
    listaVisual.innerHTML = ""; 
    let cuentaTotal = 0;

    carrito.forEach(function(item, indice) {
        cuentaTotal = cuentaTotal + item.valor;

        listaVisual.innerHTML += `
            <div class="cart-item" style="display: flex; gap: 10px; margin-bottom: 15px; background: #0f172a; padding: 10px; border-radius: 8px; border-left: 3px solid #3b82f6; position: relative;">
                <img src="${item.foto}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div style="flex: 1;">
                    <p style="margin: 0; font-size: 0.85rem; font-weight: bold;">${item.nombre}</p>
                    <p style="margin: 0; font-size: 0.7rem; color: #f1c40f;">★ ${item.puntos}</p>
                    <p style="margin: 0; font-weight: bold; color: #3b82f6;">$${item.valor}</p>
                </div>
                
                
                <button onclick="eliminarDelCarrito(${indice})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; padding: 5px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    totalDinero.innerText = cuentaTotal.toFixed(2);
    circuloContador.innerText = carrito.length;
}