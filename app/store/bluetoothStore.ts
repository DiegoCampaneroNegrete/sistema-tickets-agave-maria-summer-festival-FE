import { atom } from 'jotai';

export const deviceIdAtom = atom<string | null>(null);
export const deviceNameAtom = atom<string | null>(null);
export const isConnectedAtom = atom(false);
export const isConnectingAtom = atom(false);