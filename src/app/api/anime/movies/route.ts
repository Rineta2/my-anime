import { NextResponse } from "next/server";

import axios from "axios";

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

    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/samehadaku/movies?page=${page}`
    );

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

    if (transformedData.data && transformedData.data.animeList) {
      const uniqueAnimeMap = new Map<string, AnimeItem>();

      transformedData.data.animeList.forEach((anime: AnimeItem) => {
        const key = `${anime.title}-${anime.episodes}`;

        if (
          !uniqueAnimeMap.has(key) ||
          new Date(anime.releasedOn) >
            new Date(uniqueAnimeMap.get(key)!.releasedOn)
        ) {
          uniqueAnimeMap.set(key, anime);
        }
      });

      transformedData.data.animeList = Array.from(uniqueAnimeMap.values());

      if (transformedData.pagination) {
        transformedData.pagination.totalItems =
          transformedData.data.animeList.length;
      }
    }

    return NextResponse.json(transformedData);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch recent anime data" },
      { status: 500 }
    );
  }
}
