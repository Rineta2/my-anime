import { database } from "@/utils/firebase/firebase";

import { ref, onValue, off } from "firebase/database";

interface ViewBookmarks {
  title: string;
  poster: string;
  timestamp: number;
  href: string;
}

export const getUserBookmarks = (
  uid: string,
  callback: (bookmarks: ViewBookmarks[]) => void
): (() => void) => {
  try {
    const bookmarksRef = ref(
      database,
      `users/${uid}/${process.env.NEXT_PUBLIC_DATABASE_BOOKMARKS}`
    );

    const unsubscribe = onValue(bookmarksRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const bookmarksData = Object.values(snapshot.val()) as ViewBookmarks[];

      const sortedBookmarks = bookmarksData.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      callback(sortedBookmarks);
    });

    return () => {
      off(bookmarksRef);
      unsubscribe();
    };
  } catch (error) {
    console.error("Error setting up user Bookmarks listener:", error);
    throw error;
  }
};
