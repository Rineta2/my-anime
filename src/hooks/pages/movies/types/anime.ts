export interface AnimeResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: AnimeData;
  error?: string;
}

export interface AnimeData {
  animeList: Anime[];
  pagination: Pagination;
}

export interface Anime {
  title: string;
  poster: string;
  type: string;
  score: string;
  status: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  genreList: Genre[];
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
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

export interface Pagination {
  currentPage: number;
  hasPrevPage: boolean;
  prevPage: number | null;
  hasNextPage: boolean;
  nextPage: number | null;
  totalPages: number;
}
