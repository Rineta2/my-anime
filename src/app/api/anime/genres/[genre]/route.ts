import { NextResponse } from "next/server";

import axios from "axios";

interface Genre {
  title: string;
  genreId: string;
  href: string;
}

interface Anime {
  title: string;
  poster: string;
  type: string;
  score: string;
  status: string;
  animeId: string;
  href: string;
  genreList: Genre[];
}

interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: Anime[];
  };
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ genre: string }> }
) {
  try {
    const apiKey = request.headers.get("x-api-key");
    const { genre } = await params;

    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }

    const { data } = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/samehadaku/genres/${genre}`
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

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error fetching genre data:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to fetch genre data",
          details: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch genre data" },
      { status: 500 }
    );
  }
}
