---

**Instructor:** Edwin Rozo Gómez

**Ficha:** 3292136

**Tecnología:** JavaScript Vanilla (ES6+), HTML5, CSS3 (Grid o Flexbox).

**Duración:** 4 horas

---

### 1. Descripción del Proyecto

El aprendiz debe construir una interfaz funcional de tienda virtual. La aplicación deberá renderizar una lista de productos predefinidos en un arreglo de JavaScript y permitir al usuario gestionar sus compras de forma persistente.

### 2. Requerimientos de Estructura y Estética (Apoyo de IA)

Se permite el uso de IA para generar el **HTML** y **CSS** bajo estas reglas:

- **Semántica:** Uso estricto de `<header>`, `<main>` y `<footer>`.
- **Layout:** El catálogo de productos debe estar organizado mediante **CSS Grid** o **Flexbox**.
- **Responsividad:** La interfaz debe adaptarse a dispositivos móviles (Layout fluido).
- **Estética:** Estilo minimalista y limpio.

### 3. Requerimientos de Lógica (Desarrollo Autónomo)

El JavaScript debe ser desarrollado por el aprendiz y cumplir con lo siguiente:

1. **Fuente de Datos:** Los productos deben provenir de un **arreglo de objetos** inicializado en el script (mínimo 6 productos). Cada objeto debe tener: `id`, `nombre`, `precio` e `imagen` (ruta local en carpeta `/assets`).
2. **Renderizado Dinámico:** Crear una función que recorra el arreglo y genere las "cards" de productos en el DOM.
3. **Gestión del Carrito:**
    - **Agregar:** Al hacer clic, el producto se suma al carrito.
    - **Aumentar:** Si el producto ya existe en el carrito, se debe incrementar su propiedad `cantidad`, no duplicar el elemento visual.
    - **Eliminar:** Opción para quitar un producto del carrito.
4. **Cálculos Totales:** Función que sume el costo de todos los productos multiplicados por su cantidad.
5. **Persistencia (LocalStorage):** El estado del carrito debe persistir. Al recargar la página, los items seleccionados deben seguir apareciendo.

---

### 4. Rúbrica de Evaluación (Actualizada)

He redistribuido los pesos para priorizar el manejo de datos y la lógica de negocio del lado del cliente.

| **Criterio** | **Indicador de Logro** | **Peso** |
| --- | --- | --- |
| **Lógica de Arreglos** | Renderiza correctamente desde el arreglo base y gestiona el carrito sin duplicados. | 35% |
| **Persistencia (LS)** | Implementa `localStorage` para guardar y recuperar el carrito exitosamente. | 25% |
| **Cálculos y DOM** | El total se actualiza en tiempo real al agregar o eliminar productos. | 20% |
| **Maquetación (UI)** | Uso efectivo de Grid/Flexbox, diseño responsivo y semántica HTML. | 10% |
| **Calidad del Código** | Código comentado, uso de funciones flecha, template strings y nombres de variables claros. | 10% |

---

### 5. Instrucciones para el Aprendiz

- **Investigación Autónoma:** Deben buscar cómo utilizar `JSON.parse()` y `JSON.stringify()` para manejar objetos en el almacenamiento local.
- **Comentarios:** Es obligatorio comentar el propósito de cada función (ej: *// Función para actualizar el contador total de la compra*).
- **Assets:** Las imágenes deben estar descargadas localmente en el proyecto.

---