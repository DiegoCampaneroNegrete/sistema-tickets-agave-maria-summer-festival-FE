# Guía de Compilación y Despliegue - PWA

## Requisitos
- Node.js 20+ instalado
- npm o yarn

## Instalación de Dependencias
Si aún no las has instalado, ejecuta:
```bash
npm install
```

## Compilar la Aplicación (Build)

Para compilar la aplicación a producción y generar la PWA:

```bash
npm run build
```

Esto va a:
1. Compilar toda la aplicación Next.js con Turbopack
2. Incluir el Service Worker manual (`/public/sw.js`)
3. Crear los archivos estáticos optimizados en la carpeta `.next`

## Ejecutar en Producción

Después de compilar, puedes ejecutar la aplicación compilada:

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:3000**

## Desarrollo Local

Para desarrollo con hot-reload:

```bash
npm run dev
```

## Archivos Clave para PWA

- **`/public/manifest.json`** - Configuración de la PWA (nombre, iconos, atajos)
- **`/public/sw.js`** - Service Worker manual (caché y offline)
- **`/next.config.js`** - Configuración de Next.js
- **`/app/layout.tsx`** - Metadatos y Service Worker Registration
- **`/app/components/ServiceWorkerRegister.tsx`** - Componente que registra el Service Worker

## Características PWA Habilitadas

✅ Installable en dispositivos
✅ Funciona offline (con caché)
✅ Service Worker automático
✅ Almacenamiento en caché
✅ Tema oscuro soportado
✅ Responsive design
✅ Usar Turbopack (compilación rápida)

## Instalación como App

Una vez compilada y desplegada:

1. **Chrome/Android**: Menu ⋮ → "Instalar app"
2. **iOS/Safari**: Compartir → "Añadir a pantalla de inicio"
3. **Desktop**: El navegador mostrará un aviso de instalación

## Notas de Compilación

- El Service Worker se registra **solo en producción** (verifica `NODE_ENV`)
- La consola se limpia automáticamente en producción
- Se usa Turbopack para compilación rápida
- El caché funciona con estrategia "Network First"

## Troubleshooting

**¿La PWA no aparece para instalar?**
- Verifica que `manifest.json` esté correctamente configurado
- Comprueba que el Service Worker esté registrado en el navegador (DevTools → Application → Service Workers)
- Asegúrate de estar en HTTPS en producción (PWA requiere HTTPS)

**¿El caché no funciona?**
- En desarrollo, el Service Worker está deshabilitado (por diseño)
- En producción (después de `npm build` + `npm start`), debería funcionar
- Limpia el caché del navegador si es necesario

