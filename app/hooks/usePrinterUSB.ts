// TO DO
// 'use client'

// export function usePrinterUSB() {
//   let device: USBDevice | null = null

//   const connect = async () => {
//     device = await navigator.usb.requestDevice({
//       filters: [{ vendorId: 0x04b8 }] // Epson (puedes ajustar)
//     })

//     await device.open()
//     await device.selectConfiguration(1)
//     await device.claimInterface(0)
//   }

//   const print = async (text: string) => {
//     if (!device) throw new Error('Printer not connected')

//     const encoder = new TextEncoder()
//     const data = encoder.encode(text)

//     await device.transferOut(1, data)
//   }

//   return { connect, print }
// }