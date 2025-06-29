import { useSyncExternalStore } from "react";
import { categoryStore } from "@/stores/categoryStore";

export function useCategories() {
  const categories = useSyncExternalStore(
    (callback) => categoryStore.subscribe(callback),
    () => categoryStore.getSnapshot(),
    () => categoryStore.getServerSnapshot()
  );
  return categories;
}