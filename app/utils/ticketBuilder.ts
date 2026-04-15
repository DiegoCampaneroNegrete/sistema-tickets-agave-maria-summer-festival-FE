type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
};

const LINE_WIDTH = 32;

const center = (text: string) => {
  const spaces = Math.floor((LINE_WIDTH - text.length) / 2);
  return " ".repeat(Math.max(0, spaces)) + text;
};

const line = () => "-".repeat(LINE_WIDTH);

const row = (left: string, right: string) => {
  const spaces = LINE_WIDTH - left.length - right.length;
  return left + " ".repeat(Math.max(1, spaces)) + right;
};

// 🔥 LIMPIAR ACENTOS (IMPORTANTE PARA BLE)
const clean = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// 🧾 GENERADOR DE UNA COPIA
const buildSingleTicket = (order: Order, label: string) => {
  const date = new Date(order.createdAt).toLocaleString();

  let t = "";

  t += "\x1B\x61\x01"; // center
  t += center("AGAVE MARIA") + "\n";
  t += center(label) + "\n";
  t += "\x1B\x61\x00";

  t += line() + "\n";

  t += `ID: ${order.id}\n`;
  t += `${date}\n`;

  t += line() + "\n";

  order.items.forEach((item) => {
    const name = `${item.quantity} x ${clean(item.name)}`;
    const price = `$${item.quantity * item.price}`;

    t += row(name, price) + "\n";
  });

  t += line() + "\n";

  t += "\x1B\x45\x01";
  t += row("TOTAL", `$${order.total}`) + "\n";
  t += "\x1B\x45\x00";

  t += line() + "\n";

  t += "\x1B\x61\x01";
  t += "GRACIAS POR TU COMPRA\n";
  t += "\x1B\x61\x00";

  return t;
};

export const buildTwoTicket = (order: Order, label: string) => {
  const date = new Date(order.createdAt).toLocaleString();

  let t = "";

  t += "\x1B\x61\x01"; // center
  t += center("AGAVE MARIA") + "\n";
  t += center(label) + "\n";
  t += "\x1B\x61\x00";

  t += line() + "\n";

  t += `ID: ${order.id}\n`;
  t += `${date}\n`;

  t += line() + "\n";

  order.items.forEach((item) => {
    const name = `${item.quantity} x ${clean(item.name)}`;
    const price = `$${item.quantity * item.price}`;

    t += row(name, price) + "\n";
  });

  t += line() + "\n";

  t += "\x1B\x45\x01";
  t += row("TOTAL", `$${order.total}`) + "\n";
  t += "\x1B\x45\x00";

  t += line() + "\n";

  t += "\x1B\x61\x01";
  t += "GRACIAS POR TU COMPRA\n";
  t += "\x1B\x61\x00";

  // ✂️ ESPACIO PARA CORTE
  t += "\n\n\n\n";

  // 🔥 SEPARADOR VISUAL FUERTE
  t += "\x1B\x61\x01";
  t += "==============================\n";
  t += "       COPIA INTERNA         \n";
  t += "==============================\n";
  t += "\x1B\x61\x00";

  t += "\x1B\x61\x01"; // center
  t += center("AGAVE MARIA") + "\n";
  t += center(label) + "\n";
  t += "\x1B\x61\x00";

  t += line() + "\n";

  t += `ID: ${order.id}\n`;
  t += `${date}\n`;

  t += line() + "\n";

  order.items.forEach((item) => {
    const name = `${item.quantity} x ${clean(item.name)}`;
    const price = `$${item.quantity * item.price}`;

    t += row(name, price) + "\n";
  });

  t += line() + "\n";

  t += "\x1B\x45\x01";
  t += row("TOTAL", `$${order.total}`) + "\n";
  t += line() + "\n";
  t += "\x1B\x45\x00";

  t += line() + "\n";
  t += line() + "\n";

  return t;
};

// 🧾 MAIN
export const buildTicket = (order: Order) => {
  let ticket = "";

  // 🧾 CLIENTE
  ticket += buildSingleTicket(order, "CLIENTE");

  // ✂️ ESPACIO PARA CORTE
  ticket += "\n\n\n\n";

  // 🔥 SEPARADOR VISUAL FUERTE
  ticket += "\x1B\x61\x01";
  ticket += "==============================\n";
  ticket += "       COPIA INTERNA         \n";
  ticket += "==============================\n";
  ticket += "\x1B\x61\x00";

  // 🕒 TIMESTAMP EXTRA (útil para control manual)
  const now = new Date().toLocaleTimeString();
  ticket += `HORA IMPRESION: ${now}\n`;

  ticket += "\n";

  // 🧾 CAJA
  ticket += buildSingleTicket(order, "CAJA");

  // ✂️ ESPACIO FINAL PARA CORTE
  ticket += "\n\n\n\n\n";

  // 🔪 CORTE (si la impresora lo soporta)
  ticket += "\x1D\x56\x41";
  ticket += "\n\n";
  return ticket;
};
