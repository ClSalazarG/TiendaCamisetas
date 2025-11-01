# Tienda Camisetas - EP2

Resumen
Proyecto React + Vite que implementa una tienda de camisetas de fútbol con:
- Componentes reutilizables.
- Routing (Home, Cart, Checkout).
- Estado global del carrito via Context (persistencia en localStorage).
- Formularios con validación usando react-hook-form.
- Tests con Vitest + Testing Library.

Instalación
1. Abrir terminal en la carpeta del proyecto.
2. npm install

Comandos
- npm run dev        -> Ejecutar en desarrollo (Vite)
- npm run build      -> Construcción para producción
- npm run preview    -> Previsualizar build
- npm test           -> Ejecutar tests (vitest)
- npm run test:coverage -> Ejecutar cobertura
- npm run format     -> Formatear código con Prettier

Notas para el corrector
- Estructura de componentes en src/components.
- Lógica del carrito en src/context/CartContext.jsx (addItem/removeItem/clear/total).
- Validaciones en src/components/CheckoutForm.jsx (react-hook-form).
- Datos de ejemplo: src/data/products.js

Evidencia y entrega
- Subir repo público y adjuntar link en la entrega.
