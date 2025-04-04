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

export interface ServerSelectionProps {
  servers: Servers;
  defaultUrl: string;
}

export interface ErrorResponse {
  title: string;
  description: string;
  suggestion: string;
}

export interface ServerResponse {
  ok: boolean;
  error?: ErrorResponse;
  data: { url: string } | null;
}

export interface ServerInfo {
  serverName: string;
  serverId: string;
  quality: string;
}

export interface AvailableServers {
  [key: string]: ServerInfo[];
}

// VideoPlayerProps

export interface VideoPlayerProps {
  currentServerUrl: string;
  isLoading: boolean;
  error: ErrorResponse | null;
  currentQuality: string;
}

// ServerListProps

export interface ServerListProps {
  isCheckingServers: boolean;
  availableServers: AvailableServers;
  activeServerId: string;
  isLoading: boolean;
  onServerSelect: (serverId: string) => void;
}

//

export interface EpisodePageProps {
  params: {
    slug: string;
  };
}

// Define interfaces for the episode data structure
export interface UrlItem {
  title: string;
  url: string;
}

export interface QualityItem {
  title: string;
  urls: UrlItem[];
}

export interface FormatItem {
  title: string;
  qualities: QualityItem[];
}

export interface DownloadUrl {
  formats: FormatItem[];
}

export interface GenreItem {
  genreId: string;
  title: string;
  href: string;
}

export interface Synopsis {
  paragraphs: string[];
}
export interface EpisodeLink {
  title: string;
  href: string;
}

export interface AnimeItem {
  animeId: string;
  title: string;
  poster: string;
  href: string;
  releaseDate: string;
}

export interface Movie {
  animeList: AnimeItem[];
}

export interface RecommendedEpisode {
  episodeId: string;
  title: string;
  poster: string;
  href: string;
  releaseDate: string;
}
