// ============================================================
// products.js — Ferrer Market
// Fuente de datos: arreglo de objetos con los planes de trading
// Cada objeto contiene: id, nombre, precio, imagen, categoría,
// descripción, features y si es premium o no.
// ============================================================

// Arreglo principal de productos (mínimo 6 requeridos)
const productos = [
  {
    id: 1,
    nombre: "Plan Básico",
    precio: 49000,
    imagen: "assets/plan-basico.jpg",
    categoria: "Educación",
    descripcion: "Ideal para comenzar. Accede al contenido educativo base sobre SMC e ICT.",
    features: [
      "Acceso a canal educativo",
      "Material PDF descargable",
      "Conceptos SMC básicos",
      "Soporte por chat"
    ],
    popular: false,
    premium: false
  },
  {
    id: 2,
    nombre: "Plan Señales",
    precio: 89000,
    imagen: "assets/plan-senales.jpg",
    categoria: "Señales",
    descripcion: "Recibe señales de trading en vivo con análisis institucional diario.",
    features: [
      "Señales Forex en vivo",
      "Análisis DXY + pares",
      "Notificaciones Telegram",
      "Historial de señales"
    ],
    popular: true,
    premium: false
  },
  {
    id: 3,
    nombre: "Plan Análisis",
    precio: 120000,
    imagen: "assets/plan-analisis.jpg",
    categoria: "Análisis",
    descripcion: "Análisis técnico semanal con bias institucional, zonas clave y SMT.",
    features: [
      "Análisis semanal detallado",
      "Zonas premium / discount",
      "SMT con DXY y GBPUSD",
      "Video análisis en vivo"
    ],
    popular: false,
    premium: false
  },
  {
    id: 4,
    nombre: "Plan Comunidad",
    precio: 149000,
    imagen: "assets/plan-comunidad.jpg",
    categoria: "Comunidad",
    descripcion: "Accede a la comunidad privada, señales y material educativo completo.",
    features: [
      "Todo el Plan Señales",
      "Grupo privado Discord",
      "Sesiones grupales mensuales",
      "Acceso a biblioteca ICT"
    ],
    popular: true,
    premium: false
  },
  {
    id: 5,
    nombre: "Plan Mentoría",
    precio: 350000,
    imagen: "assets/plan-mentoria.jpg",
    categoria: "Mentoría",
    descripcion: "Sesiones 1:1 conmigo para acelerar tu curva de aprendizaje como trader.",
    features: [
      "4 sesiones 1:1 al mes",
      "Revisión de operaciones",
      "Plan de trading personal",
      "Acceso a todo el contenido"
    ],
    popular: false,
    premium: true
  },
  {
    id: 6,
    nombre: "Plan Elite",
    precio: 599000,
    imagen: "assets/plan-elite.jpg",
    categoria: "Elite",
    descripcion: "El plan más completo. Mentoría intensiva, señales y acceso ilimitado a todo.",
    features: [
      "Mentoría ilimitada 1:1",
      "Señales premium 24/7",
      "Acceso de por vida al contenido",
      "Revisión diaria de trades"
    ],
    popular: false,
    premium: true
  }
];