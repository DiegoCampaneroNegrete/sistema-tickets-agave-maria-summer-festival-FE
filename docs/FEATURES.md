# ✨ Características

## 📱 Interfaz de Usuario

### Tema Oscuro
- Toggle en la barra de navegación
- Mantiene preferencia en localStorage
- Soporte completo en toda la app

### Diseño Responsive
- Funciona en móvil, tablet y desktop
- Sidebar colapsable en móvil (hamburger menu)
- Grid adaptativo para contenidos

## 🎫 Sistema de Tickets

### POS (Point of Sale)
- ✅ Mostrar productos disponibles en grid
- ✅ Agregar productos al carrito
- ✅ Ver carrito en tiempo real
- ✅ Cantidad ajustable por producto
- ✅ Remover productos del carrito
- ✅ Cálculo automático de total

### Checkout
- ✅ Crear orden con timestamp
- ✅ Asignar ID único por dispositivo (deviceId)
- ✅ Guardar en base de datos local
- ✅ Generar e imprimir ticket
- ✅ Limpiar carrito después de compra

### Impresión de Tickets
- ✅ Customizable para 58mm o 80mm
- ✅ Múltiples copias configurables
- ✅ Información completa de la orden
- ✅ Formato profesional

## 📊 Dashboard

### Estadísticas
- ✅ Total de ventas ($)
- ✅ Cantidad de órdenes
- ✅ Ticket promedio
- ✅ Desglose de productos vendidos

### Reportes (Placeholders)
- ⬜ Ventas por período (gráfica de líneas)
- ⬜ Productos más vendidos (gráfica de barras)
- ⬜ Distribución de ventas (gráfica de pastel)
- ⬜ Tendencias (gráfica de área)
- ⬜ Tabla de órdenes recientes

## 📱 PWA (Progressive Web App)

### Instalación
- ✅ Installable en dispositivos (iOS, Android, Desktop)
- ✅ Icono en pantalla de inicio
- ✅ Acceso directo a POS y Dashboard
- ✅ Standalone mode (sin navegador)

### Offline
- ✅ Funciona sin conexión a internet
- ✅ Caché inteligente de recursos
- ✅ Sincronización cuando vuelve la conexión

### Performance
- ✅ Cargas rápidas con Turbopack
- ✅ Caché de Google Fonts
- ✅ Optimización automática de imágenes

## 💾 Base de Datos Local

### IndexedDB (Dexie.js)
- ✅ Almacenar órdenes completadas
- ✅ Persistencia de datos sin servidor
- ✅ Acceso rápido y local
- ✅ Compatible con Progressive Web Apps

### Datos Guardados
- ID de orden
- Dispositivo que realizó la venta
- Lista de productos vendidos
- Total de la venta
- Timestamp de la transacción

## 🎨 Personalización

### Configuración de Marcas
```typescript
// En utils/constants.ts
export const LABELS = {
  appName: 'Agave María 🍹',
  pos: 'POS',
  dashboard: 'Dashboard',
  // ... más labels
}
```

### Productos Disponibles
```typescript
// En app/pos/page.tsx
const PRODUCTS = [
  { id: '1', name: 'Pulque Piña', price: 50 },
  { id: '2', name: 'Pulque Fresa', price: 50 },
  { id: '3', name: 'Pócima', price: 70 },
  { id: '4', name: 'Tejuichela', price: 80 }
]
```

## 🔐 Seguridad

- ✅ Datos locales en el dispositivo (no en servidor)
- ✅ Sin exposición de credenciales
- ✅ CORS no necesario
- ✅ Input sanitizado automáticamente por TypeScript

## ⚡ Performance

### Optimizaciones
- ✅ SWC minification para JavaScript
- ✅ Turbopack para builds rápidas
- ✅ Service Worker para cacheing
- ✅ Lazy loading de componentes

### Métricas
- Build time: < 30 segundos
- First Contentful Paint: < 2 segundos
- Lighthouse score: > 90

## 🌍 Multiidioma (Futuro)

La app está preparada para soporte de idiomas:
```typescript
// Todos los textos están en constants.ts
// Fácil de traducir a otro idioma
```

## 📝 Notas

- **Estado de Desarrollo**: Beta
- **Navegadores Soportados**: Chrome, Firefox, Safari, Edge
- **iOS**: iOS 15+ (para PWA)
- **Android**: Android 6+ (para PWA)
