import {Identity} from "@clockworklabs/spacetimedb-sdk";

const subscriptionListeners = new Set<() => void>();
export const onSubscriptionChange = (callback: () => void) => {
  subscriptionListeners.add(callback);
  return () => subscriptionListeners.delete(callback);
};
export const notifySubscriptionApplied = () => {
  subscriptionListeners.forEach(callback => callback());
};
export const notifySubscriptionError = () => {
  subscriptionListeners.forEach(callback => callback());
};
