# CamisetasStore - EP2

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

Cómo ejecutar la página (desarrollo)
- Requisitos: Node.js 18+ LTS y npm.
- Pasos:
  1) Abrir terminal en esta carpeta: c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas
  2) Instalar dependencias: npm install
  3) Ejecutar servidor Vite: npm run dev
  4) Abrir la URL que muestra Vite (por defecto http://localhost:5173)

Build y previsualización (producción)
- Construir: npm run build
- Previsualizar build: npm run preview

Solución de problemas
- “Missing script: dev”:
  - Asegúrate de estar en la carpeta tienda-camisetas y ejecuta: npm run para ver los scripts.
- Puerto en uso:
  - Vuelve a ejecutar con otro puerto: npm run dev -- --port=5174
- Pantalla en blanco:
  - Verifica que index.html tenga <div id="root"></div> y que src/main.tsx haga createRoot sobre 'root'.
  - Revisa la consola del navegador por errores de import/tipos.

Cambiar imágenes (productos, logo, favicon)

- Cambiar imágenes de productos (URL externa o archivo local):
  - Edita src/data/products.js y actualiza la propiedad image:
    ````js
    // filepath: c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\src\data\products.js
    export const products = [
      // ...existing code...
      {
        id: 'rm-home-23',
        name: 'Real Madrid Home 23/24',
        price: 89.99,
        image: '/images/real-madrid-home.jpg' // si pones la imagen en /public/images
      },
      // ...existing code...
    ];
    ````
  - Para usar archivos locales, coloca tus imágenes en:
    c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\public\images
    y referencia con ruta absoluta desde la raíz: /images/archivo.jpg

- Cambiar el logo del header (mostrar imagen en lugar del badge “CS”):
  1) Copia tu logo a public/images/logo.png
  2) Sustituye el badge en App.jsx por un <img> y define estilos:
    ````jsx
    // filepath: c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\src\App.jsx
    // ...existing code...
    <div className="brand">
      <img className="brand-logo" src="/images/logo.png" alt="CamisetasStore" />
      <span>CamisetasStore</span>
    </div>
    // ...existing code...
    ````
    ````css
    // filepath: c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\src\App.css
    /* ...existing code... */
    .brand-logo {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      object-fit: cover;
      display: block;
    }
    /* ...existing code... */
    ````
  - Si prefieres mantener “CS” pero con fondo personalizado, puedes usar un background-image en .brand-badge.

- Cambiar el favicon del sitio:
  - Reemplaza el archivo en:
    c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\public\favicon.svg
    o agrega tu favicon.ico y ajusta index.html:
    ````html
    <!-- filepath: c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\index.html -->
    <!-- ...existing code... -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <!-- o -->
    <link rel="icon" href="/favicon.ico" />
    <!-- ...existing code... -->
    ````

Pasos rápidos para agregar una imagen (productos/logo)
1) Copia o descarga tu archivo a:
   c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\public\images
   Ejemplo PowerShell:
   Invoke-WebRequest "https://ejemplo.com/mi-foto.jpg" -OutFile "public/images/mi-foto.jpg"

2) Úsala con ruta absoluta desde la raíz del sitio:
   - En productos (src/data/products.js):
     // ...existing code...
     { id: 'rm-home-23', name: 'Real Madrid Home 23/24', price: 89.99, image: '/images/mi-foto.jpg' }
     // ...existing code...
   - Como logo:
     <img className="brand-logo" src="/images/logo.png" alt="CamisetasStore" />

3) Guarda y recarga el navegador (Vite HMR actualiza solo).

Descargar imágenes y agregarlas al proyecto (Windows)
1) Crear carpeta de imágenes (si no existe):
   PowerShell:
   mkdir -Force "c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\public\images"

2) Descargar desde una URL a la carpeta del proyecto:
   - Opción A (PowerShell):
     Invoke-WebRequest "https://ejemplo.com/mi-foto.jpg" -OutFile "c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\public\images\mi-foto.jpg"
   - Opción B (curl):
     curl.exe -L "https://ejemplo.com/mi-foto.jpg" -o "c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\public\images\mi-foto.jpg"

3) Usar la imagen en la app:
   - En productos (src/data/products.js):
     // ...existing code...
     { id: 'rm-home-23', name: 'Real Madrid Home 23/24', price: 89.99, image: '/images/mi-foto.jpg' }
     // ...existing code...
   - Como logo en el header (src/App.jsx):
     // ...existing code...
     <img className="brand-logo" src="/images/logo.png" alt="CamisetasStore" />
     // ...existing code...

Notas
- En Vite, todo lo que esté en /public se sirve desde la raíz del sitio: usa rutas /images/archivo.jpg
- Tras descargar/guardar, recarga el navegador si no se actualiza solo.

¿Esa URL sirve para guardar la imagen?
- No sirve una URL de Google del tipo:
  - https://www.google.com/url?sa=i&url=... (es una redirección, no una imagen directa)
- Sí sirve una URL directa que apunte al archivo y termine en .jpg/.jpeg/.png/.webp, por ejemplo:
  - https://picsum.photos/seed/rmhome/400/400 (válida para pruebas)
  - https://example.com/imagenes/camiseta.jpg (termina en .jpg)

Cómo obtener la URL directa de una imagen
1) En el sitio de origen: clic derecho sobre la imagen -> “Abrir imagen en una pestaña nueva” o “Copiar dirección de la imagen”.
2) Verifica que la URL termine en .jpg/.jpeg/.png/.webp y que al abrirla solo veas la imagen (sin página HTML alrededor).
3) Alternativa: en el navegador abre DevTools (F12) -> pestaña “Network” -> filtra por “Img” y copia la “Request URL” de la imagen cargada.

Descargar y usar la imagen
- Descarga a la carpeta pública del proyecto:
  PowerShell:
  Invoke-WebRequest "https://picsum.photos/seed/rmhome/400/400" -OutFile "public/images/mi-foto.jpg"

- Usa la imagen en el código con ruta absoluta desde la raíz:
  En src/data/products.js:
  // ...existing code...
  { id: 'rm-home-23', name: 'Real Madrid Home 23/24', price: 89.99, image: '/images/mi-foto.jpg' }
  // ...existing code...

Recomendación de licencias
- Usa imágenes propias o bancos libres (Unsplash, Pexels, Pixabay) para evitar problemas de derechos.

Ejemplo con URL directa (Adidas)
1) Descargar a la carpeta pública:
   PowerShell:
   Invoke-WebRequest "https://assets.adidas.com/images/w_600,f_auto,q_auto/f952f4fc563e4cf8b22dafbb008fe903_faec/Camiseta_Uniforme_Local_Real_Madrid_23-24_Ninos_Blanco_IB0011_db01_laydown.jpg" -OutFile "public/images/real-madrid-23-24.jpg"
   o con curl:
   curl.exe -L "https://assets.adidas.com/images/w_600,f_auto,q_auto/f952f4fc563e4cf8b22dafbb008fe903_faec/Camiseta_Uniforme_Local_Real_Madrid_23-24_Ninos_Blanco_IB0011_db01_laydown.jpg" -o "public/images/real-madrid-23-24.jpg"

2) Usar en productos (src/data/products.js):
```js
// filepath: c:\Users\kurau\OneDrive\Imágenes\Documentos\GitHub\TiendaCamisetas\tienda-camisetas\src\data\products.js
// ...existing code...
{
  id: 'rm-home-23',
  name: 'Real Madrid Home 23/24',
  price: 89.99,
  image: '/images/real-madrid-23-24.jpg'
},
// ...existing code...
```

3) Guarda y recarga el navegador (Ctrl+F5 si no ves el cambio).
