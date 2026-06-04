import items from "../data/mockItems"
import type { Item } from "../types/Item"

export async function fakeFetchItems(): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(items);
    }, 1000);
  });
}