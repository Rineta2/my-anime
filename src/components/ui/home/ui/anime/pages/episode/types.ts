export interface Server {
  serverId: string;
  title: string;
  href: string;
}

export interface Quality {
  title: string;
  serverList: Server[];
}

export interface Servers {
  qualities: Quality[];
}

export interface QualityServerResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    url: string;
  };
  pagination: null;
}

export interface Episode {
  title: string;
  poster: string;
  releasedOn: string;
  hasPrevEpisode: boolean;
  hasNextEpisode: boolean;
  prevEpisode: null | { title: string; href: string };
  nextEpisode: null | { title: string; href: string };
  server: Servers;
  defaultStreamingUrl: string;
  genreList: Array<{ genreId: string; title: string; href: string }>;
  synopsis: { paragraphs: string[] };
  downloadUrl: {
    formats: Array<{
      title: string;
      qualities: Array<{
        title: string;
        urls: Array<{ title: string; url: string }>;
      }>;
    }>;
  };
  movie: {
    animeList: Array<{
      animeId: string;
      title: string;
      href: string;
      poster: string;
      releaseDate: string;
    }>;
  };
  recommendedEpisodeList: Array<{
    episodeId: string;
    title: string;
    href: string;
    poster: string;
    releaseDate: string;
  }>;
}
