export interface Anime {
  animeId: string;
  title: string;
  poster: string;
  type: string;
  score: string;
  status?: string;
  genres?: string;
  href: string;
  samehadakuUrl: string;
  genreList?: Genre[];
  estimation?: string;
  episodes?: string;
  releasedOn?: string;
}

export interface ScheduleDay {
  day: string;
  animeList: Anime[];
}

export interface AnimeList {
  schedule: {
    days: ScheduleDay[];
  };
  ongoing: {
    animeList: Anime[];
  };
  completed: {
    animeList: Anime[];
  };
  popular: {
    animeList: Anime[];
  };
  movies: {
    animeList: Anime[];
  };
  genres: {
    genreList: Genre[];
  };
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null;
}

export interface TransformedData {
  schedule: {
    days: ScheduleDay[];
  };
  ongoing: {
    animeList: Anime[];
  };
  completed: {
    animeList: Anime[];
  };
  popular: {
    animeList: Anime[];
  };
  movies: {
    animeList: Anime[];
  };
  genres: {
    genreList: Genre[];
  };
}

export interface TransformableItem {
  href?: string;
  samehadakuUrl?: string;
  animeList?: Anime[];
}

// Filter Props

export interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: string | null;
  onFilterChange: (value: string | null) => void;
}

// Schedule Filter Props

export interface ScheduleFilterProps {
  scheduleDays: ScheduleDay[];
  selectedDay: string | null;
  onFilterChange: (value: string | null) => void;
}

// Status Filter Props

export interface StatusFilterProps {
  selectedStatus: string | null;
  onFilterChange: (value: string | null) => void;
}

// Type Filter Props

export interface TypeFilterProps {
  selectedType: string | null;
  onFilterChange: (value: string | null) => void;
}

// Filter Sidebar Props

export interface FilterSidebarProps {
  genres: Genre[];
  scheduleDays: ScheduleDay[];
  selectedGenre: string | null;
  selectedDay: string | null;
  selectedStatus: string | null;
  selectedType: string | null;
  onFilterChange: (
    filterType: "genre" | "day" | "status" | "type",
    value: string | null
  ) => void;
}

// Anime Card Props

export interface AnimeCardProps {
  anime: Anime;
  showGenres?: boolean;
  showScore?: boolean;
  showEstimation?: boolean;
  showReleasedOn?: boolean;
}

// Anime Section Props

export interface AnimeSectionProps {
  title: string;
  animeList: Anime[];
  scheduleData?: ScheduleDay[];
  showEstimation?: boolean;
  showReleasedOn?: boolean;
}
