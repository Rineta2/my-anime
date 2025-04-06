import { database } from "./firebase";

import { ref, push, set } from "firebase/database";

import { UserAccount } from "@/utils/context/interface/Auth";

import { Episode } from "@/components/ui/home/ui/anime/pages/episode/types/types";

interface ViewHistory {
  title: string;
  poster: string;
  timestamp: number;
  href: string;
}

const VIEWED_EPISODES_KEY = process.env
  .NEXT_PUBLIC_LOCAL_STORAGE_VIEWED_EPISODES as string;

export const addToViewHistory = async (
  user: UserAccount,
  episode: Episode,
  episodeSlug: string
) => {
  if (!user) return;

  try {
    // Get viewed episodes from localStorage
    const viewedEpisodes = JSON.parse(
      localStorage.getItem(VIEWED_EPISODES_KEY) || "[]"
    );

    // Check if episode is already viewed
    if (viewedEpisodes.includes(episodeSlug)) {
      return;
    }

    const historyRef = ref(
      database,
      `users/${user.uid}/${process.env.NEXT_PUBLIC_DATABASE_HISTORY}`
    );
    const newHistoryRef = push(historyRef);

    const historyData: ViewHistory = {
      title: episode.title,
      poster: episode.poster,
      timestamp: Date.now(),
      href: `/episode/${episodeSlug}`,
    };

    await set(newHistoryRef, historyData);

    // Add episode to viewed episodes list
    viewedEpisodes.push(episodeSlug);
    localStorage.setItem(VIEWED_EPISODES_KEY, JSON.stringify(viewedEpisodes));
  } catch (error) {
    console.error("Error adding to view history:", error);
  }
};
