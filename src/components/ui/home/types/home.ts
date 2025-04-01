// Anime Terbaru
export interface Anime {
  title: string;
  poster: string;
  href: string;
  episodes: string;
  releasedOn: string;
  animeId: string;
  // Additional fields
  status?: string;
  type?: string;
  duration?: string;
  score?: {
    value: string;
    users: string;
  };
  studios?: string;
  producers?: string;
  genres?: Genre[];
  episodeList?: Episode[];
}

// Batch
export interface Bath {
  title: string;
  poster: string;
  episodes: string;
  releasedOn: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
}

// Movie
export interface Movie {
  title: string;
  poster: string;
  releaseDate: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  genreList: Genre[];
}

export interface Genre {
  genreId: string;
  title: string;
  href: string;
  samehadakuUrl: string;
}

export interface Episode {
  title: number;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}

export interface AnimeMovieData {
  animeId: string;
  title: string;
  poster: string;
  releaseDate: string;
  genreList: Genre[];
}

export interface AnimeResponse {
  data: {
    recent: {
      animeList: Anime[];
    };
    batch: {
      batchList: Bath[];
    };
    movie: {
      animeList: AnimeMovieData[];
    };
  };
}
