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

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

// ✅ Fetch anime data by slug
export async function fetchAnimeBySlug(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("anime")) {
      const originalSlug = slug;
      slug = slug.replace(/^anime/, "");
      console.log(`Correcting slug from ${originalSlug} to ${slug}`);
    }

    console.log(`Fetching anime data for slug: ${slug}`);
    console.log(`API URL: ${NEXT_PUBLIC_URL}/api/anime/${slug}`);

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/${slug}`, {
      cache: "no-store",
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
      next: {
        revalidate: 60, // Revalidate every 60 seconds
      },
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "No error text available");
      console.error(`API Error (${res.status}): ${errorText}`);
      throw new Error(
        `Failed to fetch anime data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching anime data for slug ${slug}:`, error);
    throw error;
  }
}
