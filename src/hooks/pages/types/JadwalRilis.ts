export interface Anime {
  title: string;
  poster: string;
  type: string;
  score: string;
  estimation: string;
  genres: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
}

export interface DaySchedule {
  day: string;
  animeList: Anime[];
}

export interface ScheduleResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    days: DaySchedule[];
  };
  pagination: null;
}

// ScheduleListProps
export interface ScheduleListProps {
  schedule: ScheduleResponse;
  selectedDay: string | null;
}

// DaySchedule
export interface DayScheduleProps {
  day: string;
  animeList: Array<{
    animeId: string;
    title: string;
    poster: string;
    type: string;
    score?: string;
    genres: string;
    estimation: string;
    href: string;
  }>;
}

// AnimeCard
export interface AnimeCardProps {
  anime: {
    animeId: string;
    title: string;
    poster: string;
    type: string;
    score?: string;
    genres: string;
    estimation: string;
    href: string;
  };
}
