# Mercado Libre Frontend Challenge

## 🚀 Instrucciones de instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Gerog13/meli-frontend-challenge.git
   cd meli-frontend-challenge
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```
3. **Inicia la app en modo desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```
4. **Abre en tu navegador:**
   - [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Decisiones técnicas destacadas

- **Arquitectura modular y SOLID:**
  - Componentes desacoplados y reutilizables (ProductCard, ProductDetail, Header, etc).
  - Subcomponentes internos para máxima claridad y mantenibilidad.
- **UI/UX pixel-perfect:**
  - Inspiración directa en la experiencia de Mercado Libre (mobile y desktop).
  - Uso intensivo de TailwindCSS para estilos responsivos y consistentes.
- **Estado global y hooks:**
  - Zustand para manejo de estado simple y predecible.
  - Hooks personalizados para lógica de UI (ej: useIsMobile).
- **Mock de datos y API:**
  - MockServiceWorker y archivos locales para simular endpoints y datos de productos.
- **Accesibilidad:**
  - Uso de roles, aria-labels y navegación por teclado en los principales componentes.
- **Clean code y mantenibilidad:**
  - Tipado estricto con TypeScript.
  - Separación de lógica y presentación.

---

## 💡 ¿Qué haría distinto si tuviera más tiempo?

- **Mejoras de experiencia de usuario (UX/UI):**
  - Hacer totalmente funcionales los botones de la search bar en mobile (menú, carrito, etc).
  - Mejorar la landing page con animaciones, banners dinámicos y recomendaciones personalizadas.
  - Enriquecer las ProductCard con más datos relevantes (stock, variantes, badges, acciones rápidas, etc).
  - Mejorar la vista de Product Detail con más imágenes, zoom, reviews, preguntas y respuestas.
  - Hacer funcional el paginador, el carrito y el botón "Comprar ahora" para simular un flujo de compra real.
- **Interactividad avanzada:**
  - Agregar microinteracciones y feedback visual en todos los botones y acciones.
  - Implementar favoritos persistentes y feedback inmediato al usuario.
- **Mobile first real:**
  - Profundizar en la experiencia mobile: gestos, accesos rápidos, bottom navigation, etc.
  - Optimizar el rendimiento y la carga en dispositivos móviles.
- **Integración y escalabilidad:**
  - Conectar con la API oficial de Mercado Libre para datos en tiempo real.
  - Internacionalización (i18n) y soporte multilenguaje.
- **Testing y calidad:**
  - Unit y e2e tests con Jest, React Testing Library y Cypress.
  - Pruebas de accesibilidad y performance.
- **Documentación y mantenibilidad:**
  - Documentación técnica más extensa, diagramas de arquitectura y convenciones de código.
