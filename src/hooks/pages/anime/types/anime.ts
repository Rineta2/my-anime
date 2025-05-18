import type {
  Genre,
  Episode,
  Connection,
} from "@/hooks/pages/anime/lib/FetchAnime";

export interface AnimePageProps {
  params: {
    slug: string;
  };
}

export interface AnimeData {
  title: string;
  poster: string;
  synonyms?: string;
  synopsis?: {
    paragraphs: string[];
    connections?: Connection[];
  };
  episodeList?: Episode[];
  genreList?: Genre[];
  status?: string;
  type?: string;
  source?: string;
  episodes?: number;
  totalEpisodes?: string;
  duration?: string;
  studios?: string;
  producers?: string;
  aired?: string;
  season?: string;
  trailer?: string;
  censor?: string;
  director?: string;
  postedBy?: string;
  releasedOn?: string;
  updatedOn?: string;
  recommendedAnimeList?: {
    title: string;
    poster: string;
    animeId: string;
    href: string;
    type: string;
    status: string;
    episode: string;
    subtitle: string;
    releasedOn: string;
  }[];
}

// Hero Section
export interface HeroSectionProps {
  anime: AnimeData;
}

// Synopsis Section
export interface SynopsisSectionProps {
  anime: AnimeData;
}

// Episodes Section
export interface EpisodesSectionProps {
  anime: AnimeData;
}

// Related Anime Section
export interface RelatedAnimeSectionProps {
  anime: AnimeData;
}

// Info Card
export interface InfoCardProps {
  anime: AnimeData;
}

// Genres Section
export interface GenresSectionProps {
  anime: AnimeData;
}
