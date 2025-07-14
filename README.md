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

## 🧪 Testing & Quality Assurance

### **Suite de Tests Implementada**
#### **Cobertura Actual:**
```
All files                   |   72.48 |    55.12 |   58.86 |   74.53 |
```

#### **Tecnologías de Testing:**
- **Jest** - Framework de testing principal
- **React Testing Library** - Testing de componentes con enfoque en UX
- **@testing-library/jest-dom** - Matchers adicionales para DOM
- **MSW (Mock Service Worker)** - Mocking de APIs

#### **Tipos de Tests Implementados:**

**✅ Unit Tests:**
- Hooks personalizados (`useDebounce`, `useIsMobile`)
- Utilidades (`highlightSuggestion`)
- Store de estado global (`searchStore`)

**✅ Component Tests:**
- Componentes de UI (`Header`, `ProductCard`, `SearchBar`)
- Componentes de features (`ProductDetail`, `ProductList`)
- Componentes responsivos (`DesktopSearchBar`, `MobileSearchBar`)

#### **Patrones de Testing Aplicados:**

```typescript
// Ejemplo: Testing de componentes con mocks
describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchStore.mockReturnValue({
      searchResults: [],
      loadingResults: false,
      errorResults: null,
      // ... resto del mock
    });
  });

  it('renders without crashing', () => {
    render(<ProductList />);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('shows products when available', () => {
    // Arrange
    const mockProducts = [/* ... */];
    mockUseSearchStore.mockReturnValue({
      searchResults: mockProducts,
      // ... resto del mock
    });

    // Act
    render(<ProductList />);

    // Assert
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
  });
});
```

#### **Buenas Prácticas Implementadas:**

- **Testing Behavior over Implementation** - Tests enfocados en comportamiento del usuario
- **Semantic Queries** - Uso de `getByRole`, `getByLabelText` en lugar de `getByTestId`
- **Proper Mocking** - Mocks de APIs, stores y hooks externos
- **AAA Pattern** - Arrange, Act, Assert en todos los tests
- **Edge Cases Coverage** - Tests para estados de error, loading y casos límite

#### **Comandos de Testing:**
```bash
# Ejecutar todos los tests
npm test

# Tests con cobertura
npm test -- --coverage

# Tests en modo watch
npm test -- --watch

# Tests específicos
npm test -- ComponentName.test.tsx
```

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
- **Testing robusto:**
  - Suite completa de tests unitarios y de componentes.
  - Cobertura del 72.48% con enfoque en funcionalidades críticas.

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
- **Integración y escalabilidad:**
  - Conectar con la API oficial de Mercado Libre para datos en tiempo real.
  - Internacionalización (i18n) y soporte multilenguaje.
- **Testing y calidad:**
  - **Tests de integración** - Verificar flujos completos entre componentes (SearchBar → ProductList → ProductDetail).
  - **E2E tests con Cypress** - Tests de flujos completos de usuario desde la perspectiva del usuario final.
  - Pruebas de accesibilidad y performance.
- **Flujo de trabajo y entornos:**
  - Configurar **entornos múltiples** (dev, staging, prod) como práctica profesional.
  - Implementar **code reviews** para mejorar calidad.
- **Documentación y mantenibilidad:**
  - Documentación técnica más extensa, diagramas de arquitectura y convenciones de código.
