import { NextResponse } from "next/server";

import axios from "axios";

import { AnimeData } from "@/components/ui/home/ui/anime/pages/episode/types/samehadaku";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        {
          statusCode: 401,
          statusMessage: "Error",
          message: "Unauthorized - Invalid API key",
          ok: false,
          data: null,
          pagination: null,
        },
        { status: 401 }
      );
    }

    try {
      const { slug } = await params;
      const { data } = await axios.get<{ data: AnimeData }>(
        `${process.env.NEXT_PUBLIC_API_URL}/samehadaku/anime/${slug}`
      );

      if (!data?.data) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Anime not found",
            ok: false,
            data: null,
            pagination: null,
          },
          { status: 404 }
        );
      }

      const animeData = data.data;

      // Transform the data to remove 'samehadaku' from href paths recursively
      const transformedData = {
        statusCode: 200,
        statusMessage: "OK",
        message: "",
        ok: true,
        data: {
          ...JSON.parse(JSON.stringify(animeData), (key, value) => {
            if (
              key === "href" &&
              typeof value === "string" &&
              value.includes("/samehadaku/")
            ) {
              return value.replace("/samehadaku/", "/");
            }
            return value;
          }),
          score: {
            value: animeData.score?.value || "0",
            users: animeData.score?.users || "0",
          },
          episodes:
            typeof animeData.episodes === "string"
              ? parseInt(animeData.episodes) || 0
              : animeData.episodes || 0,
          synopsis: {
            paragraphs: animeData.synopsis?.paragraphs || [],
            connections: animeData.synopsis?.connections || [],
          },
        },
        pagination: null,
      };

      return NextResponse.json(transformedData);
    } catch (axiosError: unknown) {
      if (
        axios.isAxiosError(axiosError) &&
        axiosError.response?.status === 404
      ) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Anime not found",
            ok: false,
            data: null,
            pagination: null,
          },
          { status: 404 }
        );
      }
      throw axiosError;
    }
  } catch (error: unknown) {
    console.error("Error fetching anime detail:", error);
    const statusCode = axios.isAxiosError(error) ? error.response?.status : 500;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Failed to fetch anime detail";
    return NextResponse.json(
      {
        statusCode: statusCode || 500,
        statusMessage: "Error",
        message: message || "Failed to fetch anime detail",
        ok: false,
        data: null,
        pagination: null,
      },
      { status: statusCode || 500 }
    );
  }
}
