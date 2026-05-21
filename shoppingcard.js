// SHOPPINGCARD.JS
// Aquí manejamos todo lo del carrito de compras.
// Este archivo se encarga de agregar productos, cambiar cantidades, eliminar productos y guardar el carrito.



// Aquí guardamos los productos que el usuario va agregando.
let carrito = [];


// Esta función convierte un número en precio colombiano, algo parecido a lo que hicimos en market.js pero esta es para mostrar los precios dentro del carrito de compras.
function formatearPrecioCarrito(precio) {
  return "$" + precio.toLocaleString("es-CO");
}

// Esta función guarda el carrito en localStorage, de este modo, si la persona recarga la página, el pedido no se perdaría.
function guardarCarrito() {
  localStorage.setItem("carritoDetallitosHarly", JSON.stringify(carrito));
}

// Esta función carga el carrito guardado en localStorage.
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carritoDetallitosHarly");

  if (carritoGuardado != null) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// Esta función calcula el subtotal del carrito y multiplica el precio por la cantidad de cada producto.
function calcularSubtotal() {
  let subtotal = 0;

  carrito.forEach(function(producto) {
    subtotal = subtotal + producto.precio * producto.cantidad;
  });

  return subtotal;
}

// Esta función muestra el carrito en la página, actualiza el subtotal y el total, y también muestra un mensaje si el carrito está vacío.
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("cart-items");
  const subtotalTexto = document.getElementById("subtotal");
  const totalTexto = document.getElementById("total");

  if (contenedorCarrito == null) {
    return;
  }

  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.className = "empty-cart-message";
    mensaje.textContent = "Aún no has agregado productos.";

    contenedorCarrito.appendChild(mensaje);

    subtotalTexto.textContent = "$0";
    totalTexto.textContent = "$0";

    return;
  }

  carrito.forEach(function(producto) {
    const item = document.createElement("div");
    item.className = "cart-item";

    const info = document.createElement("div");

    const nombre = document.createElement("h4");
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = formatearPrecioCarrito(producto.precio) + " x " + producto.cantidad;

    info.appendChild(nombre);
    info.appendChild(precio);

    const acciones = document.createElement("div");
    acciones.className = "cart-item-actions";

    const botonRestar = document.createElement("button");
    botonRestar.type = "button";
    botonRestar.textContent = "-";
    botonRestar.dataset.id = producto.id;
    botonRestar.className = "cart-minus-btn";

    const cantidad = document.createElement("span");
    cantidad.textContent = producto.cantidad;

    const botonSumar = document.createElement("button");
    botonSumar.type = "button";
    botonSumar.textContent = "+";
    botonSumar.dataset.id = producto.id;
    botonSumar.className = "cart-plus-btn";

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.dataset.id = producto.id;
    botonEliminar.className = "cart-delete-btn";

    acciones.appendChild(botonRestar);
    acciones.appendChild(cantidad);
    acciones.appendChild(botonSumar);
    acciones.appendChild(botonEliminar);

    item.appendChild(info);
    item.appendChild(acciones);

    contenedorCarrito.appendChild(item);
  });

  const subtotal = calcularSubtotal();

  subtotalTexto.textContent = formatearPrecioCarrito(subtotal);
  totalTexto.textContent = formatearPrecioCarrito(subtotal);
}

// Esta función agrega un producto al carrito y si ya existe, solo aumenta la cantidad.
function agregarAlCarrito(producto) {
  const productoEncontrado = carrito.find(function(item) {
    return item.id === producto.id;
  });

  if (productoEncontrado != null) {
    productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarCarrito();
} 

// Esta función aumenta la cantidad de un producto.
function aumentarCantidad(idProducto) {
  const productoEncontrado = carrito.find(function(item) {
    return item.id === idProducto;
  });

  if (productoEncontrado != null) {
    productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
  }

  guardarCarrito();
  mostrarCarrito();
}

// Esta función resta la cantidad y si llega a cero, elimina el producto.
function restarCantidad(idProducto) {
  const productoEncontrado = carrito.find(function(item) {
    return item.id === idProducto;
  });

  if (productoEncontrado == null) {
    return;
  }

  productoEncontrado.cantidad = productoEncontrado.cantidad - 1;

  if (productoEncontrado.cantidad <= 0) {
    eliminarProducto(idProducto);
    return;
  }

  guardarCarrito();
  mostrarCarrito();
}

// Esta función elimina un producto completo del carrito.
function eliminarProducto(idProducto) {
  carrito = carrito.filter(function(item) {
    return item.id !== idProducto;
  });

  guardarCarrito();
  mostrarCarrito();
}


// Esta función vacía todo el carrito.
function vaciarCarrito() {
  carrito = [];

  guardarCarrito();
  mostrarCarrito();
}

// Esta función toma los datos de un botón del desayuno lo cual nos sirve para agregar al carrito el desayuno base o lo adicional.
function crearProductoDesdeBoton(boton) {
  return {
    id: Number(boton.dataset.id),
    nombre: boton.dataset.nombre,
    precio: Number(boton.dataset.precio)
  };
}

// Esta función escucha los clics en los botones de la página y dependiendo del botón, llama a la función correspondiente para agregar, aumentar, restar o eliminar productos del carrito. 
function activarEventosCarrito() {
  document.addEventListener("click", function(evento) {
    const botonAgregar = evento.target.closest(".addon-add-btn");
    const botonDesayuno = evento.target.closest(".add-breakfast-btn");
    const botonSumar = evento.target.closest(".cart-plus-btn");
    const botonRestar = evento.target.closest(".cart-minus-btn");
    const botonEliminar = evento.target.closest(".cart-delete-btn");

    if (botonAgregar != null) {
      const idProducto = Number(botonAgregar.dataset.id);

      const producto = window.productosDestacados.find(function(item) {
        return item.id === idProducto;
      });

      if (producto != null) {
        agregarAlCarrito(producto);
      }
    }

    if (botonDesayuno != null) {
      const producto = crearProductoDesdeBoton(botonDesayuno);
      agregarAlCarrito(producto);
    }

    if (botonSumar != null) {
      aumentarCantidad(Number(botonSumar.dataset.id));
    }

    if (botonRestar != null) {
      restarCantidad(Number(botonRestar.dataset.id));
    }

    if (botonEliminar != null) {
      eliminarProducto(Number(botonEliminar.dataset.id));
    }
  });

  const botonVaciar = document.querySelector(".cart-box .btn-secondary");

  if (botonVaciar != null) {
    botonVaciar.addEventListener("click", function() {
      vaciarCarrito();
    });
  }
}

// Funcion para que cuando la página cargue, recuperamos el carrito guardado y activamos los botones.
document.addEventListener("DOMContentLoaded", function() {
  cargarCarrito();
  mostrarCarrito();
  activarEventosCarrito();
});

// Funciones disponibles para checkout.js. y en el siguiente commit las usaremos para calcular el total final.
window.obtenerCarrito = function() {
  return carrito;
};

window.obtenerSubtotalCarrito = function() {
  return calcularSubtotal();
};

window.mostrarCarrito = mostrarCarrito;