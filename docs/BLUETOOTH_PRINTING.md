# 🔵 Impresión Bluetooth (BLE)

## 📡 Librería

@capacitor-community/bluetooth-le

---

## 🔌 Conexión

- Auto detecta impresora
- Guarda deviceId
- Reconecta automáticamente

---

## 🧾 Impresión

- Formato ESC/POS
- Texto plano
- Envío en chunks

---

## ⚠️ Problemas comunes

### ❌ No imprime
- Characteristic incorrecto

### ❌ Texto raro
- Encoding UTF-8

---

## ✅ Solución

Usar:

Service:
0000ff00

Characteristic:
0000ff02

---

## ⚡ Buenas prácticas

- Usar chunks pequeños (~50 bytes)
- Delay entre writes
- Evitar acentos