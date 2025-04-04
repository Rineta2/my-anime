import { NextResponse } from "next/server";

import axios from "axios";

import { EpisodeData } from "@/components/ui/home/ui/anime/pages/episode/types/samehadaku";

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
      const { data } = await axios.get<{ data: EpisodeData }>(
        `${process.env.NEXT_PUBLIC_API_URL}/samehadaku/episode/${slug}`
      );

      if (!data?.data) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Episode not found",
            ok: false,
            data: null,
            pagination: null,
          },
          { status: 404 }
        );
      }

      const episodeData = data.data;

      const transformedData = {
        statusCode: 200,
        statusMessage: "OK",
        message: "",
        ok: true,
        data: JSON.parse(JSON.stringify(episodeData), (key, value) => {
          if (
            key === "href" &&
            typeof value === "string" &&
            value.includes("/samehadaku/")
          ) {
            return value.replace("/samehadaku/", "/");
          }
          return value;
        }),
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
            message: "Episode not found",
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
    const statusCode = axios.isAxiosError(error) ? error.response?.status : 500;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Failed to fetch episode data";
    return NextResponse.json(
      {
        statusCode: statusCode || 500,
        statusMessage: "Error",
        message: message || "Failed to fetch episode data",
        ok: false,
        data: null,
        pagination: null,
      },
      { status: statusCode || 500 }
    );
  }
}
