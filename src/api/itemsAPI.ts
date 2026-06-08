import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { Item } from "../types/Item";

export async function createTestItem(userId: string) {
  try {
    console.log("Attempting to write dummy item for user: ", userId);

    const docRef = await addDoc(
      collection(db, "users", userId, "items"), {
        name: "Test Item",
        category: "Testing",
        status: "Not Started",
        createdDate: new Date()
      }
    );
    console.log("Success! Document ID: ", docRef);
  } catch(error) {
    console.error("Firestore write failed: ", error);
  }
}

export async function fetchItems(userId: string): Promise<Item[]> {
  const snapshot = await getDocs(collection(db, "users", userId, "items"));

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      category: data.category,
      status: data.status,
      createdDate: data.createdDate.toDate()
    }
  });
}

export async function createDbItem(userId: string, name: string, category: string, status: Item["status"]): Promise<Item> {
  const date = new Date();
  const doc = await addDoc(collection(db, "users", userId, "items"), {
    name: name,
    category: category,
    status: status,
    createdDate: date
  });
  return {
    id: doc.id,
    name: name,
    category: category,
    status: status,
    createdDate: date
  }
}

export async function deleteDbItem(userId: string, itemId: string): Promise<void> {
  await(deleteDoc(doc(db, "users", userId, "items", itemId)));
}

export async function deleteDbItems(userId: string, itemIds: string[]): Promise<void> {
  for (const id of itemIds) {
    await(deleteDoc(doc(db, "users", userId, "items", id)));
  }
}


