import { BleClient } from '@capacitor-community/bluetooth-le';

let initialized = false;

export async function initBluetooth() {
  if (initialized) return;

  await BleClient.initialize();
  initialized = true;

  console.log('🔵 Bluetooth initialized');
}