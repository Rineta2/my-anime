import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
}

export function FetchUser(userId: string, callback: (user: User) => void) {
  const userDoc = doc(
    db,
    process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string,
    userId
  );

  return onSnapshot(userDoc, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        displayName: data.displayName || "",
        email: data.email || "",
        photoURL: data.photoURL || "",
        createdAt: data.createdAt?.toDate?.().toISOString() || "",
        updatedAt: data.updatedAt?.toDate?.().toISOString() || "",
      });
    }
  });
}
