import {DbConnection} from "@/module_bindings";
import {getDbConnection, onConnectionEstablished, onSubscriptionApplied} from '@/spacetimedb';

class ActivityStore {
  private listeners: Set<() => void> = new Set();
  private connection: DbConnection | null = null;
  private cachedSnapshot: any[] = [];
  private serverSnapshot: any[] = [];

  constructor() {
    // Listen for subscription completion to update initial data
    onSubscriptionApplied(() => {
      console.log('Subscription applied - updating snapshot');
      this.updateSnapshot();
    });
  }

  private getConnection(): DbConnection {
    if (!this.connection) {
      this.connection = getDbConnection();
      // Set up event listeners only once
      this.connection.db.activity.onInsert((ctx, row) => {
        console.log("Inserting activity: ", row.name, " (", row.id, ")")
        this.updateSnapshot()
      });
      this.connection.db.activity.onUpdate((ctx, oldRow, newRow) => {
        console.log("Updating activity: ", oldRow.name, " (", oldRow.id, ") to ", newRow.name, " (", newRow.id, ")")
        this.updateSnapshot()
      });
      this.connection.db.activity.onDelete((ctx, row) => {
        console.log("Deleting activity: ", row.name, " (", row.id, ")")
        this.updateSnapshot()
      });
    }
    return this.connection;
  }

  private updateSnapshot() {
    try {
      if (this.connection) {
        console.log('[Client] ' + this.connection.db.activity.count() + ' activities loaded.');
        this.cachedSnapshot = Array.from(this.connection.db.activity.iter());
        this.emitChange();
      }
    } catch (error) {
      console.warn('Failed to update activities snapshot:', error);
    }
  }

  // The method React will use to subscribe to changes.
  subscribe(onStoreChange: () => void) {
    this.listeners.add(onStoreChange);
    return () => {
      this.listeners.delete(onStoreChange); // Cleanup on unmount
    };
  }

  // The method React will use to get the current data.
  getSnapshot() {
    try {
      // Ensure connection is established
      this.getConnection();
      console.log('[Client] Getting activities snapshot...');
      return this.cachedSnapshot;
    } catch (error) {
      // Return server snapshot if connection fails (e.g., during SSR)
      console.warn('Failed to get activities:', error);
      return this.serverSnapshot;
    }
  }

  // Server snapshot - returns cached empty array
  getServerSnapshot() {
    console.log('[Server] Getting activities snapshot...');
    return this.serverSnapshot;
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const activityStore = new ActivityStore();