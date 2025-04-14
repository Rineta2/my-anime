import {
  collection,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { Price } from "@/hooks/pages/purchase/types/price";

export function FetchPrice(callback: (price: Price[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRICE as string)
  );

  return onSnapshot(q, (snapshot) => {
    const prices: Price[] = snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        createdAt: data.createdAt?.toDate?.().toISOString() || "",
        discount: data.discount || "",
        labelDisc: data.labelDisc || null,
        list: data.list || [],
        originalPrice: data.originalPrice || null,
        title: data.title || "",
        updatedAt: data.updatedAt?.toDate?.().toISOString() || "",
      } as Price;
    });
    callback(prices);
  });
}
