import {DbConnection} from "@/module_bindings";
import {connectionStatus, onConnectionChange} from "@/utils/spacetimedb/connectionEvents";

class ConnectionStore {
  private listeners: Set<() => void> = new Set();
  private connection: DbConnection | null = null;

  constructor() {
    onConnectionChange(() => {
      this.emitChange();
    });
  }

  public subscribe(onStoreChange: () => void) {
    this.listeners.add(onStoreChange);
    return () => {
      // Cleanup on unmount
      this.listeners.delete(onStoreChange);
    };
  }

  public getSnapshot() {
    return connectionStatus;
  }

  public getServerSnapshot() {
    // Return server snapshot during SSR, as we are not able to retrieve data on the server
    return connectionStatus;
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const connectionStore = new ConnectionStore();