// Anime

export interface AnimeData {
  title?: string;
  poster?: string;
  score?: { value: string; users: string };
  japanese?: string;
  synonyms?: string;
  english?: string;
  status?: string;
  type?: string;
  source?: string;
  duration?: string;
  episodes?: number | string;
  season?: string;
  studios?: string;
  producers?: string;
  aired?: string;
  trailer?: string;
  synopsis?: {
    paragraphs: string[];
    connections: Array<{
      title: string;
      animeId: string;
      href: string;
      samehadakuUrl: string;
    }>;
  };
  genreList?: Array<{
    title: string;
    genreId: string;
    href: string;
    samehadakuUrl: string;
  }>;
  batchList?: Array<{
    id: string;
    title: string;
    url: string;
  }>;
  episodeList?: Array<{
    title: number | string;
    episodeId: string;
    href: string;
    samehadakuUrl: string;
  }>;
}

// Episode

export interface EpisodeData {
  title: string;
  animeId: string;
  poster: string;
  releasedOn: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: null | {
    title: string;
    href: string;
  };
  hasNextEpisode: boolean;
  nextEpisode: null | {
    title: string;
    href: string;
  };
  synopsis: {
    paragraphs: string[];
    connections: Array<{
      title: string;
      href: string;
      samehadakuUrl: string;
    }>;
  };
  genreList: {
    title: string;
    genreId: string;
    href: string;
    samehadakuUrl: string;
  }[];
  server: {
    qualities: {
      title: string;
      serverList: {
        title: string;
        serverId: string;
        href: string;
      }[];
    }[];
  };
  downloadUrl: {
    formats: {
      title: string;
      qualities: {
        title: string;
        urls: {
          title: string;
          url: string;
        }[];
      }[];
    }[];
  };
  recommendedEpisodeList: {
    title: string;
    poster: string;
    releaseDate: string;
    episodeId: string;
    href: string;
    samehadakuUrl: string;
  }[];
  movie: {
    href: string;
    samehadakuUrl: string;
    animeList: {
      title: string;
      poster: string;
      releaseDate: string;
      animeId: string;
      href: string;
      samehadakuUrl: string;
      genreList: {
        title: string;
        genreId: string;
        href: string;
        samehadakuUrl: string;
      }[];
    }[];
  };
}

export interface EpisodeResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: EpisodeData;
  pagination: null;
}
