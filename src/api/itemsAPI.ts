import { collection, addDoc, getDocs } from "firebase/firestore";
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