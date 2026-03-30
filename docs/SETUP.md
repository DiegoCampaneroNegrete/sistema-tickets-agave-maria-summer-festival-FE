# 🚀 Inicio Rápido

## 📋 Requisitos

- **Node.js 20+** (descargar desde [nodejs.org](https://nodejs.org))
- **npm** (incluido con Node.js)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## ⬇️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sistema-tickets-agave-maria-summer-festival-FE.git
cd sistema-tickets-agave-maria-summer-festival-FE
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔧 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con hot reload |
| `npm run build` | Compila la app a producción |
| `npm start` | Ejecuta la app compilada |
| `npm run lint` | Ejecuta ESLint |

---

## 📁 Estructura Básica

```
app/
├── page.tsx          # 🏠 Página principal (Dashboard)
├── pos/page.tsx      # 💳 Sistema POS
├── dashboard/page.tsx # 📊 Estadísticas
├── components/       # 🧩 Componentes
├── hooks/            # 🪝 Lógica reutilizable
├── store/            # 🎯 Estado global
└── lib/              # 📚 Utilidades
```

---

## 🎯 Primeros Pasos

### Explorar la Aplicación

1. **Página Principal**: Ver estadísticas generales
2. **POS**: Vender productos y imprimir tickets
3. **Dashboard**: Ver reportes y análisis

### Modificar Productos

Edita `app/pos/page.tsx`:

```typescript
const PRODUCTS = [
  { id: "1", name: "Tu Producto", price: 100 },
  // Agrega más productos aquí
]
```

### Personalizar Textos

Edita `app/utils/constants.ts`:

```typescript
export const LABELS = {
  appName: 'Mi Festival 🎉',
  pos: 'Ventas',
  dashboard: 'Reportes',
  // ... más labels
}
```

---

## 📱 Modo PWA (App Instalable)

### En Desarrollo
```bash
npm run build
npm start
```

Luego abre DevTools (F12) → Application → Service Workers

### En Producción
- Chrome/Android: Menu ⋮ → "Instalar app"
- iOS: Compartir → "Añadir a pantalla de inicio"

---

## 🐛 Solución de Problemas

### Puerto 3000 en uso
```bash
# Usa otro puerto
npm run dev -- -p 3001
```

### Dependencias no instalan
```bash
rm -rf node_modules package-lock.json
npm install
```

### Service Worker no funciona
- Solo en producción (`npm start` después de `npm run build`)
- Verifica DevTools → Application → Service Workers
- Limpia el caché: DevTools → Application → Clear Storage

---

## 📚 Siguientes Pasos

- 📖 Lee [ARCHITECTURE.md](ARCHITECTURE.md) para entender el código
- 🛠️ Lee [DEVELOPMENT.md](DEVELOPMENT.md) para guía de desarrollo
- 📱 Lee [PWA.md](PWA.md) para entender la Progressive Web App

---

## 🆘 Ayuda

¿Necesitas ayuda?
1. Revisa la [documentación principal](README.md)
2. Consulta la [guía de desarrollo](DEVELOPMENT.md)
3. Abre un issue en GitHub
