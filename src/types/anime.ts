export interface Anime {
  animeId: string;
  title: string;
  poster: string;
  type: string;
  score: string;
  status: string;
  genres?: string;
  href: string;
  samhadakuUrl: string;
  genreList?: Genre[];
  estimaion?: string;
  episoes?: string;
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
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}
