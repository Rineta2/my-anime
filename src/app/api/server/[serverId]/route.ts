import { NextResponse } from "next/server";
import axios from "axios";

interface ServerResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    url: string;
  };
  pagination: null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serverId: string }> }
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
      const { serverId } = await params;
      const { data } = await axios.get<ServerResponse>(
        `https://wajik-anime-api.vercel.app/samehadaku/server/${serverId}`
      );

      if (!data?.data) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Server not found",
            ok: false,
            data: null,
            pagination: null,
          },
          { status: 404 }
        );
      }

      // Check if the server is premium (contains "premi" in the URL)
      if (data.data.url.includes("premi")) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Premium server not available",
            ok: false,
            data: null,
            pagination: null,
          },
          { status: 404 }
        );
      }

      // Transform the data to remove 'samehadaku' from url if present
      const transformedData = {
        statusCode: 200,
        statusMessage: "OK",
        message: "",
        ok: true,
        data: {
          url: data.data.url
            .replace(/\/samehadaku\//, "/")
            .replace(/\/samehadaku$/, ""),
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
            message: "Server not found",
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
    console.error("Error fetching server data:", error);
    const statusCode = axios.isAxiosError(error) ? error.response?.status : 500;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Failed to fetch server data";
    return NextResponse.json(
      {
        statusCode: statusCode || 500,
        statusMessage: "Error",
        message: message || "Failed to fetch server data",
        ok: false,
        data: null,
        pagination: null,
      },
      { status: statusCode || 500 }
    );
  }
}
