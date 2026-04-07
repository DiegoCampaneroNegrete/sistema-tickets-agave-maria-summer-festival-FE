type Item = {
  name: string;
  qty: number;
  price: number;
};

type TicketData = {
  businessName: string;
  address: string;
  items: Item[];
  total: number;
  paid: number;
  change: number;
  folio: string;
  date: string;
};

export function generateTicket(data: TicketData) {
    const ESC = '\x1B';
const CENTER = ESC + 'a' + '\x01';
const LEFT = ESC + 'a' + '\x00';
const BOLD_ON = ESC + 'E' + '\x01';
const BOLD_OFF = ESC + 'E' + '\x00';
  const lineWidth = 32; // 58mm (usa 48 para 80mm)

  const center = (text: string) => {
    const spaces = Math.floor((lineWidth - text.length) / 2);
    return ' '.repeat(Math.max(spaces, 0)) + text;
  };

  const separator = '-'.repeat(lineWidth);

  const formatItem = (item: Item) => {
    const name = item.name.slice(0, 16);
    const qty = item.qty.toString();
    const price = `$${(item.price * item.qty).toFixed(2)}`;

    return `${name}\n${qty} x ${item.price}   ${price}`;
  };

  let ticket = '';

  // HEADER
//   ticket += center(data.businessName) + '\n';
//   ticket += center(data.address) + '\n';
//   ticket += '\n';
ticket += CENTER;
ticket += BOLD_ON;
ticket += data.businessName + '\n';
ticket += BOLD_OFF;
ticket += data.address + '\n';
ticket += LEFT;

  // INFO
  ticket += `Folio: ${data.folio}\n`;
  ticket += `Fecha: ${data.date}\n`;
  ticket += separator + '\n';

  // ITEMS
  data.items.forEach((item) => {
    ticket += formatItem(item) + '\n';
  });

  ticket += separator + '\n';
  center('*** AGAVE MARIA ***')

  // TOTAL
  ticket += `TOTAL: $${data.total.toFixed(2)}\n`;
  ticket += `PAGO: $${data.paid.toFixed(2)}\n`;
  ticket += `CAMBIO: $${data.change.toFixed(2)}\n`;

  ticket += '\n';
  ticket += center('GRACIAS POR SU COMPRA') + '\n';
  ticket += center('VUELVA PRONTO') + '\n';

  ticket += '\n\n\n'; // espacio para corte

  ticket += '\x1D\x56\x00'; // corte
  return ticket;
}