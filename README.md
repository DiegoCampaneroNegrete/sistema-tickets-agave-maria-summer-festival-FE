# 🎫 Sistema de Tickets - Agave María Summer Festival

**Una Progressive Web App moderna para venta de tickets y gestión POS del festival Agave María.**

![License](https://img.shields.io/badge/license-MIT-blue)
![Node.js](https://img.shields.io/badge/node.js-20+-green)
![Next.js](https://img.shields.io/badge/next.js-16-black)
![React](https://img.shields.io/badge/react-19-61dafb)

---

## ✨ Características Principales

🎫 **Sistema POS** - Venta rápida de tickets y bebidas  
💳 **Checkout Inteligente** - Carrito dinámico con subtotales  
🖨️ **Impresión de Tickets** - Generación automática de recibos  
📊 **Dashboard** - Estadísticas y reportes en tiempo real  
📱 **PWA** - Funciona offline y se instala como app nativa  
🌙 **Tema Oscuro** - UI moderna y responsive  
💾 **Base de Datos Local** - Sin servidor, datos en IndexedDB  

---

## 🚀 Quick Start

### Requisitos
- Node.js 20+
- npm (incluido con Node.js)

### Instalación
```bash
# Clonar
git clone https://github.com/tu-usuario/sistema-tickets-agave-maria-summer-festival-FE.git
cd sistema-tickets-agave-maria-summer-festival-FE

# Instalar dependencias
npm install

# Desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📖 Documentación

La documentación completa está en la carpeta `/docs`:

| Documento | Descripción |
|-----------|-------------|
| [📚 README](docs/README.md) | Índice de documentación |
| [🚀 Setup](docs/SETUP.md) | Instalación y primeros pasos |
| [✨ Features](docs/FEATURES.md) | Qué incluye la app |
| [🏗️ Architecture](docs/ARCHITECTURE.md) | Estructura del código |
| [💻 Development](docs/DEVELOPMENT.md) | Guía de desarrollo |
| [📱 PWA](docs/PWA.md) | Progressive Web App |
| [📚 API](docs/API.md) | Referencia de hooks y componentes |

---

## 🛠️ Tech Stack

| Componente | Tecnología |
|-----------|-----------|
| **Frontend** | Next.js 16 + React 19 |
| **Styling** | Tailwind CSS 4 |
| **State** | Jotai |
| **Database** | Dexie.js (IndexedDB) |
| **PWA** | Service Worker manual |
| **Language** | TypeScript |

---

## 📱 Páginas Disponibles

### 🏠 Página Principal (`/`)
Dashboard con estadísticas generales:
- Total de ventas
- Cantidad de órdenes
- Ticket promedio
- Gráficas (placeholders)

### 💳 POS (`/pos`)
Sistema de punto de venta:
- Grid de productos
- Carrito en tiempo real
- Checkout
- Impresión de tickets

### 📊 Dashboard (`/dashboard`)
Reportes y análisis:
- Estadísticas de ventas
- Productos más vendidos
- Desglose de ingresos

---

## 💻 Comandos

```bash
npm run dev       # Desarrollo con hot-reload
npm run build     # Compilar a producción
npm start         # Ejecutar versión compilada
npm run lint      # Ejecutar ESLint
```

---

## 📁 Estructura del Proyecto

```
app/
├── components/        # Componentes reutilizables
├── dashboard/         # Página dashboard
├── hooks/             # Lógica personalizada
├── lib/               # Utilidades y tipos
├── pos/               # Sistema POS
├── store/             # Estado global (Jotai)
├── utils/             # Constantes y helpers
├── layout.tsx         # Root layout
└── page.tsx           # Página principal

docs/                  # Documentación completa
public/
├── icons/             # Iconos PWA
├── manifest.json      # Configuración PWA
└── sw.js              # Service Worker
```

---

## 🌐 Instalación como App

### Dispositivos Soportados
- ✅ Chrome/Android
- ✅ Safari/iOS (15+)
- ✅ Edge/Windows
- ✅ Firefox

### Cómo Instalar

**Chrome/Android:**
1. Abre la app
2. Menu ⋮ → "Instalar app"

**Safari/iOS:**
1. Abre en Safari
2. Compartir ↗️ → "Añadir a pantalla de inicio"

---

## 🔐 Seguridad y Privacidad

- ✅ **Datos locales**: Todo se almacena en el dispositivo
- ✅ **Sin servidor**: No se envían datos a servidores externos
- ✅ **HTTPS recomendado**: Para producción
- ✅ **Sin tracking**: No hay analíticas invasivas

---

## 📊 Características Futuras

- [ ] Notificaciones push
- [ ] Sincronización en background
- [ ] Múltiples usuarios
- [ ] Reportes avanzados
- [ ] Integración de pagos
- [ ] Multiidioma

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Diego Campanero** - Frontend Developer

---

## 📞 Soporte

¿Preguntas o problemas?

1. Revisa la [documentación](docs/README.md)
2. Consulta los [issues](https://github.com/tu-usuario/sistema-tickets-agave-maria-summer-festival-FE/issues)
3. Abre un nuevo issue si es necesario

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org) - Framework
- [Tailwind CSS](https://tailwindcss.com) - Estilos
- [React](https://react.dev) - Librería UI
- [Jotai](https://jotai.org) - State management
- [Dexie.js](https://dexie.org) - IndexedDB wrapper

---

**Hecho con ❤️ para Agave María Summer Festival**
