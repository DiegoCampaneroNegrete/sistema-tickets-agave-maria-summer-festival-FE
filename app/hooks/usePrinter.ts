'use client'
// -------------------- TYPES --------------------
type OrderItem = {
  name: string
  quantity: number
  price: number
}

type Order = {
  id: string
  items: OrderItem[]
  total: number
  createdAt: string
}

// -------------------- CONFIG --------------------
type PrinterConfig = {
  width?: '58mm' | '80mm'
  copies?: number
  businessName?: string
}

// -------------------- HOOK --------------------
export function usePrinter(config?: PrinterConfig) {
  const {
    width = '58mm',
    copies = 2,
    businessName = 'Agave Maria'
  } = config || {}

  const getStyles = () => {
    const paperWidth = width === '58mm' ? '58mm' : '80mm'

    return `
      <style>
        @page { size: ${paperWidth} auto; margin: 0; }
        body {
          font-family: monospace;
          width: ${paperWidth};
          margin: 0;
          padding: 8px;
        }
        .center { text-align: center; }
        .row { display: flex; justify-content: space-between; }
        .divider { border-top: 1px dashed #000; margin: 8px 0; }
        .total { font-weight: bold; font-size: 16px; }
      </style>
    `
  }

  const renderTicket = (order: Order) => {
    return `
      <div>
        <div class="center">
          <h3>${businessName}</h3>
          <p>ID: ${order.id}</p>
          <p>${new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div class="divider"></div>

        ${order.items.map(item => `
          <div class="row">
            <span>${item.quantity} x ${item.name}</span>
            <span>$${item.price * item.quantity}</span>
          </div>
        `).join('')}

        <div class="divider"></div>

        <div class="row total">
          <span>Total</span>
          <span>$${order.total}</span>
        </div>

        <div class="center">
          <p>Gracias por tu compra 🍹</p>
        </div>
      </div>
    `
  }

  const print = (order: Order) => {
    const printWindow = window.open('', '', 'width=300,height=600')
    if (!printWindow) return

    const tickets = Array.from({ length: copies })
      .map(() => renderTicket(order))
      .join('<div style="page-break-after: always;"></div>')

    const content = `
      <html>
        <head>
          ${getStyles()}
        </head>
        <body>
          ${tickets}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `

    printWindow.document.write(content)
    printWindow.document.close()
  }

  return {
    print
  }
}

// -------------------- USO --------------------
// import { usePrinter } from '@/hooks/usePrinter'

// const { print } = usePrinter({ width: '58mm', copies: 2 })

// print(order)
