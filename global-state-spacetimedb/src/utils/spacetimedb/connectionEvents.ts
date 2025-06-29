import {Identity} from "@clockworklabs/spacetimedb-sdk";

export const connectionStatus = {
  isConnected: false,
  isSubscribed: false,
  error: null as Error | null,
  identity: null as Identity | null,
};

const connectionListeners = new Set<() => void>();
export const onConnectionChange = (callback: () => void) => {
  connectionListeners.add(callback);
  return () => connectionListeners.delete(callback);
};
export const notifyConnectionEstablished = () => {
  connectionListeners.forEach(callback => callback());
};
export const notifyConnectionDisconnected = () => {
  connectionListeners.forEach(callback => callback());
};
export const notifyConnectionError = () => {
  connectionListeners.forEach(callback => callback());
};