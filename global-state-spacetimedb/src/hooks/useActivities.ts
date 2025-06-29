import { useSyncExternalStore } from "react";
import { activityStore } from "@/stores/activityStore";

export function useActivities() {
  const activities = useSyncExternalStore(
    (callback) => activityStore.subscribe(callback),
    () => activityStore.getSnapshot()
  );
  return activities;
}