/* Arreglo de objetos*/
const productos = [
  {
    id: 1,
    nombre: "Camara X12 Pro",
    categoria: "Cámara",
    descripcion: "Pantalla AMOLED 6.7\", 256 GB, cámara triple 108 MP.",
    precio: 2599000,
    precioAnterior: 3299000,
    imagen: "assets/imagenes/01.jpg",
    badge: "-20%"
  },
  {
    id: 2,
    nombre: "UltraSlim 14\"",
    categoria: "Teclado",
    descripcion: "Switches Mecánicos de Respuesta Rápida.",
    precio: 4899000,
    precioAnterior: null,
    imagen: "assets/imagenes/02.jpg",
    badge: null
  },
  {
    id: 3,
    nombre: "NoiseOff Pro",
    categoria: "Monitor",
    descripcion: "Resolución Full HD. Incluye puertos USB, HDMI, VGA.",
    precio: 649000,
    precioAnterior: 799000,
    imagen: "assets/imagenes/03.jpg",
    badge: "Nuevo"
  },
  {
    id: 4,
    nombre: "FitPro 5",
    categoria: "Monitor",
    descripcion: "Equipo robusto, compacto y táctil, optimizado para comercio minorista.",
    precio: 1199000,
    precioAnterior: null,
    imagen: "assets/imagenes/04.jpg",
    badge: null
  },
  {
    id: 5,
    nombre: "KeyFlow TKL",
    categoria: "Tablet",
    descripcion: "4 GB a 6 GB de RAM, pantalla táctil intuitiva, conectividad completa.",
    precio: 489000,
    precioAnterior: null,
    imagen: "assets/imagenes/05.jpg",
    badge: null
  },
  {
    id: 6,
    nombre: "MirrorVision 4K",
    categoria: "Cámara",
    descripcion: "Sensor 32 MP, lente intercambiable, video 4K 60fps.",
    precio: 4420000,
    precioAnterior: 5200000,
    imagen: "assets/imagenes/06.jpg",
    badge: "-15%"
  },
  {
    id: 7,
    nombre: "AirTab 11\"",
    categoria: "Cámara",
    descripcion: "Sensor de alta sensibilidad para condiciones de iluminación variables (día/noche).",
    precio: 2100000,
    precioAnterior: null,
    imagen: "assets/imagenes/07.jpg",
    badge: null
  },
  {
    id: 8,
    nombre: "DriftX Wireless",
    categoria: "Accesorios",
    descripcion: "25.600 DPI, 70 h batería, USB-C, receptor 2.4 GHz.",
    precio: 329000,
    precioAnterior: null,
    imagen: "assets/imagenes/08.jpg",
    badge: null
  },
  {
    id: 9,
    nombre: "Kingston DataTraveler",
    categoria: "Accesorio",
    descripcion: "Transferencias rápidas con tecnología USB 3.2 Gen 1.",
    precio: 399000,
    precioAnterior: null,
    imagen: "assets/imagenes/09.jpg",
    badge: "Nuevo"
  },
  {
    id: 10,
    nombre: "UltraWide 34\"",
    categoria: "Tablet",
    descripcion: "Panel IPS 144 Hz, resolución QHD+, HDR 400.",
    precio: 3199000,
    precioAnterior: 3800000,
    imagen: "assets/imagenes/10.jpg",
    badge: null
  }
];

// Intenta leer el carrito guardado. Si no hay nada, empieza con arreglo vacío.
let carrito = JSON.parse(localStorage.getItem("techstore-carrito")) || [];

