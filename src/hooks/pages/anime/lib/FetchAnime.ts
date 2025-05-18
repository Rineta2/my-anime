import axios from "axios";

interface Score {
  value: string;
  users: string;
}

interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

interface Episode {
  title: number;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}

interface Connection {
  title: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
}

interface Synopsis {
  paragraphs: string[];
  connections: Connection[];
}

interface Batch {
  id: string;
  title: string;
  url: string;
}

interface AnimeData {
  title: string;
  poster: string;
  score: Score;
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  duration: string;
  episodes: number;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  trailer: string;
  synopsis: Synopsis;
  genreList: Genre[];
  batchList: Batch[];
  episodeList: Episode[];
}

interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: AnimeData;
  pagination: null;
}

export type { AnimeData as Anime, Genre, Episode, Connection, ApiResponse };

export async function getAnimeDetail(slug: string): Promise<ApiResponse> {
  try {
    const response = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_URL}/api/anime/${slug}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    if (!response.data.ok || !response.data.data) {
      throw new Error(response.data.message || "Failed to fetch anime data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching anime detail:", error);
    throw error;
  }
}
