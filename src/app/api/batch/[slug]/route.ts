import { NextResponse } from "next/server";
import axios from "axios";

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
      const { data } = await axios.get(
        `https://wajik-anime-api.vercel.app/samehadaku/batch/${slug}`
      );

      if (!data?.data) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Batch not found",
            ok: false,
            data: null,
            pagination: null,
          },
          { status: 404 }
        );
      }

      // Transform the data to remove 'samehadaku' from all href paths
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
    } catch (axiosError: unknown) {
      if (
        axios.isAxiosError(axiosError) &&
        axiosError.response?.status === 404
      ) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Batch not found",
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
    console.error("Error fetching batch detail:", error);
    const statusCode = axios.isAxiosError(error) ? error.response?.status : 500;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Failed to fetch batch detail";
    return NextResponse.json(
      {
        statusCode: statusCode || 500,
        statusMessage: "Error",
        message: message || "Failed to fetch batch detail",
        ok: false,
        data: null,
        pagination: null,
      },
      { status: statusCode || 500 }
    );
  }
}
