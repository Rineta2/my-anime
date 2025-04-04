import type {
  Genre,
  Episode,
  Connection,
} from "@/components/ui/home/ui/anime/pages/anime/lib/FetchAnime";

export interface AnimePageProps {
  params: {
    slug: string;
  };
}

export interface AnimeData {
  poster: string;
  japanese?: string;
  english?: string;
  synonyms?: string;
  score?: {
    value: string;
    users: string;
  };
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
  duration?: string;
  studios?: string;
  producers?: string;
  aired?: string;
  season?: string;
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
