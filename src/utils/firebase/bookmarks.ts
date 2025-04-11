import { database } from "./firebase";
import { ref, push, set, remove, onValue, off } from "firebase/database";
import { UserAccount } from "@/utils/context/interface/Auth";

export interface Bookmark {
  title: string;
  poster: string;
  episodes?: string;
  href: string;
  timestamp: number;
}

export const addBookmark = async (
  user: UserAccount,
  bookmark: Omit<Bookmark, "timestamp">
) => {
  if (!user) return;

  try {
    const bookmarksRef = ref(database, `users/${user.uid}/bookmarks`);
    const newBookmarkRef = push(bookmarksRef);

    const bookmarkData: Bookmark = {
      ...bookmark,
      timestamp: Date.now(),
    };

    await set(newBookmarkRef, bookmarkData);
    return true;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return false;
  }
};

export const removeBookmark = async (user: UserAccount, bookmarkId: string) => {
  if (!user) return;

  try {
    const bookmarkRef = ref(
      database,
      `users/${user.uid}/bookmarks/${bookmarkId}`
    );
    await remove(bookmarkRef);
    return true;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return false;
  }
};

export const getBookmarks = (
  user: UserAccount,
  callback: (bookmarks: { [key: string]: Bookmark }) => void
) => {
  if (!user) return;

  const bookmarksRef = ref(database, `users/${user.uid}/bookmarks`);

  onValue(bookmarksRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  });

  return () => off(bookmarksRef);
};
