import { database } from "./firebase";
import { ref, push, set, remove, get } from "firebase/database";
import { UserAccount } from "@/utils/context/interface/Auth";
import { Episode } from "@/components/ui/home/ui/anime/pages/episode/types/types";

interface EpisodeBookmark {
  title: string;
  poster: string;
  timestamp: number;
  href: string;
  episodeSlug: string;
  episodeNumber: string;
}

export const addToEpisodeBookmarks = async (
  user: UserAccount,
  episode: Episode,
  episodeSlug: string
) => {
  if (!user) return;

  try {
    const bookmarksRef = ref(database, `users/${user.uid}/episode_bookmarks`);
    const newBookmarkRef = push(bookmarksRef);

    const episodeNumber = episodeSlug.split("-").pop() || "1";

    const bookmarkData: EpisodeBookmark = {
      title: episode.title,
      poster: episode.poster,
      timestamp: Date.now(),
      href: `/episode/${episodeSlug}`,
      episodeSlug: episodeSlug,
      episodeNumber: `Episode ${episodeNumber}`,
    };

    await set(newBookmarkRef, bookmarkData);
    return true;
  } catch (error) {
    console.error("Error adding to episode bookmarks:", error);
    return false;
  }
};

export const removeFromEpisodeBookmarks = async (
  user: UserAccount,
  episodeSlug: string
) => {
  if (!user) return;

  try {
    const bookmarksRef = ref(database, `users/${user.uid}/episode_bookmarks`);
    const snapshot = await get(bookmarksRef);

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const bookmark = childSnapshot.val();
        if (bookmark.episodeSlug === episodeSlug) {
          remove(childSnapshot.ref);
        }
      });
    }
    return true;
  } catch (error) {
    console.error("Error removing from episode bookmarks:", error);
    return false;
  }
};

export const isEpisodeBookmarked = async (
  user: UserAccount,
  episodeSlug: string
): Promise<boolean> => {
  if (!user) return false;

  try {
    const bookmarksRef = ref(database, `users/${user.uid}/episode_bookmarks`);
    const snapshot = await get(bookmarksRef);

    if (snapshot.exists()) {
      let isBookmarked = false;
      snapshot.forEach((childSnapshot) => {
        const bookmark = childSnapshot.val();
        if (bookmark.episodeSlug === episodeSlug) {
          isBookmarked = true;
        }
      });
      return isBookmarked;
    }
    return false;
  } catch (error) {
    console.error("Error checking episode bookmark status:", error);
    return false;
  }
};
