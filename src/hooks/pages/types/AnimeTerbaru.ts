export interface AnimeItem {
  title: string;
  poster: string;
  episodes: string;
  releasedOn: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  type?: string;
  score?: string;
  status?: string;
  genres?: Array<{ title: string; genreId: string; href: string }>;
}

export interface PaginationData {
  currentPage: number;
  hasPrevPage: boolean;
  prevPage: number | null;
  hasNextPage: boolean;
  nextPage: number;
  totalPages: number;
}

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: AnimeItem[];
  };
  pagination: PaginationData;
}

// Swiper

export interface SwiperProps {
  featuredAnime: ApiResponse["data"]["animeList"];
}

export interface SlideContentProps {
  anime: ApiResponse["data"]["animeList"][0];
}

// AnimeTerbaruLayout

export interface AnimeCardProps {
  anime: AnimeItem;
  index: number;
}

// PageHeader

export interface PageHeaderProps {
  title: string;
}

// SearchBar

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
