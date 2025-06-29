import {ConnectionStatus} from "@/utils/spacetimedb/connectionHandlers";
import {Identity} from "@clockworklabs/spacetimedb-sdk";

const connectionListeners = new Set<() => void>();
const subscriptionListeners = new Set<() => void>();

export const connectionStatus: ConnectionStatus = {
  isConnected: false,
  isSubscribed: false,
  error: null as Error | null,
  identity: null as Identity | null,
};

export const onConnectionEstablished = (callback: () => void) => {
  connectionListeners.add(callback);
  return () => connectionListeners.delete(callback);
};
export const onSubscriptionApplied = (callback: () => void) => {
  subscriptionListeners.add(callback);
  return () => subscriptionListeners.delete(callback);
};

export const notifyConnectionEstablished = () => {
  connectionListeners.forEach(callback => callback());
};
export const notifySubscriptionApplied = () => {
  subscriptionListeners.forEach(callback => callback());
};

