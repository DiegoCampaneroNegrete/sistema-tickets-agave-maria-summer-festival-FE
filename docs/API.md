# 📚 API Reference - Hooks y Componentes

## 🪝 Custom Hooks

### useCart()

Gestiona el carrito de compras.

**Ubicación**: `app/hooks/useCart.ts`

```typescript
const { cart, addToCart, removeFromCart, total, clearCart } = useCart()
```

**Props**:
- Ninguno

**Returns**:
```typescript
{
  cart: CartItem[]              // Productos en carrito
  addToCart: (product) => void  // Agregar producto
  removeFromCart: (id) => void  // Remover producto
  total: number                 // Total en $
  clearCart: () => void         // Vaciar carrito
}
```

**Ejemplo**:
```typescript
const { cart, addToCart, total } = useCart()

return (
  <>
    {products.map(p => (
      <button onClick={() => addToCart(p)}>
        {p.name}
      </button>
    ))}
    <p>Total: ${total}</p>
  </>
)
```

---

### useOrders()

Gestiona órdenes y estadísticas.

**Ubicación**: `app/hooks/useOrders.ts`

```typescript
const { orders, createOrder, totalSales, totalOrders, productCount } = useOrders()
```

**Props**:
- Ninguno

**Returns**:
```typescript
{
  orders: Order[]                    // Lista de órdenes
  createOrder: (order) => Promise    // Crear orden
  totalSales: number                 // Total en $ vendido
  totalOrders: number                // Cantidad de órdenes
  productCount: Record<string, number> // Cantidad por producto
}
```

**Ejemplo**:
```typescript
const { totalSales, createOrder } = useOrders()

const handleCheckout = async () => {
  const order = { items: [...], total: 150 }
  await createOrder(order)
}

return <p>Ventas: ${totalSales}</p>
```

---

### useDeviceId()

Obtiene o genera un ID único para el dispositivo.

**Ubicación**: `app/hooks/useDeviceId.ts`

```typescript
const deviceId = useDeviceId()
```

**Props**:
- Ninguno

**Returns**:
```typescript
string // ID único del dispositivo
```

**Ejemplo**:
```typescript
const deviceId = useDeviceId()

const order = {
  id: '12345',
  deviceId,  // Se incluye en la orden
  items: [...],
  total: 100
}
```

---

### usePrinter()

Gestiona la impresión de tickets.

**Ubicación**: `app/hooks/usePrinter.ts`

```typescript
const { print } = usePrinter(config)
```

**Props**:
```typescript
{
  width?: '58mm' | '80mm'     // Ancho del papel (default: 58mm)
  copies?: number              // Cantidad de copias (default: 2)
  businessName?: string        // Nombre del negocio
}
```

**Returns**:
```typescript
{
  print: (order: Order) => void // Imprimir orden
}
```

**Ejemplo**:
```typescript
const { print } = usePrinter({
  width: '58mm',
  copies: 2,
  businessName: 'Agave María'
})

const handleCheckout = () => {
  const order = { ... }
  print(order)
}
```

---

## 🧩 Componentes

### Layout

Componente raíz que envuelve toda la aplicación.

**Ubicación**: `app/components/Layout.tsx`

```typescript
<Layout>
  {children}
</Layout>
```

**Props**:
```typescript
{
  children: React.ReactNode // Contenido
}
```

**Características**:
- Logo y navegación
- Toggle de tema oscuro
- Sidebar responsive

---

### Sidebar

Menú de navegación responsive.

**Ubicación**: `app/components/Sidebar.tsx`

```typescript
<Sidebar dark={dark} onToggleDark={() => setDark(!dark)} />
```

**Props**:
```typescript
{
  dark: boolean              // Tema oscuro activo
  onToggleDark: () => void   // Callback para cambiar tema
}
```

**Características**:
- Hamburger menu en móvil
- Botones POS y Dashboard
- Toggle de tema

---

### ServiceWorkerRegister

Registra el Service Worker automáticamente.

**Ubicación**: `app/components/ServiceWorkerRegister.tsx`

```typescript
<ServiceWorkerRegister />
```

**Props**:
- Ninguno

**Características**:
- Se registra solo en producción
- Sin visibles en la UI

---

## 📦 Types

### Product

```typescript
export type Product = {
  id: string      // ID único
  name: string    // Nombre del producto
  price: number   // Precio en $
}
```

### CartItem

```typescript
export type CartItem = Product & {
  quantity: number // Cantidad en carrito
}
```

### Order

```typescript
export type Order = {
  id: string           // ID único de la orden
  deviceId: string     // Dispositivo que la creó
  items: CartItem[]    // Productos vendidos
  total: number        // Total en $
  createdAt: string    // Timestamp ISO
}
```

---

## 🎯 Patrones Comunes

### Agregar un Nuevo Producto

1. Edita `app/pos/page.tsx`:
```typescript
const PRODUCTS = [
  // ... productos existentes
  { id: "5", name: "Nuevo Producto", price: 75 }
]
```

### Mostrar Datos en Dashboard

1. Usa `useOrders()`:
```typescript
const { totalSales } = useOrders()
return <p>${totalSales}</p>
```

### Guardar Datos en BD

1. Usa `createOrder()`:
```typescript
const { createOrder } = useOrders()
const order = { ... }
await createOrder(order)
```

### Personalizar Textos

1. Edita `app/utils/constants.ts`:
```typescript
export const LABELS = {
  appName: 'Mi App',
  // ... más labels
}
```

---

## 🔄 Data Flow Completo

```
Componente (POS)
    ↓
useCart() [Hook]
    ↓
cartAtom [Jotai]
    ↓
useState [React]
    ↓
UI Update
    ↓
Checkout → createOrder() → IndexedDB
```

---

## 🚀 Próximas APIs (Futuro)

- `useNotifications()` - Para notificaciones push
- `useSync()` - Para sincronización en background
- `useAnalytics()` - Para tracking de eventos
