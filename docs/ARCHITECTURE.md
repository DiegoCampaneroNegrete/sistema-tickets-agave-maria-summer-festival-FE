# 🏗️ Arquitectura del Proyecto

## Estructura de Carpetas

```
app/
├── components/          # Componentes React reutilizables
│   ├── Layout.tsx      # Componente principal con navegación
│   ├── Sidebar.tsx     # Menú responsive
│   └── ServiceWorkerRegister.tsx
├── dashboard/          # Página de Dashboard
│   └── page.tsx
├── lib/
│   ├── db.ts          # Configuración de Dexie (BD local)
│   └── types.ts       # Tipos TypeScript compartidos
├── hooks/             # Custom Hooks
│   ├── useCart.ts     # Gestión del carrito
│   ├── useOrders.ts   # Gestión de órdenes
│   ├── useDeviceId.ts # ID único del dispositivo
│   └── usePrinter.ts  # Impresión de tickets
├── pos/               # Página POS (Point of Sale)
│   └── page.tsx
├── store/             # State global con Jotai
│   └── cart.ts
├── utils/             # Utilidades
│   └── constants.ts
├── layout.tsx         # Root Layout
└── page.tsx           # Página principal

public/
├── manifest.json      # Configuración PWA
└── sw.js             # Service Worker

docs/                  # Documentación (esta carpeta)
next.config.js         # Configuración de Next.js
tsconfig.json          # Configuración de TypeScript
tailwind.config.js     # Configuración de Tailwind CSS
```

## Flujo de Datos

```
┌─────────────────────────────────────────┐
│         Componentes React               │
├─────────────────────────────────────────┤
│ Layout, Sidebar, POS, Dashboard         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Custom Hooks (useCart, etc)        │
├─────────────────────────────────────────┤
│ Comunican con state y base de datos     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   State Management (Jotai)              │
├─────────────────────────────────────────┤
│ cartAtom → Carrito en memoria           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Database (Dexie.js / IndexedDB)        │
├─────────────────────────────────────────┤
│ - Órdenes                               │
│ - Historial de transacciones            │
└─────────────────────────────────────────┘
```

## Tipos Principales

```typescript
// Producto en venta
type Product = {
  id: string
  name: string
  price: number
}

// Producto en el carrito
type CartItem = Product & {
  quantity: number
}

// Orden completada
type Order = {
  id: string
  deviceId: string      // ID único del dispositivo
  items: CartItem[]     // Productos vendidos
  total: number         // Total en $
  createdAt: string     // Timestamp
}
```

## Componentes Clave

### Layout
- Componente padre que envuelve toda la app
- Maneja el tema oscuro
- Incluye navegación principal
- Registra el Service Worker

### Sidebar
- Menú responsive (hamburger en móvil)
- Botones para POS y Dashboard
- Toggle de tema oscuro

### POS (Point of Sale)
- Pantalla de venta
- Muestra productos disponibles
- Carrito de compras
- Checkout e impresión de tickets

### Dashboard
- Estadísticas de ventas
- Total de órdenes
- Productos más vendidos
- Gráficas (placeholders)

## Gestión de Estado

### Jotai (atom)
```typescript
// En store/cart.ts
export const cartAtom = atom<CartItem[]>([])

// Uso en componentes
const [cart, setCart] = useAtom(cartAtom)
```

### Dexie.js (IndexedDB)
```typescript
// En lib/db.ts
const db = new Dexie('agave_tickets')
db.version(1).stores({
  orders: '++id'
})
```

## Flujo de una Compra

```
1. Usuario clickea producto (POS)
   ↓
2. addToCart() → actualiza cartAtom (Jotai)
   ↓
3. Carrito se muestra en la UI
   ↓
4. Usuario clickea "Checkout"
   ↓
5. createOrder() crea la orden con deviceId
   ↓
6. Orden se guarda en IndexedDB
   ↓
7. usePrinter() genera e imprime ticket
   ↓
8. clearCart() vacía el carrito
   ↓
9. Dashboard actualiza estadísticas
```

## PWA (Progressive Web App)

- **Service Worker**: `/public/sw.js` (manual, sin dependencias)
- **Manifest**: `/public/manifest.json` (configuración de instalación)
- **Caché**: Network First estrategia
- **Offline**: Funciona sin conexión

## Decisiones de Diseño

### ✅ Por qué Dexie.js
- Almacenamiento local sin servidor
- Soporta modo offline
- Muy fácil de usar

### ✅ Por qué Jotai
- State management simple
- Sin boilerplate
- Perfecto para apps pequeñas/medianas

### ✅ Por qué Service Worker Manual
- Sin dependencias externas (evita conflictos)
- Total control del comportamiento
- Compatible con Turbopack

### ✅ Por qué TypeScript
- Type safety
- Mejor DX (developer experience)
- Errores detectados en compile time
