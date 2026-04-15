/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { BleClient, textToDataView } from "@capacitor-community/bluetooth-le";

import {
  deviceIdAtom,
  deviceNameAtom,
  isConnectedAtom,
  isConnectingAtom,
} from "@/store/bluetoothStore";

const PRINTER_KEYWORDS = ["printer", "pos", "58", "80", "thermal"];
const SERVICE_UUID = "0000ff00-0000-1000-8000-00805f9b34fb";
const CHARACTERISTIC_UUID = "0000ff02-0000-1000-8000-00805f9b34fb";

export function useBluetooth() {
  const [deviceId, setDeviceId] = useAtom(deviceIdAtom);
  const [deviceName, setDeviceName] = useAtom(deviceNameAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);
  const [isConnecting, setIsConnecting] = useAtom(isConnectingAtom);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = async () => {
    await BleClient.initialize();
    autoConnect();
  };

  // 🔥 AUTO CONECTAR SI YA EXISTE
  const autoConnect = async () => {
    const savedDeviceId = localStorage.getItem("printer_device_id");

    if (savedDeviceId) {
      console.log("🔁 Auto connecting...");
      connect(savedDeviceId);
    } else {
      autoDetectPrinter();
    }
  };

  // 🔍 ESCANEAR Y DETECTAR
  const autoDetectPrinter = async () => {
    try {
      console.log("🔍 Scanning for printers...");
      setIsConnecting(true);

      const devices: any[] = [];

      await BleClient.requestLEScan({}, (result) => {
        console.log(
          "📱 Found device:",
          result.device.name || result.device.deviceId,
        );
        devices.push(result.device);
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await BleClient.stopLEScan();
      console.log(`📡 Total devices found: ${devices.length}`);

      const printer = devices.find((d) =>
        PRINTER_KEYWORDS.some((k) => d.name?.toLowerCase().includes(k)),
      );

      if (printer) {
        console.log("🖨️ Printer found:", printer.name);

        localStorage.setItem("printer_device_id", printer.deviceId);

        setDeviceId(printer.deviceId);
        setDeviceName(printer.name);

        await connect(printer.deviceId);
      } else {
        console.warn(
          "❌ No printer found. Available devices:",
          devices.map((d) => d.name || d.deviceId),
        );
        setIsConnecting(false);
      }
    } catch (err) {
      console.error("❌ Scan error:", err);
      setIsConnecting(false);
    }
  };

  // 🔌 CONECTAR
  const connect = async (id: string) => {
    try {
      setIsConnecting(true);

      await BleClient.connect(id, () => {
        console.log("🔴 Disconnected");
        setIsConnected(false);
        reconnect(id);
      });

      setDeviceId(id);
      setIsConnected(true);

      console.log("🟢 Connected to printer");
    } catch (err) {
      console.error("❌ Connection error", err);
    } finally {
      setIsConnecting(false);
    }
  };

  // 🔄 AUTO RECONNECT
  const reconnect = async (id: string) => {
    setTimeout(() => connect(id), 2000);
  };

  const printMessage = async () => {
    if (deviceId && deviceName) {
      await new Promise((r) => setTimeout(r, 1000)); // Esperar estabilización
      const message = "Hola desde Capacitor";
      const dataView = textToDataView(message);

      try {
        const services = await BleClient.getServices(deviceId);

        // 🔥 Buscar characteristic que permita escribir
        let writableChar: any = null;

        for (const service of services) {
          for (const char of service.characteristics) {
            if (char.properties.write || char.properties.writeWithoutResponse) {
              writableChar = {
                service: service.uuid,
                characteristic: char.uuid,
              };
              break;
            }
          }
          if (writableChar) break;
        }

        await BleClient.write(
          deviceId,
          writableChar.service,
          writableChar.characteristic,
          dataView,
        );
      } catch (error) {
        console.error("Error al escribir:", error);
      }

      await BleClient.disconnect(deviceId);
    }
  };

  const print = async (text: string) => {
    if (!deviceId) {
      throw new Error("No printer connected");
    }

    try {
      const cleanText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const encoder = new TextEncoder();
      const data = encoder.encode(cleanText);

      const chunkSize = 50;

      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const buffer = new ArrayBuffer(chunk.length);
        new Uint8Array(buffer).set(chunk);
        const dataView = new DataView(buffer);
        await BleClient.write(
          deviceId,
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          dataView,
        );
        await new Promise((res) => setTimeout(res, 30));
      }

      console.log("🧾 PRINT OK");
    } catch (err) {
      console.error("❌ Print error:", err);
      throw err;
    }
  };

  return {
    deviceId,
    isConnected,
    isConnecting,
    connect,
    autoDetectPrinter,
    print,
    printMessage,
  };
}
