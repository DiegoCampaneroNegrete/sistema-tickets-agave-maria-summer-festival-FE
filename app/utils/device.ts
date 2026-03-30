// utils/device.ts
export const getDeviceId = () => {
  let id = localStorage.getItem('deviceId')

  if (!id) {
    id = `CAJA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    localStorage.setItem('deviceId', id)
  }

  return id
}