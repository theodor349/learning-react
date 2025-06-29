import {DbConnection} from "@/module_bindings";
import {getDbConnection, onConnectionEstablished, onSubscriptionApplied} from '@/spacetimedb';

class ActivityStore {
  private listeners: Set<() => void> = new Set();
  private connection: DbConnection | null = null;
  private cachedSnapshot: any[] = [];
  private serverSnapshot: any[] = [];

  constructor() {
    onSubscriptionApplied(() => {
      this.updateSnapshot();
    });
  }

  public subscribe(onStoreChange: () => void) {
    this.listeners.add(onStoreChange);
    return () => {
      this.listeners.delete(onStoreChange); // Cleanup on unmount
    };
  }

  public getSnapshot() {
    try {
      this.getConnection();
      return this.cachedSnapshot;
    } catch (error) {
      // Return server snapshot if connection fails (e.g., during SSR)
      console.warn('Failed to get activities:', error);
      return this.serverSnapshot;
    }
  }

  public getServerSnapshot() {
    return this.serverSnapshot;
  }

  private getConnection(): DbConnection {
    if (!this.connection) {
      this.connection = getDbConnection();
      this.connection.db.activity.onInsert((ctx, row) => this.updateSnapshot());
      this.connection.db.activity.onUpdate((ctx, oldRow, newRow) => this.updateSnapshot());
      this.connection.db.activity.onDelete((ctx, row) => this.updateSnapshot());
    }
    return this.connection;
  }

  private updateSnapshot() {
    try {
      if (this.connection) {
        this.cachedSnapshot = Array.from(this.connection.db.activity.iter());
        this.emitChange();
      }
    } catch (error) {
      console.warn('Failed to update activities snapshot:', error);
    }
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const activityStore = new ActivityStore();