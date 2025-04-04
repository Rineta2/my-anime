import { NextResponse } from "next/server";
import axios from "axios";
import { Anime, ScheduleDay, Genre } from "@/types/anime";

interface TransformableItem {
  href?: string;
  samehadakuUrl?: string;
  animeList?: Anime[];
}

interface ApiResponse<T> {
  ok: boolean;
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: T;
}

interface TransformedData {
  schedule: {
    days: Array<{
      day: string;
      animeList: Anime[];
    }>;
  };
  ongoing: { animeList: Anime[] };
  completed: { animeList: Anime[] };
  popular: { animeList: Anime[] };
  movies: { animeList: Anime[] };
  genres: { genreList: Genre[] };
}

const API_ENDPOINTS = {
  schedule: "/samehadaku/schedule",
  ongoing: "/samehadaku/ongoing",
  completed: "/samehadaku/completed",
  popular: "/samehadaku/popular",
  movies: "/samehadaku/movies",
  genres: "/samehadaku/genres",
} as const;

const transformData = <T extends TransformableItem>(data: T | T[]): T | T[] => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      href: item.href?.replace("/samehadaku", ""),
      samehadakuUrl: item.samehadakuUrl,
    }));
  }
  return data;
};

export async function GET(
  request: Request
): Promise<NextResponse<ApiResponse<TransformedData>>> {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          statusCode: 401,
          statusMessage: "Unauthorized",
          message: "Invalid API key",
        },
        { status: 401 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const requests = Object.entries(API_ENDPOINTS).map(([key, endpoint]) =>
      axios.get(`${baseUrl}${endpoint}`).then((res) => [key, res.data.data])
    );

    const responses = await Promise.all(requests);
    const combinedData = Object.fromEntries(responses);

    const transformedData = {
      schedule: {
        days:
          combinedData.schedule?.days?.map((day: ScheduleDay) => ({
            day: day.day,
            animeList: transformData(day.animeList) as Anime[],
          })) || [],
      },
      ongoing: {
        animeList: transformData(
          combinedData.ongoing?.animeList || []
        ) as Anime[],
      },
      completed: {
        animeList: transformData(
          combinedData.completed?.animeList || []
        ) as Anime[],
      },
      popular: {
        animeList: transformData(
          combinedData.popular?.animeList || []
        ) as Anime[],
      },
      movies: {
        animeList: transformData(
          combinedData.movies?.animeList || []
        ) as Anime[],
      },
      genres: {
        genreList: transformData(
          combinedData.genres?.genreList || []
        ) as Genre[],
      },
    };

    return NextResponse.json({
      ok: true,
      statusCode: 200,
      statusMessage: "OK",
      message: "",
      data: transformedData,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Failed to fetch anime data",
      },
      { status: 500 }
    );
  }
}
