import {Activity, DbConnection} from "@/module_bindings";
import {getDbConnection} from '@/utils/spacetimedb/connectionFactory';
import {onSubscriptionApplied} from "@/utils/spacetimedb/connectionEvents";

class ActivityStore {
  private listeners: Set<() => void> = new Set();
  private connection: DbConnection | null = null;
  private cachedSnapshot: Activity[] = [];
  private serverSnapshot: Activity[] = [];

  constructor() {
    onSubscriptionApplied(() => {
      this.updateSnapshot();
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
    // Return server snapshot during SSR, as we are not able to retrieve data on the server
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
    if (this.connection) {
      this.cachedSnapshot = Array.from(this.connection.db.activity.iter());
      this.emitChange();
    }
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const activityStore = new ActivityStore();