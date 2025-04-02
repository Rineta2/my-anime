import { NextResponse } from "next/server";
import axios from "axios";

// Define the anime item type
interface AnimeItem {
  title: string;
  episodes: string;
  releasedOn: string;
  animeId: string;
  poster?: string;
  href?: string;
  samehadakuUrl?: string;
  status?: string;
  type?: string;
  duration?: string;
  score?: string | number;
  studios?: string;
  producers?: string;
  genres?: Array<{ title: string; genreId: string; href: string }>;
}

export async function GET(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }

    // Get the page parameter from the URL
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/samehadaku/recent?page=${page}`
    );

    // Transform the data to remove 'samehadaku' from href paths
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (
        key === "href" &&
        typeof value === "string" &&
        value.includes("/samehadaku/")
      ) {
        return value.replace("/samehadaku/", "/");
      }
      return value;
    });

    // Filter out duplicate anime entries, keeping only the most recent ones
    if (transformedData.data && transformedData.data.animeList) {
      // Create a map to track unique anime by title
      const uniqueAnimeMap = new Map<string, AnimeItem>();

      // Process each anime in the list
      transformedData.data.animeList.forEach((anime: AnimeItem) => {
        // Use a combination of title and episode as the key to identify duplicates
        const key = `${anime.title}-${anime.episodes}`;

        // If this anime is not in the map yet, or if it's newer than the one in the map, update it
        if (
          !uniqueAnimeMap.has(key) ||
          new Date(anime.releasedOn) >
            new Date(uniqueAnimeMap.get(key)!.releasedOn)
        ) {
          uniqueAnimeMap.set(key, anime);
        }
      });

      // Convert the map back to an array
      transformedData.data.animeList = Array.from(uniqueAnimeMap.values());

      // Update the total count if pagination exists
      if (transformedData.pagination) {
        transformedData.pagination.totalItems =
          transformedData.data.animeList.length;
      }
    }

    return NextResponse.json(transformedData);
  } catch (error: unknown) {
    console.error("Error fetching recent anime data:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent anime data" },
      { status: 500 }
    );
  }
}
