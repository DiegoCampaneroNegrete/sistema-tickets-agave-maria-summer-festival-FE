# 💻 Guía de Desarrollo

## 🏗️ Configuración del Entorno

### Visual Studio Code (Recomendado)

#### Extensiones Útiles
- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **TypeScript Vue Plugin** - Vue.volar
- **Prettier** - esbenp.prettier-vscode
- **ESLint** - dbaeumer.vscode-eslint
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss

#### Configuración Recomendada
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

---

## 📝 Estructura de Código

### Componentes React

```typescript
// app/components/MiComponente.tsx
'use client' // Solo si usa hooks

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title: string
}

export default function MiComponente({ children, title }: Props) {
  return (
    <div className="...">
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

### Custom Hooks

```typescript
// app/hooks/useMiHook.ts
import { useState } from 'react'

export function useMiHook() {
  const [estado, setEstado] = useState(false)

  const toggle = () => setEstado(!estado)

  return {
    estado,
    toggle
  }
}
```

### Types TypeScript

```typescript
// app/lib/types.ts
export type MiTipo = {
  id: string
  nombre: string
  precio: number
}
```

---

## 🎨 Tailwind CSS

### Clases Útiles

```typescript
// Responsive
className="block md:hidden"        // Visible solo en móvil
className="hidden lg:flex"         // Oculto en móvil, visible en desktop

// Tema Oscuro
className="bg-white dark:bg-gray-900" // Blanco claro, gris oscuro
className="text-black dark:text-white"

// Flexbox
className="flex justify-between items-center"
className="grid grid-cols-2 gap-4"

// Espaciado
className="p-4 m-2"                // Padding y margin
className="mb-4"                   // Margin bottom
```

### Crear Componentes con Estilos

```typescript
export default function Card({ title, children }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}
```

---

## 🎯 Trabajar con State

### Jotai (Global State)

```typescript
// Definir
import { atom } from 'jotai'
export const miAtom = atom<string>('valor inicial')

// Usar
import { useAtom } from 'jotai'
const [valor, setValor] = useAtom(miAtom)
```

### useState (Local State)

```typescript
const [count, setCount] = useState(0)
```

### useEffect (Side Effects)

```typescript
useEffect(() => {
  console.log('Component mounted')
  return () => console.log('Component unmounted')
}, []) // Array vacío = solo al montar
```

---

## 💾 Base de Datos (Dexie.js)

### Query

```typescript
// Toda la tabla
const orders = await db.table('orders').toArray()

// Por clave
const order = await db.table('orders').get(1)

// Con filtro
const recent = await db.table('orders')
  .where('createdAt')
  .above(new Date('2024-01-01'))
  .toArray()
```

### Insert

```typescript
await db.table('orders').add({
  id: '1',
  items: [],
  total: 100,
  createdAt: new Date().toISOString()
})
```

### Update

```typescript
await db.table('orders').update(1, { total: 150 })
```

### Delete

```typescript
await db.table('orders').delete(1)
```

---

## 🔍 Debugging

### Logs en Navegador
```typescript
console.log('Mi valor:', valor)
console.warn('Advertencia')
console.error('Error crítico')
```

### DevTools
1. F12 → Console → Ver logs
2. F12 → Application → IndexedDB → Ver datos
3. F12 → Application → Service Workers → Ver SW

### Breakpoints en VSCode
```typescript
debugger; // Se pausará aquí en DevTools
```

---

## ✅ Testing (Futuro)

Cuando agreguemos tests, usaremos:
```bash
npm run test
```

---

## 📤 Antes de Hacer Commit

1. **Lint**: `npm run lint`
2. **Build**: `npm run build`
3. **Manual test**: Prueba en navegador

---

## 🚀 Deployment

### En Vercel (Recomendado)
1. Push a GitHub
2. Conectar repo en [vercel.com](https://vercel.com)
3. Click Deploy

### Local (Producción)
```bash
npm run build
npm start
```

---

## 📚 Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Jotai Docs](https://jotai.org/docs/introduction)
