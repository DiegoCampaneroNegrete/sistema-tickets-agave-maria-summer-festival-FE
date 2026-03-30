import { useEffect, useState } from 'react'

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string>('')

  useEffect(() => {
    const stored = localStorage.getItem('deviceId')
    if (stored) {
        // TO DO VALIDATE
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeviceId(stored)
    } else {
      const newDeviceId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      localStorage.setItem('deviceId', newDeviceId)
      setDeviceId(newDeviceId)
    }
  }, [])

  return deviceId
}
