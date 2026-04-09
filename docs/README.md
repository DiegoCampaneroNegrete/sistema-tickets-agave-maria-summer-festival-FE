# 🍹 Agave Maria POS - Festival System

Sistema de punto de venta (POS) offline para festivales, optimizado para velocidad, estabilidad y operación en campo.

## 🚀 Features

- 🧾 Generación de tickets térmicos (ESC/POS)
- 📱 Compatible con Android (APK vía Capacitor)
- 🔵 Conexión Bluetooth (BLE)
- 💾 Persistencia local (offline-first)
- ⚡ Flujo ultra rápido para eventos
- 🧠 Auto reconexión de impresora

---

## 📦 Stack

- React + Next.js (exportado a SPA)
- Capacitor (Android)
- TailwindCSS
- Jotai (state management)
- Bluetooth LE (impresión)

---

## 🧾 Flujo básico

1. Agregar productos al carrito
2. Generar orden
3. Imprimir ticket (cliente + caja)
4. Guardar en base local

---

## ⚠️ Importante

- No depende de internet
- No usa backend
- Diseñado para alta demanda (festivales)

---

## 🛠️ Comandos

```bash
npm install
npm run build
npx cap sync android
npx cap open android