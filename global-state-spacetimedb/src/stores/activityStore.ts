import {DbConnection} from "@/module_bindings";
import {getDbConnection} from '@/spacetimedb';

class ActivityStore {
  private listeners: Set<() => void> = new Set();
  private connection: DbConnection = getDbConnection();

  constructor() {
    this.connection.db.activity.onInsert(() => this.emitChange());
    this.connection.db.activity.onUpdate(() => this.emitChange());
    this.connection.db.activity.onDelete(() => this.emitChange());
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
    return Array.from(this.connection.db.activity.iter());
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const activityStore = new ActivityStore();