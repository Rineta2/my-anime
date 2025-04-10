export interface BookmarkAnime {
  title: string;
  poster: string;
  timestamp: number;
  href: string;
  animeSlug: string;
  totalEpisodes: string;
  status: string;
  type: string;
}

export interface BookmarkResponse {
  title: string;
  poster: string;
  episodeNumber: string;
  totalEpisodes: string;
  timestamp: number;
  href: string;
  episodeSlug: string;
}

export interface BookmarkModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export interface BookmarkData {
  bookmarks: BookmarkAnime[];
  isLoading: boolean;
  error: Error | null;
}
