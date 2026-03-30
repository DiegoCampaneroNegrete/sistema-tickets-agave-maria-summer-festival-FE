# 📱 Progressive Web App (PWA)

## ¿Qué es una PWA?

Una **Progressive Web App (PWA)** es una aplicación web que funciona como app nativa:
- ✅ Se instala en el dispositivo
- ✅ Funciona sin conexión
- ✅ Notificaciones push
- ✅ Icono en pantalla de inicio

---

## 🔧 Configuración PWA

### 1. manifest.json

Ubicación: `/public/manifest.json`

Define cómo se ve y comporta la app cuando se instala:

```json
{
  "name": "Sistema de Tickets - Agave María Summer Festival",
  "short_name": "Agave Tickets",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

**Campos Clave:**
- `name`: Nombre completo de la app
- `short_name`: Nombre corto (carátula)
- `start_url`: URL inicial al abrir
- `display`: `standalone` = sin navegador, `fullscreen` = pantalla completa
- `icons`: Iconos para diferentes tamaños

### 2. Service Worker

Ubicación: `/public/sw.js`

Archivo JavaScript que corre en el navegador:
- Intercepta requests
- Maneja caché
- Sincronización offline

```javascript
// Estrategia: Network First
1. Intenta fetch desde internet
2. Si falla, usa caché
3. Si no hay en caché, muestra offline
```

### 3. Meta Tags

En `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent"
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}
```

---

## 📦 Icons Requeridos

Para una PWA completa, debes agregar iconos en `/public/icons/`:

```
/public/icons/
├── icon-192x192.png        (Requerido)
├── icon-512x512.png        (Requerido)
├── icon-maskable-192.png   (Para iOS)
└── icon-maskable-512.png   (Para iOS)
```

**Formatos:**
- PNG (recomendado)
- Fondo transparente
- Cuadrado (1:1)
- Mínimo 192x192 px

---

## 🚀 Instalación en Dispositivos

### Chrome/Android
1. Abre la app en Chrome
2. Menu ⋮ → "Instalar app"
3. O déjalo en pantalla de inicio

### Safari/iOS
1. Abre en Safari
2. Click Compartir ↗️
3. "Añadir a pantalla de inicio"

### Edge/Windows
1. Similar a Chrome
2. Menu ... → "Instalar esta aplicación"

---

## 📱 Testing PWA

### En Desarrollo
```bash
npm run dev
# El Service Worker está DESHABILITADO en dev
```

### En Producción
```bash
npm run build
npm start
# Abre http://localhost:3000
```

Luego en DevTools (F12):
1. Application tab
2. Service Workers
3. Verifica que esté registrado

---

## 💾 Caché Inteligente

### Estrategia: Network First

```
Request → Internet
   ✅ Éxito → Guarda en caché → Retorna
   ❌ Falla → Usa caché → Retorna
   ❌ Sin caché → Error offline
```

### Recursos Cacheados

```javascript
// En sw.js
const URLS_TO_CACHE = [
  '/',
  '/styles/globals.css',
  '/manifest.json'
]
```

### Limpiar Caché

En Console (DevTools):
```javascript
caches.keys().then(names => {
  names.forEach(name => {
    caches.delete(name)
    console.log('Cache eliminado:', name)
  })
})
```

---

## 🌐 Sincronización Offline

Nuestra app:
1. Guarda órdenes localmente (IndexedDB)
2. Al volver a conectar, continúa con normalidad
3. Los datos persisten en el dispositivo

---

## ✅ Checklist de PWA

- [x] `manifest.json` presente
- [x] Service Worker registrado
- [x] HTTPS en producción (importante)
- [x] Iconos de acuerdo a especificaciones
- [x] Meta tags en el head
- [x] Funciona sin conexión
- [ ] Notificaciones push (futuro)
- [ ] Sincronización en background (futuro)

---

## 🔒 HTTPS Requerido

**Las PWAs requieren HTTPS en producción.**

### Local (Development)
- localhost funciona sin HTTPS ✅

### Producción
- Debes usar HTTPS ✅
- Vercel lo proporciona automáticamente
- Otros hosts: Let's Encrypt (gratis)

---

## 🐛 Troubleshooting

### La app no se instala
- Verifica que `manifest.json` sea válido
- Abre DevTools → Application → Manifest
- Comprueba que tenga icono 192x192

### Service Worker no funciona
- Solo en producción (`npm start`)
- En dev está deshabilitado (pro/con)
- Limpia caché del navegador
- Recarga con Ctrl+Shift+R

### Funciona offline pero no sincroniza
- Esto es intencional (mantiene datos locales)
- Los datos se guardan en IndexedDB
- Futuro: Agregar sincronización en background

---

## 📊 Lighthouse Audit

En DevTools (F12):
1. Click "Lighthouse"
2. "Generate report"
3. Verifica PWA score

Target: > 90 en todos los aspectos

---

## 📚 Recursos PWA

- [PWA.rocks](https://pwa.rocks) - Ejemplos de PWAs
- [web.dev PWA](https://web.dev/articles/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
