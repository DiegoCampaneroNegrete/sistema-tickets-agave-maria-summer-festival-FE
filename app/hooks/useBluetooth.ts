/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { useAtom } from 'jotai';
import {
  deviceIdAtom,
  deviceNameAtom,
  isConnectedAtom,
  isConnectingAtom,
} from '@/store/bluetoothStore';

const PRINTER_KEYWORDS = ['printer', 'pos', '58', '80', 'thermal'];

export function useBluetooth() {
  const [deviceId, setDeviceId] = useAtom(deviceIdAtom);
  const [, setDeviceName] = useAtom(deviceNameAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);
  const [isConnecting, setIsConnecting] = useAtom(isConnectingAtom);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await BleClient.initialize();
    autoConnect();
  };

  // 🔥 AUTO CONECTAR SI YA EXISTE
  const autoConnect = async () => {
    const savedDeviceId = localStorage.getItem('printer_device_id');

    if (savedDeviceId) {
      console.log('🔁 Auto connecting...');
      connect(savedDeviceId);
    } else {
      autoDetectPrinter();
    }
  };

  // 🔍 ESCANEAR Y DETECTAR
  const autoDetectPrinter = async () => {
    try {
      console.log('🔍 Scanning for printers...');
      setIsConnecting(true);

      const devices: any[] = [];

      await BleClient.requestLEScan({}, (result) => {
        console.log('📱 Found device:', result.device.name || result.device.deviceId);
        devices.push(result.device);
      });

      await new Promise(resolve => setTimeout(resolve, 5000));
      
      await BleClient.stopLEScan();
      console.log(`📡 Total devices found: ${devices.length}`);

      const printer = devices.find((d) =>
        PRINTER_KEYWORDS.some((k) =>
          d.name?.toLowerCase().includes(k)
        )
      );

      if (printer) {
        console.log('🖨️ Printer found:', printer.name);

        localStorage.setItem('printer_device_id', printer.deviceId);

        setDeviceId(printer.deviceId);
        setDeviceName(printer.name);

        await connect(printer.deviceId);
      } else {
        console.warn('❌ No printer found. Available devices:', devices.map(d => d.name || d.deviceId));
        setIsConnecting(false);
      }
    } catch (err) {
      console.error('❌ Scan error:', err);
      setIsConnecting(false);
    }
  };

  // 🔌 CONECTAR
  const connect = async (id: string) => {
    try {
      setIsConnecting(true);

      await BleClient.connect(id, () => {
        console.log('🔴 Disconnected');
        setIsConnected(false);
        reconnect(id);
      });

      setDeviceId(id);
      setIsConnected(true);

      console.log('🟢 Connected to printer');
    } catch (err) {
      console.error('❌ Connection error', err);
    } finally {
      setIsConnecting(false);
    }
  };

  // 🔄 AUTO RECONNECT
  const reconnect = async (id: string) => {
    setTimeout(() => connect(id), 2000);
  };

  return {
    deviceId,
    isConnected,
    isConnecting,
    connect,
    autoDetectPrinter,
  };
}