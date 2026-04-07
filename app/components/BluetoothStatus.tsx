'use client';

import { useBluetooth } from '@/hooks/useBluetooth';
import { useAtom } from 'jotai';
import { deviceNameAtom } from '@/store/bluetoothStore';

export default function BluetoothStatus() {
  const { isConnected, isConnecting, autoDetectPrinter } = useBluetooth();
  const [deviceName] = useAtom(deviceNameAtom);

  const handleScan = async () => {
    console.log('🔍 Iniciando escaneo...');
    await autoDetectPrinter();
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-2xl">
          {isConnecting ? '🔄' : isConnected ? '🟢' : '🔴'}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-sm">
            {isConnecting ? 'Escaneando impresoras...' : isConnected ? 'Impresora conectada' : 'Sin impresora'}
          </p>
          {deviceName && (
            <p className="text-xs text-gray-600 dark:text-gray-400">{deviceName}</p>
          )}
          {!isConnected && !isConnecting && (
            <p className="text-xs text-orange-600 dark:text-orange-400">
              Puedes hacer cobros sin impresora
            </p>
          )}
        </div>
      </div>
      
      <button
        onClick={handleScan}
        disabled={isConnecting}
        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap ml-2"
      >
        {isConnecting ? 'Escaneando...' : 'Escanear'}
      </button>
    </div>
  );
}