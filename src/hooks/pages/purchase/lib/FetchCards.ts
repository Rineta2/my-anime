import {
  collection,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import { Card } from "../types/price";

export function FetchCards(callback: (cards: Card[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CARD as string)
  );

  return onSnapshot(q, (snapshot) => {
    const cards: Card[] = snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        createdAt: data.createdAt?.toDate?.().toISOString() || "",
        imageUrl: data.imageUrl || "",
        name: data.name || "",
        number: data.number || 0,
        title: data.title || "",
        updatedAt: data.updatedAt?.toDate?.().toISOString() || "",
      } as Card;
    });
    callback(cards);
  });
}
