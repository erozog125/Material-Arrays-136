console.log("¡El JS está cargado!");

let cart = []; 

// Crea la estructura HTML de un producto y la agrega a la tienda
const makeProductCard = (productObj) => {
    const card = document.createElement('article');
    card.classList.add('vynil-item');

    card.innerHTML = `
        <div class="cover-art">
            <img src="./Assets/Images/${productObj.Imagen}" alt="${productObj.name}">
            <div class="vinyl-plate"></div>
        </div>
        <div class="vynil-info">
            <h4>${productObj.name}</h4>
            <span class="price">$${productObj.precio}</span>
            <button class="btn-add" data-id="${productObj.id}">+</button>
        </div>
    `;

    document.querySelector('#vynil-grid').appendChild(card);
};

// Recorre el array de productos y ejecuta el renderizado
const renderStore = () => {
    product.forEach(item => makeProductCard(item));
};

// Busca el producto por ID y lo añade al array del carrito o aumenta su cantidad
const addToCart = (productId) => {
    const id = Number(productId);
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const productToAdd = product.find(item => item.id === id);
        cart.push({ ...productToAdd, quantity: 1 });
    }

    saveAndRefresh();
};

// Filtra el array del carrito para eliminar el producto seleccionado
const removeFromCart = (productId) => {
    const id = Number(productId);
    cart = cart.filter(item => item.id !== id);
    saveAndRefresh();
};

// Actualiza la visualización del carrito y calcula el precio total
const renderCart = () => {
    const cartList = document.querySelector('#cart-list');
    const totalDisplay = document.querySelector('#total-price');
    
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Tu bolsa está vacía</p>';
        totalDisplay.textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item'); 
        
        cartItem.innerHTML = `
            <div class="cart-info">
                <p>${item.name} (x${item.quantity})</p>
                <span>$${item.precio * item.quantity}</span>
            </div>
            <button class="btn-remove" data-id="${item.id}">x</button>
        `;
        cartList.appendChild(cartItem);
    });

    const total = cart.reduce((acc, prod) => acc + (prod.precio * prod.quantity), 0);
    totalDisplay.textContent = total.toFixed(2);
};



// Inicializa la tienda y carga el carrito al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
    renderStore();
    loadCart();
});

// Detecta el clic para agregar productos (Delegación de eventos)
document.querySelector('#vynil-grid').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add')) {
        addToCart(e.target.dataset.id);
    }
});

// Detecta el clic para eliminar productos (Delegación de eventos)
document.querySelector('#cart-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
        removeFromCart(e.target.dataset.id);
    }
});