// Anime Terbaru
export interface Anime {
  title: string;
  poster: string;
  href: string;
  episode: string;
  type: string;
  subtitle: string;
  releasedOn: string;
  animeId: string;
  // Additional fields
  status?: string;
  duration?: string;
  score?: {
    value: string;
    users: string;
  };
  studios?: string;
  animeList?: Anime[];
  producers?: string;
  genres?: Genre[];
  episodeList?: Episode[];
}

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
  href: string;
  samehadakuUrl: string;
  genreList: Genre[];
}

export interface AnimeResponse {
  data: {
    recent: {
      animeList: Anime[];
    };
    schedule: {
      weekly: ScheduleSection;
      monthly: ScheduleSection;
      allTime: ScheduleSection;
    };
  };
}

export interface ScheduleAnime {
  title: string;
  poster: string;
  animeId: string;
  href: string;
  genres: string[];
  rating: number | null;
}

export interface ScheduleSection {
  animeList: ScheduleAnime[];
}

export interface Schedule {
  weekly: ScheduleSection;
  monthly: ScheduleSection;
  allTime: ScheduleSection;
}

export interface ScheduleResponse {
  data: {
    schedule: Schedule;
  };
}

export interface RecentAnime {
  title: string;
  poster: string;
  animeId: string;
  href: string;
  episode: string;
  type: string;
  subtitle: string;
  releasedOn: string;
}

export interface RecentSection {
  href: string;
  animeList: RecentAnime[];
}

export interface HomeResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    recent: RecentSection;
    schedule: Schedule;
  };
  pagination: null;
}
