import axios from "axios";

interface Batch {
  title: string;
  animeId: string;
  poster: string;
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  score: string;
  duration: string;
  episodes: string | null;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  releasedOn: string;
  synopsis: {
    paragraphs: string[];
    connections: string[];
  };
  genreList: Array<{
    title: string;
    genreId: string;
    href: string;
    samehadakuUrl: string;
  }>;
  downloadUrl: {
    formats: Array<{
      title: string;
      qualities: Array<{
        title: string;
        urls: Array<{
          title: string;
          url: string;
        }>;
      }>;
    }>;
  };
  recommendedAnimeList: Array<{
    title: string;
    poster: string;
    animeId: string;
    href: string;
    samehadakuUrl: string;
  }>;
}

export async function getBatchDetail(slug: string): Promise<Batch> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/batch/${slug}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
