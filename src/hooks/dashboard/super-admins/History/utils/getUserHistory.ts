import { database } from "@/utils/firebase/firebase";

import { ref, onValue, off } from "firebase/database";

interface ViewHistory {
  title: string;
  poster: string;
  timestamp: number;
  href: string;
}

export const getUserHistory = (
  uid: string,
  callback: (history: ViewHistory[]) => void
): (() => void) => {
  try {
    const historyRef = ref(
      database,
      `users/${uid}/${process.env.NEXT_PUBLIC_DATABASE_HISTORY}`
    );

    const unsubscribe = onValue(historyRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const historyData = Object.values(snapshot.val()) as ViewHistory[];

      const sortedHistory = historyData.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      callback(sortedHistory);
    });

    return () => {
      off(historyRef);
      unsubscribe();
    };
  } catch (error) {
    console.error("Error setting up user history listener:", error);
    throw error;
  }
};
