export interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
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

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: Anime[];
  };
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

export interface PageProps {
  params: Promise<{
    genres: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export interface GenrePageClientProps {
  genres: string;
  animeList: Anime[];
  currentPage: number;
  totalPages: number;
}
